import React, { memo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { baseApiUrl, PostServer} from "../core/const";
const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const TopShotScreen = ({ isVisible, goBack, killed, pData }) => {
  const [message, setMessage] = useState("");

  const onSubmitKills = () => {
    fetch(baseApiUrl + "updateHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        killerUid: pData.uid,
        killerName: pData.name,
        victimUid: killed.uid,
        victimName: killed.name,
        killerCurrentScore: pData.currentPoints,
        mission_type: pData.curGame
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response == "1") {
          console.log("Updating history successed.");
        }
      })
      .catch(err => {
        console.log("Error while updating history.");
      });
    // pData.socket.emit("send_message", user_data);
    PostServer(
      'sendNotification',
      {
        from_user_id: pData.uid,
        to_user_id: killed.uid,
        message_id: "kill",
        data: {
          message: message,
          killerName: pData.name,
          killerUid: pData.uid,
          victimUiD: killed.uid,
          killerImage: pData.photoUrlFront
        }
      }
    )
    .then((res) => {
      console.log('[SPIDER] [TOPSHOT] [OK] Sent Notification', res);
    })
    .catch((err) => {
      console.log('[SPIDER] [TOPSHOT] [ERR] send Notification', err);
    });

    goBack();
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
        <View
          style={{
            width: 125,
            height: 125,
            borderRadius: 125,
            overflow: "hidden"
          }}
        >
          <Image
            source={{ uri: killed.photoUrlFront }}
            resizeMode={"cover"}
            style={{ width: 125, height: 125 }}
          />
        </View>
        <Text style={styles.title}>
          TOP SHOT!{"\n"}YOU KILLED {killed.name}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type Message"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity
          onPress={() => onSubmitKills()}
          style={{ width: "80%" }}
          activeOpacity={0.7}
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
              SEND PIC {"&"} MESSAGE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safearea: {
    height: 400,
    alignItems: "center",
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-around"
  },
  title: {
    fontSize: 18 * ratio,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
  textInput: {
    marginBottom: 20,
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    color: "white",
    padding: 0
  }
});

export default TopShotScreen;
