import React, { memo, useState } from "react";
import BackButton from'../components/BackButton';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import { connect } from "react-redux";
import { LinearGradient } from "react-native-linear-gradient";

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;

const ClosePlayers = ({ navigation, pData }) => {
  const [isCancel, setCancel] = useState(false);
  const dataPlayers = pData.opponentPlayers.map((item, idx)=>{
    return {
      id: idx, name: item.name, playerType: item.status, src: item.photoUrlFront
    }
  });
  

  const renderTarget = () => {
    return (
        <View style={styles.scene}>
            <FlatList
                style={{justifyContent: 'center', alignItems: 'center'}}
                data={dataPlayers}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', margin: 10, borderRadius: 10 }}>
                      <Image 
                          style={styles.imageThumbnail} 
                          source={{uri: item.src}} 
                      />
                      <Text style={styles.name}>{item.name}{'\n'}10mts</Text>
                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                style={{width: '90%', }}
            />
        </View>
    );
  }
  
  
  return (
    <View style={styles.safearea}>
      <Text style={styles.top}>
        {pData.curGame=='free'?'THEY\'RE CLOSE':'GROUP MEMBERS'}
      </Text>
      {renderTarget()}
      <View style={styles.bottom}>
        <View style={styles.buttons}>
            <View style={styles.backButton}>
                <BackButton
                    imgSource={require('../assets/left-arrow.png')}
                    goBack={() => {
                        navigation.navigate("FaceRecognition");
                    }}
                />
            </View>
        </View>
      </View>        
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    marginTop: -60,
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 10 * 4,
    height: 200,
    borderRadius: 20
  },
  normalText:{
    color: 'rgb(150, 150, 150)',
    fontSize: 15 * ratio,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    borderRadius: 20,
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
  }
});

const mapStateToProps = (state) => ({
  pData: state.data
});

const Players = memo(ClosePlayers);

export default connect(mapStateToProps)(Players);
