import React, { memo, useState, useEffect } from "react";
import { RNCamera } from "react-native-camera";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import VerticalSlider from 'rn-vertical-slider';
import { change_save_data } from "../core/reducer";
import BackButton from "../components/BackButton";
import MapScreen from "./MapScreen";
import TopShotScreen from "./TopShotModal";
import ImageResizer from "react-native-image-resizer";
import { baseApiUrl } from "../core/const";
var Sound = require("react-native-sound");
Sound.setCategory("Playback");

const height = Math.round(Dimensions.get("window").height);
const width = Math.round(Dimensions.get("window").width);

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "lightgreen",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Text>Waiting</Text>
  </View>
);

const FaceRecognition = ({ navigation, pData, changeSaveData }) => {
  const [isVisibleMap, setVisibleMap] = useState(false);
  const [isTopShot, setTopShot] = useState(false);
  const [killed, setKilled] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [zoomRate, setZoomRate] = useState(0);

  useEffect(() => {
    console.log("FaceRecognition pData = ", pData);
  }, []);

  const playSound = () => {
    const whoosh = new Sound("shot.mp3", Sound.MAIN_BUNDLE, error => {
      if (error) {
        alert("failed to load the sound", error);
        return;
      }
      console.log('sound loaded successfully: ' + whoosh.isLoaded() + " volume is " + whoosh.getVolume());
      // loaded successfully
      alert(
        "duration in seconds: " +
          whoosh.getDuration() +
          "number of channels: " +
          whoosh.getNumberOfChannels()
      );

      // Play the sound with an onEnd callback
      whoosh.play(success => {
        if (success) {
          alert("successfully finished playing");
          whoosh.release();
        } else {
          alert("playback failed due to audio decoding errors");
        }
      });
    });
    // alert('Start out side of whoosh');
    // // Reduce the volume by half
    // whoosh.setVolume(0.5);

    // // Position the sound to the full right in a stereo field
    // whoosh.setPan(1);

    // // Loop indefinitely until stop() is called
    // whoosh.setNumberOfLoops(-1);

    // // Seek to a specific point in seconds
    // whoosh.setCurrentTime(2.5);

    // // Get the current playback point in seconds
    // whoosh.getCurrentTime(seconds => console.log("at " + seconds));

    // // Pause the sound
    // whoosh.pause();

    // // Stop the sound and rewind to the beginning
    // whoosh.stop(() => {
    //   // Note: If you want to play a sound after stopping and rewinding it,
    //   // it is important to call play() in a callback.
    //   alert('Stop Playing sound');
    //   whoosh.play();
    // });

    // // Release the audio player resource
    // whoosh.release();
    // alert('End Playing sound');
  };

  const takePicture = async function(camera) {
    playSound();

    const options = { quality: 0.5, base64: true, fixOrientation: true };
    const data = await camera.takePictureAsync(options);

    return data;
  };

  const uploadCompPhoto = (uri, imgWidth, imgHeight) => {
    return new Promise((resolve, reject) => {
      const newWidth = 400;
      const newHeight = (imgHeight * 400) / imgWidth;
      ImageResizer.createResizedImage(uri, newWidth, newHeight, "JPEG", 100)
        .then(response => {
          const uploadUri = response.uri;
          console.log("opponents = ", pData.opponentPlayers);
          let data = new FormData();
          data.append("uid", pData.uid);
          data.append("latitude", pData.latitude);
          data.append("longitude", pData.longitude);
          data.append("opponentPlayers", JSON.stringify(pData.opponentPlayers));
          data.append("compPhoto", {
            uri: uploadUri,
            type: "image/jpeg", // or photo.type
            name: "temp.jpg"
          });

          fetch(baseApiUrl + "uploadCompPhoto", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
            body: data
          })
            .then(res => res.json())
            .then(res => {
              console.log("response " + JSON.stringify(res));
              resolve(res);
            })
            .catch(e => {
              console.log("error = ", e);
              reject(e);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const onShot = async camera => {
    const photoData = await takePicture(camera);
    setLoadingScreen(true);
    uploadCompPhoto(photoData.uri, photoData.width, photoData.height).then(
      res => {
        if (res == "NoMatch") {
          alert("No match found. Please try again.");
          setLoadingScreen(false);
        } else {
          const result = JSON.parse(res);
          //update score table
          fetch(baseApiUrl + "updateScore", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              killer_uid: pData.uid,
              victim_uid: result.uid,
              curGame: pData.curGame,
              currentPoints: pData.currentPoints,
              free_kills: pData.free_kills,
              free_deaths: pData.free_deaths,
              secret_kills: pData.secret_kills,
              secret_deaths: pData.secret_deaths,
              group_kills: pData.group_kills,
              group_deaths: pData.group_deaths
            })
          })
            .then(response => response.json())
            .then(response => {
              const res = JSON.parse(response);
              changeSaveData({
                ...pData,
                free_kills: res.free_kills,
                free_deaths: res.free_deaths,
                secret_kills: res.secret_kills,
                secret_deaths: res.secret_deaths,
                group_kills: res.group_kills,
                group_deaths: res.group_deaths,
                pick_kills: res.pick_kills,
                pick_deaths: res.pick_deaths,
                currentPoints: res.currentPoints
              });
            })
            .catch(err => {
              console.log("Error while updating score ... ", err.message);
            });
          setKilled(result);
          setTopShot(true);
          setLoadingScreen(false);
        }
      }
    ).catch(err => {
      console.log(err);
    });
  };

  return (
    <View style={styles.safearea}>
      <Spinner
        visible={loadingScreen}
        textContent={"Now matching players..."}
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <TopShotScreen
        isVisible={isTopShot}
        goBack={() => setTopShot(false)}
        killed={killed}
        pData={pData}
      />
      <MapScreen
        isVisible={isVisibleMap}
        goBack={() => setVisibleMap(false)}
        pData={pData}
      />
      <Image
        source={require("../assets/aim.png")}
        width={200}
        height={200}
        resizeMethod={"resize"}
        resizeMode={"stretch"}
        style={styles.aimMark}
      />
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        zoom={zoomRate}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Ok",
          buttonNegative: "Cancel"
        }}
        androidRecordAudioPermissionOptions={{
          title: "Permission to use audio recording",
          message: "We need your permission to use your audio",
          buttonPositive: "Ok",
          buttonNegative: "Cancel"
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== "READY") return <PendingView />;
          return (
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={styles.screen}>
                <VerticalSlider
                style={styles.zoomSlider}
                width={15}
                height={250}
                min={0}
                max={1}
                value={zoomRate}
                step={0.01}
                borderRadius={5}
                minimumTrackTintColor={"tomato"}
                maximumTrackTintColor={"gray"}
                // showBallIndicator
                ballIndicatorColor={"gray"}
                ballIndicatorTextColor={"white"}
                onChange={(value: number) => {
                  setZoomRate(value);
                }}
                />
              </View>
              <View style={styles.bottom}>
                <View style={styles.bottomBtns}>
                  <View style={styles.mapBtn}>
                    <BackButton
                      imgSource={require("../assets/Map.png")}
                      goBack={() => setVisibleMap(true)}
                    />
                  </View>
                  {/* <TouchableOpacity activeOpacity={0.7} onPress={() => zoomOut()}>
                    <Text style={{ color: "white", fontSize: 50 }}> - </Text>
                  </TouchableOpacity> */}
                  <Text style={{ color: "darkgray", fontSize: 10 }}>• • • •</Text>
                  <TouchableOpacity
                    onPress={() => onShot(camera)}
                    style={styles.shotBtn}
                  ></TouchableOpacity>
                  <Text style={{ color: "darkgray", fontSize: 10 }}>• • • •</Text>
                  {/* <TouchableOpacity activeOpacity={0.7} onPress={() => zoomIn()}>
                    <Text style={{ color: "white", fontSize: 30 }}> + </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => {
                      if (pData.curGame == "free") {
                        navigation.navigate("ClosePlayers");
                      } else if (pData.curGame == "pick") {
                        navigation.navigate("ChoosenTargetScreen");
                      } else if (pData.curGame == "group") {
                        navigation.navigate("ClosePlayers");
                      } else if (pData.curGame == "secret") {
                        navigation.navigate("SecretTarget");
                      }
                    }}
                    style={styles.othersBtn}
                  >
                    <Image
                      source={{
                        uri:
                        pData.opponentPlayers != undefined && pData.opponentPlayers.length != 0
                            ? pData.opponentPlayers[0].photoUrlFront
                            : ""
                      }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                      resizeMode={"cover"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  aimMark: {
    position: "absolute",
    width: 250,
    height: 250,
    left: width / 2 - 125,
    top: height / 2 - 175,
    zIndex: 1
  },
  screen: {
    flex:1,
    top:height/10,
    left:width/12 * 11
  },
  zoomSlider:{
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1
  },
  bottom: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    zIndex: 1,
    position: "absolute",
    height: 100,
    width: "100%",
    bottom: 0
  },
  bottomBtns: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "90%"
  },
  shotBtn: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "white",
    borderRadius: 30,
    position: "relative"
  },
  mapBtn: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    position: "absolute",
    left: 0
  },
  othersBtn: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
    position: "absolute",
    right: 0,
    overflow: "hidden"
  },
  safearea: {
    flex: 1,
    position: "relative",
    backgroundColor: "white"
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

const mapStateToProps = state => ({
  pData: state.data
});

const mapDispatchToProps = dispatch => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  }
});

const Recognition = memo(FaceRecognition);

export default connect(mapStateToProps, mapDispatchToProps)(Recognition);
