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
import { connect } from "react-redux";
import BackButton from "../components/BackButton";
import { change_save_data } from "../core/reducer";
import Modal from "react-native-modal";
import moment from "moment";
import { baseApiUrl } from "../core/const";

const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const HomeMenu = ({
  navigation,
  isVisible,
  goBack,
  goBack4Secret,
  changeSaveData,
  pData
}) => {
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

  const onCreateGroup = () => {
    goBack();
    if (pData.isPlayingGroup == "1") {
      fetch(baseApiUrl + "getGroupGameStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          group_uid: pData.curGroupName,
          uid: pData.uid
        })
      })
        .then(response => response.json())
        .then(response => {
          const groupInfo = JSON.parse(response);
          console.log("Group Info = ", groupInfo);
          changeSaveData({
            ...pData,
            curGame: "group",
            group_uid: groupInfo.group_uid,
            group_creator: groupInfo.groupCreator,
            groupName: groupInfo.groupName,
            groupPlayers: JSON.parse(groupInfo.groupPlayers),
            opponentPlayers: JSON.parse(groupInfo.groupPlayers),
            groupGameStartDate: groupInfo.startDate,
            groupGameEndDate: groupInfo.endDate,
            groupGameStartTime: groupInfo.startTime,
            groupGameEndTime: groupInfo.endTime,
            groupGameIsOpened: groupInfo.isOpened
          });
          let startDateTime = new Date(
            moment(groupInfo.startDate + " " +  groupInfo.startTime)
              .local()
              .format()
          );
          let endDateTime = new Date(
            moment(groupInfo.endDate + " " + groupInfo.endTime)
              .local()
              .format()
          );
          let now = new Date(
            moment(new Date())
              .local()
              .format()
          );
          let diff_start = startDateTime.getTime() - now.getTime();
          let diff_end = endDateTime.getTime() - now.getTime();

          if (diff_end < 0) {
            endGroupGame();
          } else {
            if (diff_start < 0) {
              navigation.navigate("FaceRecognition");
            } else {
              navigation.navigate("GroupInvitation");
            }
          }
        })
        .catch(err => {
          console.log("Error while getting group game status. ", err.message);
          endGroupGame();
        });
    } else {
      changeSaveData({
        ...pData,
        curGame: "group"
      });
      navigation.navigate("CreateGroup");
    }
  };

  const onSecretMission = () => {
    if (pData.isPlayingSecret != "1" || pData.isPlayingSecret != true) {
      fetch(baseApiUrl + "createSecretMission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uid: pData.uid,
          latitude: pData.latitude,
          longitude: pData.longitude
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response == "null") {
            alert(
              "Cannot find nearby players. Please check your location setting."
            );
            goBack();
          } else {
            const secretOpponet = JSON.parse(response);
            console.log("Secret Mission opponent = ", secretOpponet);

            changeSaveData({
              ...pData,
              curGame: "secret",
              opponentPlayers: [secretOpponet]
            });
            goBack4Secret();
          }
        })
        .catch(err => {
          console.log("Error while creating secret mission. ", err.message);
        });
    } else {
      fetch(baseApiUrl + "getSecretOpponent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uid: pData.uid
        })
      })
        .then(response => response.json())
        .then(response => {
          const secretOpponet = JSON.parse(response);
          console.log("Secret Mission opponent = ", secretOpponet);

          changeSaveData({
            ...pData,
            curGame: "secret",
            opponentPlayers: [secretOpponet]
          });
          goBack();
          navigation.navigate("FaceRecognition");
        })
        .catch(err => {
          console.log("Error while getting secret opponent. ", err.message);
        });
    }
  };

  return (
    <Modal
      animationType="slide"
      isVisible={isVisible}
      swipeDirection={"down"}
      onSwipeComplete={goBack}
      onBackButtonPress={goBack}
      onBackdropPress={goBack}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.safearea}>
        <View style={styles.topBar}></View>
        <TouchableOpacity
          onPress={() => {
            goBack();
            changeSaveData({
              ...pData,
              curGame: "free",
              opponentPlayers: pData.userLocations
            });
            navigation.navigate("FaceRecognition");
          }}
          style={styles.menuItem}
        >
          <Text style={styles.itemText}>FREE FOR ALL</Text>
          <Text style={styles.itemRight}>></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCreateGroup} style={styles.menuItem}>
          <Text style={styles.itemText}>CREATE A GROUP</Text>
          <Text style={styles.itemRight}>></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSecretMission} style={styles.menuItem}>
          <Text style={styles.itemText}>ACCEPT A MISSION</Text>
          <Text style={styles.itemRight}>></Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            goBack();
            changeSaveData({
              ...pData,
              curGame: "pick"
            });
            navigation.navigate("TargetScreen");
          }}
          style={styles.menuItem}
        >
          <Text style={styles.itemText}>PICK A TARGET</Text>
          <Text style={styles.itemRight}>></Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safearea: {
    height: 200,
    alignItems: "center",
    backgroundColor: "red",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-around"
  },
  topBar: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: "white",
    marginTop: 12
  },
  menuItem: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between"
  },
  itemText: {
    color: "white",
    fontSize: 25 * ratio,
    fontWeight: "bold",
    justifyContent: "flex-start"
  },
  itemRight: {
    color: "white",
    fontSize: 25 * ratio,
    fontWeight: "bold",
    justifyContent: "flex-end"
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeMenu);
