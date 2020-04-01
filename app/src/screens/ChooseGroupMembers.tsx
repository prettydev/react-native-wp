import React, { memo, useState, useEffect } from "react";
import BackButton from'../components/BackButton';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { connect } from "react-redux";
import { TabView, SceneMap } from 'react-native-tab-view';
import { ScrollView } from "react-native-gesture-handler";
import { change_save_data } from '../core/reducer';
import Modal from 'react-native-modal';


const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;

const ChooseGroupMembers = ({ isVisible, goBack, pData }) => {
  const [userData, setUserData] = useState([]);

  useEffect(()=>{
    const data = [];

    console.log("Choose Members pData = ", pData);

    pData.userLocations.map((playerData)=>{
      if(playerData.uid != pData.uid){
        data.push({
          isChecked: false,
          name: playerData.name,
          uid: playerData.uid,
          photoUrlFront: playerData.photoUrlFront,
          currentPoints: playerData.currentPoints
        })
      }
    });
    setUserData(data);
  }, []);

  const renderTarget = () => {
    return userData.map((playerData, index)=>{
        
        return (
          <TouchableOpacity 
            style={styles.player}
            onPress={()=>{
              console.log("data = ", userData);
              userData[index].isChecked = !userData[index].isChecked;
              setUserData([...userData]);
            }}
          >
            <View style={styles.listItem}>
              <Image
                  source={{uri: playerData.photoUrlFront}}
                  style={{width: 50, height: 50}}
                  resizeMode={'cover'}
              />
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>{playerData['name']}</Text>
              <Text style={{color: 'gray', fontSize: 15}}>Current Points {playerData['currentPoints']}</Text>
            </View>
            <View style={styles.checkbox}>
              <Image
                source={userData[index].isChecked?require('../assets/checked.png'):require('../assets/unchecked.png')}
              />
            </View>
          </TouchableOpacity>
        );
    });
  }
  
  return (
    <Modal 
        isVisible={isVisible}
        style={styles.safearea}
        onPressBack={goBack}
    >
      <Text style={styles.top}>
        SELECT GROUP MEMBERS
      </Text>
      <Text style={styles.normalText}>
          Players nearby
      </Text>
      <ScrollView style={styles.middle}>
        {renderTarget()}
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.buttons}>
            <View style={styles.backButton}>
                <BackButton
                    imgSource={require('../assets/left-arrow.png')}
                    goBack={() => goBack(userData)}
                />
            </View>
        </View>
      </View>        
    </Modal>
  );
}

const styles = StyleSheet.create({
  listItem:{
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden'
  },
  player:{
    flexDirection: 'row',
    backgroundColor: 'rgb(50, 50, 50)',
    borderRadius: 15,
    padding: 5,
    marginVertical: 10
  },
  normalText: {
    fontSize: 15 * ratio,
    color: 'rgb(200, 200, 200)',
    textAlign: 'center'
  },
  top: {
    marginTop: 70 * ratio,
    color: 'white',
    fontSize: 25*ratio,
    fontWeight: 'bold',
    marginBottom: 20 * ratio,
    textAlign: 'center'
  },
  bottom: {
    width: '100%', 
    flexDirection: 'row', 
    position: 'absolute', 
    bottom: 30, 
    alignItems: 'center', 
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  safearea:{
    flex:1, 
    position: "relative",
    backgroundColor: "black",
    alignItems: 'center'
  },
  middle: {
    flex: 1,
    width: '80%',
  },
  buttons: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  backButton: {
    flex: 4, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  mainButton: {
    backgroundColor: 'red', 
    borderRadius:10 * ratio, 
    height:48 * ratio, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  checkbox: {
    position: 'absolute',
    right: 30,
    top: 20,
    bottom: 20
  }
});

const mapStateToProps = (state) => ({
  pData: state.data
});

const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  }
});

const GroupMembers = memo(ChooseGroupMembers);

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
