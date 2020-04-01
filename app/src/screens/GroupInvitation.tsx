import React, { memo, useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { TabView, TabBar } from "react-native-tab-view";
import { LinearGradient } from "react-native-linear-gradient";
import { change_save_data } from "../core/reducer";

import moment from "moment";

import { baseApiUrl } from "../core/const";

const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const GroupInvitation = ({ navigation, pData, changeSaveData }) => {
  const [isCancel, setCancel] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [remainSec, setRemainSec] = useState(0);
  const [remainMin, setRemainMin] = useState(0);
  const [remainHour, setRemainHour] = useState(0);
  const tabState = {
    index: tabIndex,
    routes: [
      { key: "Details", title: "DETAILS" },
      { key: "Players", title: "PLAYERS" }
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let startDateTime = new Date(
        moment(pData.groupGameStartDate + " " + pData.groupGameStartTime)
          .local()
          .format()
      );
      let endDateTime = new Date(
        pData.groupGameEndDate + " " + pData.groupGameEndTime
      );
      let now = new Date(
        moment(new Date())
          .local()
          .format()
      );
      let end_diff = endDateTime.getTime() - now.getTime();
      if (end_diff < 0) {
        console.log("----------------------------------------------------> Ending Game");
        clearInterval(interval);
        endGroupGame();
        return;
      }
      let diff = startDateTime.getTime() - now.getTime();
      if (diff < 0) {
        console.log("----------------------------------------------------> Starting Game");
        onStartGame();
      }
      let seconds = diff / 1000;

      setRemainSec(parseInt(seconds % 60));
      setRemainMin(parseInt((seconds / 60) % 60));
      setRemainHour(parseInt(seconds / 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const onStartGame = () => {
    fetch(baseApiUrl + "startGroupGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        group_uid: pData.group_uid,
        uid: pData.uid
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response != "false") {
          const acceptedMembers = JSON.parse(response);
          console.log("Group Game started. Group members = ", acceptedMembers);
          changeSaveData({
            ...pData,
            isPlayingGroup: "1",
            curGroupName: pData.group_uid,
            opponentPlayers: [...acceptedMembers],
            groupPlayers: [...acceptedMembers]
          });
          navigation.navigate("FaceRecognition");
        }
      })
      .catch(err => {
        console.log("Error while starting group game... ", err.message);
      });
  };

  const endGroupGame = () => {
    fetch(baseApiUrl + "endGroupGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        group_uid: pData.group_uid,
        uid: pData.uid
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response != "false") {
          console.log("Group game finished.");
          changeSaveData({
            ...pData,
            isPlayingGroup: "0",
            curGroupName: "",
            opponentPlayers: [],
            groupPlayers: []
          });
          navigation.navigate("CreateGroup");
        }
      })
      .catch(err => {
        console.log("Error while ending group game... ", err.message);
      });
  };

  const calcRemainTime = () => {
    let startDateTime = new Date(
      moment(pData.groupGameStartDate + " " + pData.groupGameStartTime)
        .local()
        .format()
    );
    let endDateTime = new Date(
      moment(pData.groupGameEndDate + " " + pData.groupGameEndTime)
        .local()
        .format()
    );
    let now = new Date(
      moment(new Date())
        .local()
        .format()
    );

    let diff = startDateTime.getTime() - now.getTime();
    // console.log("diff = ", diff);
    let end_diff = endDateTime.getTime() - now.getTime();
    if (end_diff < 0) {
      endGroupGame();
    } else if (diff < 0) {
      return (
        <View>
          <Text style={styles.gameName}>The Game already started.</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.normalText}>Mission starts in:</Text>
        <Text style={styles.gameName}>
          {remainHour}
          <Text style={styles.normalText}>hrs </Text>
          {remainMin}
          <Text style={styles.normalText}>mn </Text>
          {remainSec}
          <Text style={styles.normalText}>secs</Text>
        </Text>
      </View>
    );
  };

  const FirstRoute = () => (
    <View style={styles.scene}>
      <Text style={[styles.normalText, { marginTop: 30 * ratio }]}>
        Game name:
      </Text>
      <Text style={[styles.gameName, { marginTop: 10 * ratio }]}>
        {pData.groupName}
      </Text>
      <View style={[styles.invitedBy, { marginTop: 10 * ratio }]}>
        <Text style={styles.invitedByText}>INVITED BY: {pData.groupCreaterName}</Text>
      </View>
      <Text style={[styles.normalText, { marginTop: 10 * ratio }]}>
        Players invited:
      </Text>
      <View
        style={[
          styles.invitedPlayers,
          { marginTop: 10 * ratio, flexWrap: "wrap" }
        ]}
      >
        {pData.groupPlayers.map(player => {
          if (player.isChecked) {
            return (
              <View style={styles.player}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 25,
                    overflow: "hidden"
                  }}
                >
                  <Image
                    source={{ uri: player.photoUrlFront }}
                    style={{ width: 25, height: 25 }}
                    resizeMode={"cover"}
                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14 * ratio,
                    marginLeft: 10 * ratio
                  }}
                >
                  {player.name}
                </Text>
              </View>
            );
          }
        })}
      </View>
      <View style={styles.missionTime}>{calcRemainTime()}</View>
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.scene}>
      <Text style={styles.normalText}>Who's playing</Text>
      <FlatList
        style={{ justifyContent: "center", alignItems: "center" }}
        data={pData.groupPlayers}
        renderItem={({ item }) =>
          item.isChecked ? (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                margin: 10,
                borderRadius: 10
              }}
            >
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.photoUrlFront }}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text
                style={
                  item.currentPoints < 30000
                    ? styles.rookie
                    : item.currentPoints < 90000
                    ? styles.advanced
                    : styles.pro
                }
              >
                {item.currentPoints < 30000
                  ? "Rookie"
                  : item.currentPoints < 90000
                  ? "Advanced"
                  : "Pro"}
              </Text>
            </View>
          ) : null
        }
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        style={{ width: "90%" }}
      />
    </View>
  );

  renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "Details":
        return <FirstRoute jumpTo={jumpTo} />;
      case "Players":
        return <SecondRoute jumpTo={jumpTo} />;
    }
  };

  return (
    <View style={styles.safearea}>
      <Text style={styles.top}>GROUP GAME{"\n"}INVITATION</Text>
      <View style={styles.middle}>
        <TabView
          navigationState={tabState}
          renderScene={renderScene}
          onIndexChange={index => setTabIndex(index)}
          initialLayout={{ width: Dimensions.get("window").width }}
          style={{ backgroundColor: "transparent" }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "white" }}
              style={{ backgroundColor: "transparent" }}
            />
          )}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.buttons}>
          <View style={{ flex: 3 }}></View>
          <View style={styles.backButton}>
            <BackButton
              imgSource={require("../assets/close.png")}
              goBack={() => {
                setCancel(true);
                navigation.navigate("HomeScreen");
              }}
            />
          </View>
          <View style={{ flex: 1 }}></View>
          <View
            style={{ flex: 15, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              onPress={onStartGame}
              style={{ width: "100%" }}
              activeOpacity={0.7}
            >
              <View style={styles.mainButton}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: "archivo",
                    fontSize: 18 * ratio,
                    fontWeight: "bold"
                  }}
                >
                  I AM PLAYING
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3 }}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pro: {
    color: "#FF2300",
    backgroundColor: "rgba(255, 35, 0, .4)",
    borderRadius: 18 * ratio,
    padding: 4 * ratio,
    paddingHorizontal: 10 * ratio
  },
  advanced: {
    color: "#FFDD00",
    backgroundColor: "rgba(255, 251, 0, .4)",
    borderRadius: 18 * ratio,
    padding: 4 * ratio,
    paddingHorizontal: 10 * ratio
  },
  rookie: {
    color: "#1DEEAE",
    backgroundColor: "rgba(29, 238, 174, .4)",
    borderRadius: 18 * ratio,
    padding: 4 * ratio,
    paddingHorizontal: 10 * ratio
  },
  name: {
    marginTop: -60,
    color: "white",
    fontSize: 15 * ratio
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    width: (width / 10) * 4,
    height: 200
  },
  missionTime: {
    position: "absolute",
    bottom: 10 * ratio,
    borderRadius: 25 * ratio,
    backgroundColor: "rgba(255, 255, 255, .3)",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    padding: 20 * ratio
  },
  player: {
    flexDirection: "row",
    marginHorizontal: 10 * ratio,
    justifyContent: "center",
    alignItems: "center"
  },
  invitedPlayers: {
    flexDirection: "row",
    flexShrink: 1
  },
  invitedByText: {
    color: "#1DEEAE",
    fontSize: 13 * ratio,
    padding: 5 * ratio
  },
  invitedBy: {
    backgroundColor: "rgba(29, 238, 174, .5)",
    borderRadius: 18 * ratio
  },
  gameName: {
    color: "white",
    fontSize: 20 * ratio
  },
  normalText: {
    color: "rgb(150, 150, 150)",
    fontSize: 15 * ratio
  },
  scene: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10 * ratio
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
    bottom: 30 * ratio,
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
    backgroundColor: "rgb(50, 50, 50)",
    borderRadius: 35 * ratio,
    marginBottom: 100 * ratio,
    width: "100%"
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

const Invitation = memo(GroupInvitation);

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
