import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Image,
  Picker
} from "react-native";
import BackButton from "../components/BackButton";
import SpinButton from "../components/SpinButton";
import { Dropdown } from "react-native-material-dropdown";
import { baseApiUrl } from "../core/const";
const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const Settings = ({ isVisible, goBack, pData }) => {
  const [isAssassin, setAssassin] = useState(
    pData.isPlayingSecret == "1" ? true : false
  );
  const [isGroup, setGroup] = useState(
    pData.isPlayingGroup == "1" ? true : false
  );
  const [isPick, setPick] = useState(pData.isPlayingPick == "1" ? true : false);
  const [isVisibility, setVisibility] = useState(
    pData.isVisible == "1" ? true : false
  );

  const updateDBnReturn = () => {
    fetch(baseApiUrl + "updateSettings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid: pData.uid,
        isPlayingSecret: isAssassin ? 1 : 0,
        isPlayingGroup: isGroup ? 1 : 0,
        isPlayingPick: isPick ? 1 : 0,
        isVisible: isVisibility ? 1 : 0
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("update setting response = ", response);
      })
      .catch(err => {
        console.log("update setting error = ", err.message);
      });
    goBack();
  };

  return (
    <Modal animationType="slide" visible={isVisible} style={styles.modal}>
      <View style={styles.safearea}>
        <Text style={styles.header}>SETTINGS</Text>
        <Text style={styles.normalText}>Playing Live</Text>
        <Text style={styles.normalText}>(Assassin Mission)</Text>
        <SpinButton
          isOn={isAssassin}
          goBack={() => setAssassin(!isAssassin)}
          style={{ marginTop: 10 * ratio, marginBottom: 20 * ratio }}
          disabled={!isAssassin}
        />
        <Text style={styles.normalText}>Playing Live</Text>
        <Text style={styles.normalText}>(Group Challenge)</Text>
        <SpinButton
          isOn={isGroup}
          goBack={() => setGroup(!isGroup)}
          style={{ marginTop: 10 * ratio, marginBottom: 20 * ratio }}
          disabled={!isGroup}
        />
        <Text style={styles.normalText}>Playing Live</Text>
        <Text style={styles.normalText}>(Pick a Target Assassinations)</Text>
        <SpinButton
          isOn={isPick}
          goBack={() => setPick(!isPick)}
          style={{ marginTop: 10 * ratio, marginBottom: 20 * ratio }}
          disabled={!isPick}
        />
        {/* <Text style={styles.normalText}>Pick a group</Text>
        <View style={styles.dropdown}>
            <Picker
              style={{backgroundColor: 'black', color: 'white', width: 280 * ratio, height: 30 * ratio}}
              selectedValue={selected}
              onValueChange={(val, idx)=>{
                setCurGroup(idx);
                setSelected(val);
              }}
            >
              {renderPickerItem()}
            </Picker>
        </View> */}
        <Text style={styles.normalText}>Visibility</Text>
        <Text style={styles.normalText}>(You are offline right now)</Text>
        <SpinButton
          isOn={isVisibility}
          goBack={() => setVisibility(!isVisibility)}
          style={{ marginTop: 10 * ratio, marginBottom: 20 * ratio }}
        />
        <View style={styles.bottom}>
          <BackButton
            imgSource={require("../assets/down-arrow.png")}
            goBack={() => updateDBnReturn()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  normalText: {
    fontSize: 16 * ratio,
    color: "white",
    textAlign: "center"
  },
  header: {
    marginTop: 50 * ratio,
    fontSize: 25 * ratio,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Archivo",
    textAlign: "center",
    marginBottom: 20 * ratio
  },
  bottom: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    bottom: 30 * ratio,
    alignItems: "center",
    justifyContent: "center"
  },
  safearea: {
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "100%",
    height: "100%"
  },
  dropdown: {
    width: 300 * ratio,
    height: 40 * ratio,
    borderRadius: 8 * ratio,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, .5)"
  },
  dropdownContainer: {
    width: 200,
    borderColor: "green"
  },

  dropdownStyle: {
    width: 200,
    borderColor: "green",
    margin: 0,
    padding: 0
  },

  dropdownPicker: {
    backgroundColor: "#EAEAEA",
    width: 200,
    height: 200,
    margin: 0,
    padding: 0
  },
  containerHeader: {
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5722"
  },

  headerTxt: {
    color: "white"
  },

  mainContainer: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

export default Settings;
