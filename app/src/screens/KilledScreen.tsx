import React, { memo, useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import Modal from 'react-native-modal';
import { baseApiUrl, PostServer} from "../core/const";

const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;


const KilledScreen = ({navigation, isVisible, goBack, killed, pData}) => {
  const [message, setMessage] = useState('');

  const onSubmitMessage = () => {
    console.log('!@$@#$--------------->', killed);
    const user_data = {
      from_user_id : pData.uid,
      to_user_id : killed.uid,
      data : {
          message: message,
          victimName: pData.name
      }
    }
    // pData.socket.emit("send_message", user_data);

    PostServer(
      'sendNotification',
      {
        from_user_id: pData.uid,
        to_user_id: killed.uid,
        message_id : "die",
        data: {
          message: message,
          victimName: pData.name,
          victimUid: pData.uid,
          killerUid: killed.uid
        }
      }
    )
    .then((res) => {
      console.log('[SPIDER] [KILLED] [OK] Sent Notification', res);
    })
    .catch((err) => {
      console.log('[SPIDER] [KILLED] [ERR] send Notification', err);
    });

    isVisible = false;
    goBack();
  }
  
  return (
    <Modal 
      animationType="slide"
      isVisible={isVisible}
      swipeDirection={'down'}
      onSwipeComplete={goBack}
      onBackButtonPress={goBack}
      onBackdropPress={goBack}
      style={{justifyContent: 'flex-end', margin: 0}}
      >
       <Image
        source={require('../assets/Blood.png')}
        style={{position: 'absolute', zIndex: 1, height:height, bottom:height/4}}
      />
      <View style={styles.safearea}>
        <View style={{width: 125, height: 125, borderRadius:125, overflow: 'hidden'}}>
          <Image
            source={{uri: killed.data?killed.data.killerImage:""}}
            resizeMode={'cover'}
            style={{width: 125, height: 125}}
          />
        </View>
        <Text style={styles.title}>GAME OVER!{'\n'}YOU WERE KILLED BY {'\n'}{pData.killerName}</Text>
        <View style={styles.message}>
          <View style={{width: 35, height: 35, borderRadius:35, overflow: 'hidden'}}>
            <Image
              source={{uri: killed.data?killed.data.killerImage:""}}
              resizeMode={'cover'}
              style={{width: 35, height: 35}}
            />
          </View>
          <View style={styles.message_body}>
          <Text style={styles.message_text}>{killed.data?killed.data.message:""}</Text>
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder = "Type Message"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity onPress = {()=>onSubmitMessage()} style={{width:"80%"}} activeOpacity={.7}>
            <View  style={{backgroundColor: 'red', borderRadius:10 * ratio, height:48 * ratio, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:"white",fontFamily:"archivo", fontSize:18 * ratio, fontWeight:"bold"}}>SEND PIC {'&'} MESSAGE</Text>
            </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safearea:{
    height: 400,
    alignItems: 'center',
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent:'space-around'
  },
  title: {
    fontSize: 18 * ratio,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  textInput: {
    marginBottom: 20, 
    width:"80%", 
    height: 40, 
    borderColor: 'gray', 
    borderBottomWidth: 1, 
    borderBottomColor: "lightgray", 
    color: 'white' , 
    padding: 0
  },
  message: {
    flexDirection: 'row',
    width: '80%'
  },
  message_body: {
    borderTopRightRadius: 17 * ratio,
    borderBottomRightRadius: 17 * ratio,
    borderBottomLeftRadius: 17 * ratio,
    padding: 10 * ratio,
    backgroundColor: '#6f6f6f',
    marginLeft: 20 * ratio
  },
  message_text: {
    color: '#FFFFFF',
    fontSize: 14 * ratio
  }
});

export default KilledScreen;
