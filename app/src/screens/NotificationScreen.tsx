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
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { change_save_data } from '../core/reducer';
import { baseApiUrl } from '../core/const';
const height = Math.round(Dimensions.get('window').height);
const ratio = height / 812;

const NotificationScreen = ({ navigation, pData, changeSaveData }) => {
  const removeNotification = (arr, value) => {
    return arr.filter(function(ele) {
      return ele.notification_uid != value;
    });
  };

  const setPlayingGroup = () => {};

  const onGroupInvitation = (notification) => {
    console.log('group notification = ', notification);
    const notification_data = JSON.parse(notification.data);
    if (notification.isSeen.indexOf(pData.uid) === -1) {
      setNotificationSeen(notification);
      console.log(23);
    } else {
      console.log(notification.isSeen, pData.uid);
    }

    if (pData.isPlayingGroup == '1' || pData.isPlayingGroup == true) {
      Alert.alert(
        'Group Invitation',
        "You're in a group now. Do you want to play another group game?",
        [
          {
            text: 'Cancel',
            onPress: () => onCancelGroupInvitation(notification),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              Alert.alert(
                'Group Invitation',
                'Are you going to accept group invitation from ' +
                  notification_data.sender +
                  '?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => onCancelGroupInvitation(notification),
                    style: 'cancel',
                  },
                  {
                    text: 'Accept',
                    onPress: () => onAcceptGroupInvitation(notification),
                  },
                ],
                { cancelable: false },
              );
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Group Invitation',
        'Are you going to accept group invitation from ' +
          notification_data.sender +
          '?',
        [
          {
            text: 'Cancel',
            onPress: () => onCancelGroupInvitation(notification),
            style: 'cancel',
          },
          {
            text: 'Accept',
            onPress: () => onAcceptGroupInvitation(notification),
          },
        ],
        { cancelable: false },
      );
    }
  };

  const setNotificationSeen = (notification) => {
    console.log(notification.notification_uid, '00000000000000000000');
    fetch(baseApiUrl + 'setNotificationSeen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notification_uid: notification.notification_uid,
        uid: pData.uid,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response, 'response');
      })
      .catch((err) => {
        console.log('Error while setting notification seen. ', err.message);
      });
  };

  const setNotificationDelete = (notification) => {
    fetch(baseApiUrl + 'setNotificationDelete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notification_uid: notification.notification_uid,
        uid: pData.uid,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response == 1) {
          const newNotification = removeNotification(
            pData.notifications,
            notification.notification_uid,
          );
          // console.log('Notification is been seen.', newNotification);

          changeSaveData({
            ...pData,
            notifications: [...newNotification],
          });
        }
      })
      .catch((err) => {
        console.log('Error while setting notification seen. ', err.message);
      });
  };

  const addToAcceptedMembers = (group_uid, acceptedMembers) => {
    const members = [...acceptedMembers, pData.uid];
    fetch(baseApiUrl + 'addToAcceptedMembers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group_uid: group_uid,
        acceptedMembers: members,
      }),
    })
      .then((response) => response.json())
      .then((response) => {})
      .catch((err) => {
        console.log('Error while adding to acceptedMembers. ', err.message);
      });
  };

  const onAcceptGroupInvitation = (notification) => {
    const notification_data = JSON.parse(notification.data);
    alert(
      'Group invitation from ' +
        notification_data.sender +
        ' is accepted. Notification uid is ' +
        notification.notification_uid +
        '.',
    );
    console.log('_____ [SPIDER] [Selected Notification]', notification_data);
    console.log('_____ [SPIDER] [Before Request Group Game Status]', notification_data.group_uid, pData.uid);

    fetch(baseApiUrl + 'getGroupGameStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group_uid: notification_data.group_uid,
        uid: pData.uid,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const groupInfo = JSON.parse(response);
        console.log('Group Info = ', groupInfo);

        fetch(baseApiUrl + 'sendNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from_user_id: pData.uid,
            to_user_id: notification_data.group_creater_uid,
            message_id: 'accept_invitation',
            data: {
              group_uid: notification_data.group_uid,
              notification_uid: notification_data.notification_uid,
              group_name: notification_data.groupName,
              sender: pData.name,
              senderImage: pData.photoUrlFront,
            },
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('____ [SPIDER] [Send notification result] = ', response);
          });

        changeSaveData({
          ...pData,
          curGame: 'group',
          group_uid: groupInfo.group_uid,
          group_creator: groupInfo.groupCreator,
          groupName: groupInfo.groupName,
          groupCreaterName: notification_data.sender,
          groupPlayers: JSON.parse(groupInfo.groupPlayers),
          groupGameStartDate: groupInfo.startDate,
          groupGameEndDate: groupInfo.endDate,
          groupGameStartTime: groupInfo.startTime,
          groupGameEndTime: groupInfo.endTime,
          groupGameIsOpened: groupInfo.isOpened,
          groupAcceptedPlayers: JSON.parse(groupInfo.acceptedMembers),
        });
        addToAcceptedMembers(
          notification_data.group_uid,
          JSON.parse(groupInfo.acceptedMembers),
        );
        let startDateTime = new Date(
          groupInfo.startDate + ' ' + groupInfo.startTime,
        );
        let endDateTime = new Date(groupInfo.endDate + ' ' + groupInfo.endTime);
        let now = new Date();
        let diff = startDateTime.getTime() - now.getTime();
        if (pData.isPlayingGroup == true || pData.isPlayingGroup == '1') {
        } else {
          setPlayingGroup();
        }
        if (diff < 0) {
          navigation.navigate('FaceRecognition');
        } else {
          navigation.navigate('GroupInvitation');
        }
      })
      .catch((err) => {
        console.log('Error while getting group game status. ', err.message);
      });
  };

  const onCancelGroupInvitation = (notification) => {
    const notification_data = JSON.parse(notification.data);
    alert(
      'Group invitation from ' + notification_data.sender + ' is cancelled.',
    );
  };

  const renderTarget = () => {
    return pData.notifications.map((notification) => {
      const notification_data = JSON.parse(notification.data);
      if (notification.message_id == 'killed') {
        return (
          <TouchableOpacity
            style={styles.player}
            // onPress={()=>onPickTarget(notification.uid)}
          >
            <View style={styles.listItem}>
              <Image
                source={{ uri: notification.data.killerImage }}
                style={{ width: 50, height: 50 }}
                resizeMode={'cover'}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
              >
                You were killed by {notification['killer']}
              </Text>
              <Text style={{ color: 'gray', fontSize: 15 }}>
                Current Points {notification['currentPoints']}
              </Text>
            </View>
          </TouchableOpacity>
        );
      } else if (notification.message_id == 'group_invite') {
        return (
          <TouchableOpacity
            style={styles.player}
            onPress={() => onGroupInvitation(notification)}
          >
            <View style={styles.listItem}>
              <Image
                source={{ uri: notification_data.senderImage }}
                style={{ width: 50, height: 50 }}
                resizeMode={'cover'}
              />
            </View>
            <View style={{ marginLeft: 10, flex: 8 }}>
              <Text
                style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
              >
                You were invited by {notification_data.sender}
              </Text>
              <Text style={{ color: 'gray', fontSize: 15 }}>
                Group name is {notification_data.group_name}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#ff61a0',
                borderRadius: 50,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setNotificationDelete(notification);
              }}
            >
              <Text>{'×'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }
    });
  };

  return (
    <View style={styles.safearea}>
      <Text style={styles.top}>NOTIFICATIONS</Text>
      <Text style={styles.normalText}>Press notification items to see</Text>
      <ScrollView style={styles.middle}>{renderTarget()}</ScrollView>
      <View style={styles.bottom}>
        <View style={styles.buttons}>
          <View style={styles.backButton}>
            <BackButton
              imgSource={require('../assets/left-arrow.png')}
              goBack={() => {
                navigation.navigate('HomeScreen');
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  player: {
    flexDirection: 'row',
    backgroundColor: 'rgb(50, 50, 50)',
    borderRadius: 15,
    padding: 5,
    marginVertical: 10,
  },
  normalText: {
    fontSize: 15 * ratio,
    color: 'rgb(200, 200, 200)',
    textAlign: 'center',
  },
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
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    width: '80%',
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
});

const mapStateToProps = (state) => ({
  pData: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  },
});

const Notify = memo(NotificationScreen);

export default connect(mapStateToProps, mapDispatchToProps)(Notify);
