import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import { baseApiUrl } from "../core/const";
const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const LeaderBoards = ({ isVisible, pData, goBack, changeSaveData }) => {
  const [tableData, setTableData] = useState([]);

  const renderImage = url => {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
          overflow: "hidden",
          marginLeft: 20
        }}
      >
        <Image
          source={{ uri: url }}
          style={{ width: 30, height: 30 }}
          resizeMode="cover"
        />
      </View>
    );
  };
  const tableHead = ["Rank", "Player", "Score", "Location"];

  const getPlayerScores = () => {
    fetch(baseApiUrl + "getPlayerScores&uid=" + pData.uid, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        const res = JSON.parse(response);
        const data = res.map((player, idx) => {
          if (player["uid"] == pData.uid) {
            changeSaveData({
              ...pData,
              playerScores: res
            });
          }
          return [
            idx + 1,
            renderImage(player["photoUrlFront"]),
            player["currentPoints"],
            player["locationName"]
          ];
        });
        setTableData(data);
      })
      .catch(err => {
        console.log("Error while getting players scores. ", err.message);
      });
  };

  useEffect(() => {
    getPlayerScores();
    console.log("playerScores = ", tableData);
  }, []);

  return (
    <Modal animationType="slide" visible={isVisible} style={styles.modal}>
      <View style={styles.safearea}>
        <View style={styles.top}>
          <Text style={styles.header}>LEADERBOARDS</Text>
          <Text
            style={{
              fontSize: 18 * ratio,
              color: "rgba(255, 255, 255, .8)",
              textAlign: "center"
            }}
          >
            Raymundo
          </Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.tableHeader}>WORLD RANKING</Text>
          <View style={{ width: "90%", height: "100%" }}>
            <Table>
              <Row
                data={tableHead}
                flexArr={[1, 1, 2, 2]}
                style={styles.tableFixedRow}
                textStyle={styles.tableText}
              ></Row>
              <ScrollView style={{ marginBottom: 100 }}>
                <Table>
                  <Rows
                    data={tableData}
                    flexArr={[1, 1, 2, 2]}
                    style={styles.tableRow}
                    textStyle={styles.tableText}
                  ></Rows>
                </Table>
              </ScrollView>
            </Table>
          </View>
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
  tableText: {
    color: "white",
    textAlign: "center"
  },
  wrapper: { flexDirection: "row" },
  tableRow: {
    height: 50
  },
  tableFixedRow: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 5 * ratio,
    marginVertical: 5
  },
  tableHeader: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "bold",
    color: "white",
    fontSize: 18 * ratio
  },
  top: {
    position: "absolute",
    textAlign: "center"
  },
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
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20 * ratio,
    alignItems: "center",
    marginBottom: 80 * ratio,
    marginTop: 120 * ratio
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

export default LeaderBoards;
