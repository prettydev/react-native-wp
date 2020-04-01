import React, { memo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import BackButton from "../components/BackButton";
import Modal from "react-native-modal";
import MissionCard from "../components/MissionCard";
import { baseApiUrl } from "../core/const";
const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const SecretMission = ({ isVisible, goBack, pData, navigation }) => {
  const onAcceptMission = () => {
    fetch(baseApiUrl + "registerSecretOpponent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid: pData.uid,
        opponent: pData.opponentPlayers[0]
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("Register secret opponent result = ", response);
        if (response == 1) {
          console.log("Registering opponent succeeded!");
          goBack();
          navigation.navigate("FaceRecognition");
        }
      })
      .catch(err => {
        console.log("Error while registering secret opponent. ", err.message);
      });
  };

  return pData.opponentPlayers && pData.opponentPlayers.length > 0 ? (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      onBackButtonPress={goBack}
      onBackdropPress={goBack}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.safearea}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <Text style={styles.top}>SECRET MISSION</Text>
          <Text style={styles.normalText}>Mission worth:</Text>
          <Text style={styles.scoreText}>20,000 POINTS</Text>
          <View style={styles.photos}>
            <View
              style={{
                width: 150 * ratio,
                height: 150 * ratio,
                borderRadius: 150 * ratio,
                overflow: "hidden"
              }}
            >
              <Image
                source={{ uri: pData.opponentPlayers[0].photoUrlFront }}
                style={{ flex: 1 }}
                resizeMode={"cover"}
              />
            </View>
            <View
              style={{
                marginLeft: 20,
                width: 150 * ratio,
                height: 150 * ratio,
                borderRadius: 150 * ratio,
                overflow: "hidden"
              }}
            >
              <Image
                source={{ uri: pData.opponentPlayers[0].photoUrlSide }}
                style={{ flex: 1 }}
                resizeMode={"cover"}
              />
            </View>
          </View>
          <Text style={styles.playerName}>{pData.opponentPlayers[0].name}</Text>
          <View
            style={[
              styles.status_style,
              pData.status == "Rookie"
                ? styles.rookie
                : pData.status == "Pro"
                ? styles.pro
                : styles.advanced
            ]}
          >
            <Text
              style={[
                { fontWeight: "bold", fontSize: 15 * ratio },
                pData.status == "Rookie"
                  ? { color: "#1DEEAE" }
                  : pData.status == "Pro"
                  ? { color: "#FF2300" }
                  : { color: "#FFDD00" }
              ]}
            >
              {pData.status}
            </Text>
          </View>
          <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
            <MissionCard
              missionType="Random"
              points={pData.opponentPlayers[0].free_kills}
              kills={pData.opponentPlayers[0].free_deaths}
            />
            <MissionCard
              missionType="Mission"
              points={pData.opponentPlayers[0].secret_kills}
              kills={pData.opponentPlayers[0].secret_deaths}
            />
            <MissionCard
              missionType="Group"
              points={pData.opponentPlayers[0].group_kills}
              kills={pData.opponentPlayers[0].group_deaths}
            />
            <MissionCard
              missionType="Pick a Target"
              points={pData.opponentPlayers[0].pick_kills}
              kills={pData.opponentPlayers[0].pick_deaths}
            />
          </ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <Text style={[styles.normaltext, { marginTop: 5 }]}>Points:</Text>
            <TouchableOpacity onPress={() => setVisibleScore(true)}>
              <Text style={styles.boldtext}>
                {pData.opponentPlayers[0].currentPoints}
              </Text>
            </TouchableOpacity>
            <Text style={styles.normaltext}>World ranking:</Text>
            <TouchableOpacity onPress={() => setVisibleRanking(true)}>
              <Text style={styles.boldtext}>871</Text>
            </TouchableOpacity>
            <Text style={styles.normaltext}>Available lives:</Text>
            <TouchableOpacity onPress={() => setVisibleLives(true)}>
              <Text style={styles.boldtext}>
                {pData.opponentPlayers[0].currentLives}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.location}>
            <Image source={require("../assets/location_icon.png")} />
            <Text style={styles.normalText}>Location:</Text>
            <Text style={styles.mainText}>
              {pData.opponentPlayers[0].locationName}
            </Text>
          </View>
          <View style={styles.location}>
            <Image source={require("../assets/calender_icon.png")} />
            <Text style={styles.normalText}>Age:</Text>
            <Text style={styles.mainText}>
              {pData.opponentPlayers[0].age} y/o
            </Text>
          </View>
          <View style={styles.location}>
            <Image source={require("../assets/calender_icon.png")} />
            <Text style={styles.normalText}>Date joined:</Text>
            <Text style={styles.mainText}>
              {pData.opponentPlayers[0].dateJoined}
            </Text>
          </View>
          <View style={[styles.location, { marginBottom: 100 }]}>
            <Text style={[styles.normalText, { flexShrink: 1, width: "90%" }]}>
              This is a random mission close to your location the target may or
              may not know they are being hunted by you.{"\n"}You may or may not
              be their target also
            </Text>
            <Text style={styles.mainText}>GOOD LUCK</Text>
          </View>
        </ScrollView>
        <View style={styles.bottom}>
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
                imgSource={require("../assets/close.png")}
                goBack={goBack}
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
                style={{ width: "100%" }}
                activeOpacity={0.7}
                onPress={onAcceptMission}
              >
                <View
                  style={{
                    backgroundColor: "red",
                    borderRadius: 10 * ratio,
                    height: 48 * ratio,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "archivo",
                      fontSize: 18 * ratio,
                      fontWeight: "bold"
                    }}
                  >
                    ACCEPT MISSION
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }}></View>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;
};

const styles = StyleSheet.create({
  safearea: {
    height: "90%",
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  top: {
    marginTop: 70 * ratio,
    color: "white",
    fontSize: 25 * ratio,
    fontWeight: "bold",
    marginBottom: 20 * ratio,
    textAlign: "center"
  },
  normalText: {
    fontSize: 15 * ratio,
    color: "rgb(200, 200, 200)",
    textAlign: "center"
  },
  scoreText: {
    color: "white",
    fontSize: 20 * ratio,
    fontWeight: "bold",
    marginBottom: 10
  },
  photos: {
    flexDirection: "row",
    marginBottom: 10
  },
  photo: {
    width: 150 * ratio,
    height: 150 * ratio,
    borderRadius: 75 * ratio,
    marginHorizontal: 10
  },
  playerName: {
    fontSize: 25 * ratio,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  rookie_group: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10 * ratio
  },
  status_style: {
    borderRadius: 18 * ratio,
    shadowColor: "rgba(0, 0, 0, .16)",
    paddingHorizontal: 15 * ratio,
    paddingVertical: 5 * ratio,
    alignContent: "center",
    marginRight: 10 * ratio
  },
  rookie: {
    backgroundColor: "rgba(29, 238, 174, .4)",
    color: "#1DEEAE",
    fontSize: 15 * ratio,
    fontWeight: "bold"
  },
  pro: {
    color: "#FF2300",
    backgroundColor: "rgba(255, 35, 0, .4)",
    fontSize: 15 * ratio,
    fontWeight: "bold"
  },
  advanced: {
    color: "#FFDD00",
    backgroundColor: "rgba(255, 251, 0, .4)",
    fontSize: 15 * ratio,
    fontWeight: "bold"
  },
  iMark: {
    backgroundColor: "#1DEEAE",
    width: 20 * ratio,
    height: 20 * ratio,
    borderRadius: 20 * ratio
  },
  info: {
    textAlign: "center",
    fontSize: 15 * ratio,
    fontFamily: "Script MT",
    fontWeight: "bold"
  },
  boldtext: {
    fontSize: 18 * ratio,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  normaltext: {
    fontSize: 10 * ratio,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
    marginTop: 10 * ratio
  },
  bottom: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    bottom: 30 * ratio,
    alignItems: "center",
    justifyContent: "center"
  },
  location: {
    paddingVertical: 20 * ratio,
    marginTop: 20 * ratio,
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20 * ratio,
    justifyContent: "center",
    alignItems: "center"
  },
  mainText: {
    fontSize: 18 * ratio,
    color: "white",
    textAlign: "center",
    marginTop: 10 * ratio
  },
  buttonText: {
    fontSize: 14 * ratio,
    color: "white",
    textAlign: "center"
  },
  button: {
    paddingHorizontal: 20 * ratio,
    paddingVertical: 5 * ratio,
    borderRadius: 5 * ratio,
    borderColor: "rgba(255, 255, 255, .7)",
    borderWidth: 2,
    backgroundColor: "black",
    marginTop: 10 * ratio
  }
});

export default SecretMission;
