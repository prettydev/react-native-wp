import React, { memo, useState, Platform } from "react";
import BackButton from "../components/BackButton";
import checkedImg from "../assets/checked.png";
import uncheckedImg from "../assets/unchecked.png";
import ImagePicker from "react-native-image-picker";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { change_save_data } from "../core/reducer";
import ImageResizer from "react-native-image-resizer";
import { baseUrl, baseApiUrl } from "../core/const";
const UploadScreen = ({ navigation, pData, changeSaveData }) => {
  const [isChecked, setChecked] = useState(false);
  const setFrontFilePath = url => {
    changeSaveData({
      ...pData,
      photoUrlFront: url
    });
    return;
  };
  const setSideFilePath = url => {
    changeSaveData({
      ...pData,
      photoUrlSide: url
    });
    return;
  };

  const [isFrontUploaded, setIsFrontUploaded] = useState(
    pData.photoUrlFront != ""
  );
  const [isSideUploaded, setIsSideUploaded] = useState(
    pData.photoUrlSide != ""
  );

  const renderImage = () => {
    var imgSource = isChecked ? checkedImg : uncheckedImg;
    return <Image source={imgSource} />;
  };

  const uploadImage = (uri, bFront, imgWidth, imgHeight, rotation) => {
    return new Promise((resolve, reject) => {
      const newWidth = 400;
      const newHeight = (imgHeight * 400) / imgWidth;
      ImageResizer.createResizedImage(
        uri,
        newWidth,
        newHeight,
        "JPEG",
        100,
        rotation
      )
        .then(response => {
          console.log("Image convertion result = ", response);
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
          const uploadUri = response.uri;
          const photoName = pData.uid + (bFront ? "_Front" : "_Side") + ".jpg";
          let data = new FormData();
          data.append("uid", pData.uid);
          data.append("bFront", bFront ? "Front" : "Side");
          data.append("photo", {
            uri: uploadUri,
            type: "image/jpeg", // or photo.type
            name: photoName
          });

          fetch(baseApiUrl + "upload", {
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
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
          console.log("Error while converting image...", err.message);
          reject(err);
        });
    });
  };

  const pickImage = isFront => {
    let options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Image info = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const { originalRotation } = response;

        let rotation = 0;

        if (originalRotation === 90) {
          rotation = 90;
        } else if (originalRotation === 270) {
          rotation = -90;
        }
        uploadImage(
          response.uri,
          isFront,
          response.width,
          response.height,
          rotation
        )
          .then(url => {
            isFront
              ? setFrontFilePath(response.uri)
              : setSideFilePath(response.uri);
            isFront ? setIsFrontUploaded(true) : setIsSideUploaded(true);
            const realUrl = baseUrl + "/" + url;
            alert("uploaded ", realUrl);
            isFront
              ? changeSaveData({ ...pData, photoUrlFront: realUrl })
              : changeSaveData({ ...pData, photoUrlSide: realUrl });
          })
          .catch(error => alert(error));
      }
    });
  };

  const onCreateProfile = () => {
    console.log("pData = ", pData);
    fetch(baseApiUrl + "update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: pData.email,
        password: pData.password,
        birthday: pData.birthday,
        photoUrlFront: pData.photoUrlFront,
        photoUrlSide: pData.photoUrlSide,
        latitude: pData.latitude,
        longitude: pData.longitude,
        uid: pData.uid
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("update profile = ", response);

        if (response != "false") {
          const res = JSON.parse(response);
          fetch(baseApiUrl + "getAllLocations", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              latitude: pData.latitude,
              longitude: pData.longitude,
              uid: pData.uid
            })
          })
            .then(response => response.json())
            .then(response => {
              console.log("User Locations when register = ", response);
              const userLocations = JSON.parse(response);
              changeSaveData({
                ...pData,
                userLocations: userLocations,
                age: res.age,
                status: res.status,
                dateJoined: res.dateJoined,
                locationName: res.locationName
              });
              navigation.navigate("HomeScreen");
            })
            .catch(err => {
              console.log(
                "Error while getting locations at registration.",
                err.message
              );
            });
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const removeImage = isFront => {
    isFront ? setFrontFilePath("") : setSideFilePath("");
    isFront ? setIsFrontUploaded(false) : setIsSideUploaded(false);
  };

  const onUploadFace = () => {
    isFrontUploaded ? removeImage(true) : pickImage(true);
  };

  const onUploadSide = () => {
    isSideUploaded ? removeImage(false) : pickImage(false);
  };

  const renderFileData = (path, bFront) => {
    if (path) {
      return (
        <Image
          style={{ width: 150, height: 150, borderRadius: 75 }}
          source={{ uri: path + "?" + new Date() }}
        />
      );
    } else {
      if (bFront) {
        return (
          <Image source={require("../assets/Face.png")} style={styles.images} />
        );
      } else {
        return (
          <Image
            source={require("../assets/SideView.png")}
            style={styles.images}
          />
        );
      }
    }
  };

  return (
    <View style={styles.safearea}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            flex: 1,
            marginTop: 50,
            fontSize: 25,
            color: "white",
            fontWeight: "bold",
            fontFamily: "Archivo",
            textAlign: "center"
          }}
        >
          UPLOAD IMAGES
        </Text>
      </View>
      <View style={{ flex: 5 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={onUploadFace}
            style={{
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
            activeOpacity={0.7}
          >
            {renderFileData(pData.photoUrlFront, true)}
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                fontFamily: "Roboto",
                textDecorationLine: "underline"
              }}
            >
              {isFrontUploaded ? "Remove" : "Upload front view photo"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onUploadSide()}
            style={{
              marginTop: 30,
              justifyContent: "center",
              alignItems: "center"
            }}
            activeOpacity={0.7}
          >
            {renderFileData(pData.photoUrlSide, false)}
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                fontFamily: "Roboto",
                textDecorationLine: "underline"
              }}
            >
              {isSideUploaded ? "Remove" : "Upload side view photo"}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              marginTop: 30,
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "Archivo",
              color: "red"
            }}
          >
            IMPORTANT NOTICE
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 10,
              color: "white",
              fontFamily: "Roboto",
              textAlign: "center"
            }}
          >
            The only information given to other parties is your{"\n"}screen name
            and photo for gaming purposes.
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "white",
              fontWeight: "bold",
              fontFamily: "Roboto",
              textDecorationLine: "underline"
            }}
          >
            More
          </Text>
          <TouchableOpacity
            onPress={() => setChecked(!isChecked)}
            style={{
              width: "80%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
              marginBottom: 100
            }}
            activeOpacity={0.7}
          >
            {renderImage()}
            <Text style={{ color: "white", fontSize: 12 }}>
              {" "}
              I agree to{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  fontSize: 12
                }}
              >
                Terms & Conditions
              </Text>
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              position: "absolute",
              bottom: 30,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 3 }}></View>
              <View
                style={{
                  flex: 4,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <BackButton
                  imgSource={require("../assets/left-arrow.png")}
                  goBack={() => {
                    navigation.navigate("Dashboard");
                  }}
                />
              </View>
              <View style={{ flex: 3 }}></View>
              <View
                style={{
                  flex: 15,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => onCreateProfile()}
                  style={{ width: "100%" }}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 10,
                      height: 48,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "archivo",
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      CREATE PROFILE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 3 }}></View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    position: "relative",
    backgroundColor: "black"
  }
});

const Upload = memo(UploadScreen);

const mapStateToProps = state => ({
  pData: state.data
});

const mapDispatchToProps = dispatch => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
