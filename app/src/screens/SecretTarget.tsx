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

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;

const ClosePlayers = ({ navigation, pData }) => {
    
  return (
    <View style={styles.safearea}>
      <View style={styles.top}>
        <Text style={[styles.titleText, {marginTop: 70 * ratio}]}>
          YOUR SECRET{'\n'}TARGET
        </Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: pData.opponentPlayers[0].photoUrlFront}}
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: pData.opponentPlayers[0].photoUrlSide}}
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>
        <Text style={styles.normalText}>Reward:</Text>
        <Text style={styles.titleText}>20,000 POINTS</Text>
      </View>
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
  normalText: {
    fontSize: 15 * ratio,
    color: 'rgb(200, 200, 200)',
    textAlign: 'center'
  },
  top: {
    flex: 2
  },
  titleText: {
    color: 'white',
    fontSize: 25*ratio,
    fontWeight: 'bold',
    marginBottom: 20 * ratio,
    textAlign: 'center'
  },
  middle: {
    flex: 7,
    width: '100%', 
    backgroundColor: '#707070',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    justifyContent: 'center',
    alignItems: 'center'
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
  imageContainer: {
    width: 172 * ratio,
    height: 172 * ratio,
    borderRadius: 172 * ratio,
    marginTop: 20,
    overflow: 'hidden'
  },
  image: {
    width: 172 * ratio,
    height: 172 * ratio,
  }
});

const mapStateToProps = (state) => ({
  pData: state.data
});

const Players = memo(ClosePlayers);

export default connect(mapStateToProps)(Players);
