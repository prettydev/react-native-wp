import React, { memo, useState } from 'react';
import BackButton from '../components/BackButton';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import iconDate from '../assets/calendar.png';
import iconTime from '../assets/clock.png';
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input';
import { FlatList } from 'react-native-gesture-handler';
import ChooseGroupMembers from './ChooseGroupMembers';
import { change_save_data } from '../core/reducer';

import { baseApiUrl } from '../core/const';

const height = Math.round(Dimensions.get('window').height);
const ratio = height / 812;

const CreateGroup = ({ navigation, pData, changeSaveData }) => {
  const [groupName, setGroupName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isCancel, setCancel] = useState(false);
  const [isVisibleUsers, setVisibleUsers] = useState(false);
  const [userData, setUserData] = useState([]);

  const renderIcon = (value) => {
    return <Image source={value} />;
  };

  const _renderItem = (data) => {
    const recvData = [];
    data.map((item) => {
      if (item.isChecked) {
        recvData.push(item.uid);
      }
    });
    if (recvData.length <= 0) {
      return <Text style={styles.textinput}>Enter screen name</Text>;
    } else {
      return data.map((item) => {
        return item.isChecked ? (
          <View style={styles.members}>
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 25,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: item.photoUrlFront }}
                style={{ width: 25, height: 25 }}
                resizeMode={'cover'}
              />
            </View>
            <Text style={{ color: 'white', fontSize: 14 * ratio }}>
              {item.name}
            </Text>
            <Image source={require('../assets/smallClose.png')} />
          </View>
        ) : null;
      });
    }
  };

  const onSendInvitation = () => {
    //handling exceptions
    if (userData.length <= 0) {
      return;
    }
    let startDateTime = new Date(startDate + ' ' + startTime);
    let endDateTime = new Date(endDate + ' ' + endTime);
    let now = new Date();
    let diff = startDateTime.getTime() - now.getTime();
    if (diff < 0) {
      alert('You set start time wrong. Please check again.');
      return;
    }
    diff = endDateTime.getTime() - startDateTime.getTime();
    if (diff < 0) {
      alert('You set start time and end time wrong. Please check again');
      return;
    }

    const recvData = [];
    userData.map((item) => {
      if (item.isChecked) {
        recvData.push(item.uid);
      }
    });

    if (recvData.length <= 0) {
      alert('Please select one or more group members...');
      return;
    }

    const acceptedMembers = [pData.uid];

    //updating database
    fetch(baseApiUrl + 'createGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupName: groupName,
        groupCreator: pData.uid,
        groupPlayers: recvData,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        acceptedMembers: acceptedMembers,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('create group response = ', response);
        if (response != false) {
          console.log('Creating group successed!');
          const group_uid = JSON.parse(response);

          fetch(baseApiUrl + 'sendNotification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from_user_id: pData.uid,
              to_user_id: recvData,
              message_id: 'group_invite',
              data: {
                group_creater_uid: pData.uid,
                group_uid: group_uid,
                group_name: groupName,
                sender: pData.name,
                senderImage: pData.photoUrlFront,
                receiver: recvData,
              },
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              console.log('Send notification result = ', response, recvData);

              //   const group_data = {
              //     from_user_id: pData.uid,
              //     to_user_id: "*",
              //     message_id: "group_invite",
              //     data: {
              //       group_uid: group_uid,
              //       notification_uid: response,
              //       group_name: groupName,
              //       sender: pData.name,
              //       senderImage: pData.photoUrlFront,
              //       receiver: recvData
              //     }
              //   };
              //   pData.socket.emit("send_message", group_data);
              //   changeSaveData({
              //     ...pData,
              //     group_uid: group_uid,
              //     group_creator: pData.uid,
              //     groupName: groupName,
              //     groupPlayers: userData,
              //     groupGameStartDate: startDate,
              //     groupGameEndDate: endDate,
              //     groupGameStartTime: startTime,
              //     groupGameEndTime: endTime
              //   });
              //   navigation.navigate("GroupInvitation");
              // })
              // .catch(err => {
              //   console.log(
              //     "Error while sending group notication. ",
              //     err.message
              //   );
            });
        }
      })
      .catch((err) => {
        console.log('Error while creating group... ', err.message);
        alert('Error while creating group...', err.message);
      });
  };

  return (
    <View style={styles.safearea}>
      <ChooseGroupMembers
        isVisible={isVisibleUsers}
        goBack={(data) => {
          setUserData([...data]);
          setVisibleUsers(false);
        }}
        pData={pData}
      />
      <Modal
        isVisible={isCancel}
        animationType="slide"
        swipeDirection={'down'}
        onSwipeComplete={() => setCancel(false)}
        onBackButtonPress={() => setCancel(false)}
        onBackdropPress={() => setCancel(false)}
        style={styles.rnModal}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: 'rgb(50, 50, 50)',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 25,
              flexShrink: 1,
              width: '80%',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            GOING BACK?
          </Text>
          <Text
            style={{
              fontSize: 15,
              flexShrink: 1,
              width: '80%',
              color: 'rgba(255, 255, 255, .7)',
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            Everything you just set for the game will not be saved anywhere.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            style={{
              width: '60%',
              borderRadius: 9,
              borderWidth: 3,
              borderColor: 'rgba(255, 255, 255, .4)',
              backgroundColor: 'black',
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              BACK TO PROFILE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCancel(false)}
            style={{
              width: '60%',
              borderRadius: 9,
              borderWidth: 3,
              borderColor: 'rgba(255, 255, 255, .4)',
              backgroundColor: 'black',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.top}>CREATE GROUP{'\n'}GAME</Text>
      <TextInput
        style={styles.textinput}
        placeholder={'Group game name'}
        placeholderTextColor={'rgba(255, 255, 255, .7)'}
        text={groupName}
        onChangeText={(text) => setGroupName(text)}
      />
      <Text style={styles.middle}>INVITE PLAYERS USING{'\n'}SCREEN NAMES</Text>
      <TouchableOpacity
        style={{ flexDirection: 'row', flexWrap: 'wrap' }}
        onPress={() => setVisibleUsers(true)}
      >
        {_renderItem(userData)}
      </TouchableOpacity>
      <Text style={styles.middle}>DATE AND TIME</Text>
      <View style={styles.datePickerContainer}>
        <DatePicker
          style={styles.datePicker}
          mode="date"
          date={startDate}
          placeholder="Start date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconComponent={renderIcon(iconDate)}
          customStyles={{
            dateInput: {
              borderBottomColor: 'rgba(255, 255, 255, .7)',
              borderWidth: 0,
              textAlign: 'left',
            },
            dateIcon: {
              top: 4,
              marginRight: 5,
            },
            dateText: {
              color: '#eeeeee',
              justifyContent: 'flex-start',
            },
          }}
          onDateChange={(date) => setStartDate(date)}
        />
        <DatePicker
          style={styles.datePicker}
          mode="date"
          date={endDate}
          placeholder="End date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconComponent={renderIcon(iconDate)}
          customStyles={{
            dateInput: {
              borderBottomColor: 'rgba(255, 255, 255, .7)',
              borderWidth: 0,
            },
            dateIcon: {
              top: 4,
              marginRight: 5,
            },
            dateText: {
              color: '#eeeeee',
              justifyContent: 'flex-start',
            },
          }}
          onDateChange={(date) => setEndDate(date)}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <DatePicker
          style={styles.datePicker}
          mode="time"
          date={startTime}
          placeholder="Start time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconComponent={renderIcon(iconTime)}
          customStyles={{
            dateInput: {
              borderBottomColor: 'rgba(255, 255, 255, .7)',
              borderWidth: 0,
              textAlign: 'left',
            },
            dateIcon: {
              top: 4,
              marginRight: 5,
            },
            dateText: {
              color: '#eeeeee',
              justifyContent: 'flex-start',
            },
          }}
          onDateChange={(date) => setStartTime(date)}
        />
        <DatePicker
          style={styles.datePicker}
          mode="time"
          date={endTime}
          placeholder="End time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconComponent={renderIcon(iconTime)}
          customStyles={{
            dateInput: {
              borderBottomColor: 'rgba(255, 255, 255, .7)',
              borderWidth: 0,
            },
            dateIcon: {
              top: 4,
              marginRight: 5,
            },
            dateText: {
              color: '#eeeeee',
              justifyContent: 'flex-start',
            },
          }}
          onDateChange={(date) => setEndTime(date)}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.buttons}>
          <View style={{ flex: 3 }}></View>
          <View style={styles.backButton}>
            <BackButton
              imgSource={require('../assets/left-arrow.png')}
              goBack={() => {
                setCancel(true);
              }}
            />
          </View>
          <View style={{ flex: 1 }}></View>
          <View
            style={{ flex: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <TouchableOpacity
              onPress={onSendInvitation}
              style={{ width: '100%' }}
              activeOpacity={0.7}
            >
              <View style={styles.mainButton}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'archivo',
                    fontSize: 18 * ratio,
                    fontWeight: 'bold',
                  }}
                >
                  SEND GAME INVITE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 3 }}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    marginTop: 70 * ratio,
    color: 'white',
    fontSize: 25 * ratio,
    fontWeight: 'bold',
    marginBottom: 20 * ratio,
    textAlign: 'center',
  },
  bottom: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  safearea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  textinput: {
    width: '80%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgba(255, 255, 255, .5)',
    borderBottomWidth: 1,
    color: 'white',
  },
  middle: {
    fontSize: 18 * ratio,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50 * ratio,
    marginBottom: 20 * ratio,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButton: {
    backgroundColor: 'red',
    borderRadius: 10 * ratio,
    height: 48 * ratio,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePicker: {
    borderBottomColor: 'rgb(180, 180, 180)',
    borderBottomWidth: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
  },
  members: {
    flexDirection: 'row',
    borderRadius: 30,
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  pData: state.data,
});
const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  },
});

const CreateGroupScreen = memo(CreateGroup);

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupScreen);
