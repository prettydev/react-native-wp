import React, { memo, useState } from "react";
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
} from 'react-native';
import BackButton from '../components/BackButton';
import MapScreen from './MapScreen';

const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;


const InfoScreen = ({ isVisible, pData, goBack, goDashboard }) => {
  const [isOpenMap, setOpenMap] = useState(false);
  
  return (
    
    <Modal 
      animationType="slide"
      visible={isVisible}
      style={styles.modal}
      >
      <MapScreen
        isVisible={isOpenMap}
        goBack={()=>setOpenMap(false)}
        pData = {pData}
      />
      <View style={styles.safearea}>
        <Text style={styles.header}>{pData.name}</Text>
        <View style={styles.rookie_group}>
          <Text style={[styles.status_style,
            pData.status == 'Rookie' ? styles.rookie : pData.status=="Pro"?styles.pro:styles.advanced
          ]}>{pData.status}</Text>
        </View>
        <View style={styles.location}>
          <Image
            source = {require('../assets/location_icon.png')}
          />
          <Text style={styles.normalText}>Location:</Text>
          <Text style={styles.mainText}>{pData.locationName}</Text>
          <TouchableOpacity onPress={()=>setOpenMap(true)} style={styles.button}>
            <Text style={styles.buttonText}>OPEN MAP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.location}>
          <Image
            source = {require('../assets/calender_icon.png')}
          />
          <Text style={styles.normalText}>Age:</Text>
          <Text style={styles.mainText}>{pData.age} y/o</Text>
        </View>
        <View style={styles.location}>
          <Image
            source = {require('../assets/calender_icon.png')}
          />
          <Text style={styles.normalText}>Date joined:</Text>
          <Text style={styles.mainText}>{pData.dateJoined}</Text>
        </View>
        <View style={styles.bottom}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 3}}></View>
          <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
              <BackButton
                imgSource={require('../assets/down-arrow.png')}
                goBack = {goBack}
              />
          </View>
          <View style={{flex: 3}}></View>
          <View style={{flex: 15, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress = {()=>goDashboard()} style={{width:"100%"}} activeOpacity={.7}>
              <View  style={{backgroundColor: 'red', borderRadius:10 * ratio, height:48 * ratio, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:"white",fontFamily:"archivo", fontSize:18 * ratio, fontWeight:"bold"}}>UPDATE PROFILE</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 3}}></View>
        </View>
      </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop:50 * ratio, 
    fontSize:25 * ratio, 
    color:"white", 
    fontWeight:"bold", 
    fontFamily: "Archivo", 
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 14 * ratio,
    color: 'white',
    textAlign: 'center'
  },
  button: {
    paddingHorizontal: 20 * ratio,
    paddingVertical: 5 * ratio,
    borderRadius: 5 * ratio,
    borderColor: 'rgba(255, 255, 255, .7)',
    borderWidth: 2,
    backgroundColor: 'black',
    marginTop: 10 * ratio,
  },
  mainText: {
    fontSize: 18 * ratio,
    color: 'white',
    textAlign: 'center',
    marginTop: 10 * ratio,
  },
  normalText: {
    fontSize: 15 * ratio,
    color: 'rgba(255, 255, 255, .7)',
    textAlign: 'center',
    marginTop: 10 * ratio,
  },
  location: {
    paddingVertical: 20 * ratio,
    marginTop: 20 * ratio,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20 * ratio,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rookie_group: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10 * ratio
  },
  modal: {
    width: '100%',
    height: '100%',
  },
  rookie: {
    borderRadius: 18 * ratio,
    backgroundColor: "rgba(29, 238, 174, .4)",
    shadowColor: "rgba(0, 0, 0, .16)",
    paddingHorizontal: 15 * ratio,
    paddingVertical: 5 * ratio,
    fontSize: 15 * ratio,
    color: 'white',
    fontWeight: 'bold',
    alignContent:'center',
    marginRight: 10 * ratio,
    color: "#1DEEAE"
  },
  bottom:{
    flex: 1, 
    width: '100%', 
    flexDirection: 'row', 
    position: 'absolute', 
    bottom: 30 * ratio, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  safearea:{
    alignItems: 'center',
    height: '100%',
    backgroundColor: "black",
  },
  status_style: {
    borderRadius: 18 * ratio,
    shadowColor: "rgba(0, 0, 0, .16)",
    paddingHorizontal: 15 * ratio,
    paddingVertical: 5 * ratio,
    fontSize: 15 * ratio,
    color: 'white',
    fontWeight: 'bold',
    alignContent:'center',
    marginRight: 10 * ratio,
  },
  rookie: {
    backgroundColor: "rgba(29, 238, 174, .4)",
    color: "#1DEEAE"
  },
  pro: {
    color: '#FF2300',
    backgroundColor: 'rgba(255, 35, 0, .4)',
  },
  advanced: {
    color: '#FFDD00',
    backgroundColor: 'rgba(255, 251, 0, .4)',
  },
});

export default InfoScreen;
