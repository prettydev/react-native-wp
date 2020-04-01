import React, { memo, useState } from "react";
import BackButton from "../components/BackButton";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { connect } from "react-redux";
import { TabView, SceneMap } from "react-native-tab-view";
import { ScrollView } from "react-native-gesture-handler";
import { change_save_data } from "../core/reducer";
import { baseApiUrl } from "../core/const";
const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const TargetScreen = ({ navigation, pData, changeSaveData }) => {
  const [isCancel, setCancel] = useState(false);

  const onPickTarget = uid => {
    fetch(baseApiUrl + "PickTarget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid: uid
      })
    })
      .then(response => response.json())
      .then(async response => {
        const res = JSON.parse(response);
        console.log("Opponent player = ", uid, res);
        await changeSaveData({
          ...pData,
          opponentPlayers: res
        });
        navigation.navigate("FaceRecognition");
      })
      .catch(err => {
        console.log("Error while getting opponent Players. ", err.message);
      });
  };

  const renderTarget = () => {
    return pData.userLocations.map(playerData => {
      if (playerData.uid != pData.uid) {
        return (
          <TouchableOpacity
            style={styles.player}
            onPress={() => onPickTarget(playerData.uid)}
          >
            <View style={styles.listItem}>
              <Image
                source={{ uri: playerData.photoUrlFront }}
                style={{ width: 50, height: 50 }}
                resizeMode={"cover"}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {playerData["name"]}
              </Text>
              <Text style={{ color: "gray", fontSize: 15 }}>
                Current Points {playerData["currentPoints"]}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  return (
    <View style={styles.safearea}>
      <Text style={styles.top}>PICK A TARGET</Text>
      <Text style={styles.normalText}>Half their points in total</Text>
      <ScrollView style={styles.middle}>{renderTarget()}</ScrollView>
      <View style={styles.bottom}>
        <View style={styles.buttons}>
          <View style={styles.backButton}>
            <BackButton
              imgSource={require("../assets/left-arrow.png")}
              goBack={() => {
                navigation.navigate("HomeScreen");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden"
  },
  player: {
    flexDirection: "row",
    backgroundColor: "rgb(50, 50, 50)",
    borderRadius: 15,
    padding: 5,
    marginVertical: 10
  },
  normalText: {
    fontSize: 15 * ratio,
    color: "rgb(200, 200, 200)",
    textAlign: "center"
  },
  top: {
    marginTop: 70 * ratio,
    color: "white",
    fontSize: 25 * ratio,
    fontWeight: "bold",
    marginBottom: 20 * ratio,
    textAlign: "center"
  },
  bottom: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  safearea: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
    alignItems: "center"
  },
  middle: {
    flex: 1,
    width: "80%"
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  backButton: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  mainButton: {
    backgroundColor: "red",
    borderRadius: 10 * ratio,
    height: 48 * ratio,
    justifyContent: "center",
    alignItems: "center"
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

const Target = memo(TargetScreen);

export default connect(mapStateToProps, mapDispatchToProps)(Target);
