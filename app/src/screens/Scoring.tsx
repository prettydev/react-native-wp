import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Image
} from "react-native";
import BackButton from "../components/BackButton";
import { baseApiUrl } from "../core/const";
const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const Scoring = ({ isVisible, pData, goBack }) => {
  const [tb_score, setTbScore] = useState({});
  const getScoringTable = () => {
    fetch(baseApiUrl + "getScoreTable", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        const res = JSON.parse(response);
        console.log(res);
        setTbScore({
          group_game: res["group_game"],
          free_game: res["free_game"],
          secret_min: res["secret_min"],
          secret_max: res["secret_max"],
          chosen_kill: res["chosen_kill"]
        });
      })
      .catch(err => {
        console.log("Error while getting score table. ", err.message);
      });
  };

  useEffect(() => {
    getScoringTable();
  }, []);

  return (
    <Modal animationType="slide" visible={isVisible} style={styles.modal}>
      <View style={styles.safearea}>
        <Text style={styles.header}>SCORING</Text>
        <View style={styles.location}>
          <Text style={styles.normalText}>Group game kills</Text>
          <Text style={styles.mainText}>{tb_score.group_game} POINTS</Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.normalText}>Free for all kills</Text>
          <Text style={styles.mainText}>{tb_score.free_game} POINTS</Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.normalText}>Secret mission kills</Text>
          <Text style={styles.mainText}>
            {tb_score.secret_min}-{tb_score.secret_max} POINTS
          </Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.normalText}>Chosen kills</Text>
          <Text style={styles.mainText}>
            {tb_score.chosen_kill}% OF THEIR TOTAL PTS
          </Text>
        </View>
        <View style={styles.bottom}>
          <BackButton
            imgSource={require("../assets/down-arrow.png")}
            goBack={goBack}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50 * ratio,
    fontSize: 25 * ratio,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Archivo",
    textAlign: "center"
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
  },
  mainText: {
    fontSize: 18 * ratio,
    color: "white",
    textAlign: "center",
    marginTop: 10 * ratio
  },
  normalText: {
    fontSize: 15 * ratio,
    color: "rgba(255, 255, 255, .7)",
    textAlign: "center",
    marginTop: 10 * ratio
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
  rookie_group: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10 * ratio
  },
  modal: {
    width: "100%",
    height: "100%"
  },
  rookie: {
    borderRadius: 18 * ratio,
    backgroundColor: "rgba(29, 238, 174, .4)",
    shadowColor: "rgba(0, 0, 0, .16)",
    paddingHorizontal: 15 * ratio,
    paddingVertical: 5 * ratio,
    fontSize: 15 * ratio,
    color: "white",
    fontWeight: "bold",
    alignContent: "center",
    marginRight: 10 * ratio,
    color: "#1DEEAE"
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
  safearea: {
    alignItems: "center",
    height: "100%",
    backgroundColor: "black"
  }
});

export default Scoring;
