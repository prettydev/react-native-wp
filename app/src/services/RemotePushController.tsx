import React, { memo, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import { senderID } from '../core/const';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { change_save_data } from '../core/reducer';

const RemotePushController = ({ pData, changeSaveData, handleNotification}) => {
    const processNotification = (notification) => {
      try {
        const data = JSON.parse(notification.message_data);
        const message_id = notification.message_id;
        if (message_id == 'group_invite') {
          console.log('received notification = ', data);
          console.log(' pData = ', pData);
          handleNotification(notification);
          if (data.receiver.includes(pData.uid)) {
            const notifications = pData.notifications;
            notifications.push({
              data:notification.message_data,
              from_user_id:notification.from_user_id,
              message_id:notification.message_id
            });
            changeSaveData({
              ...pData,
              notifications: [...notifications],
            });
          }
        } else if (message_id == 'accept_invitation') {
        }
      } catch (err) {
        console.log('Error with Processing Notification', err);
      }
    };


  useEffect(() => {
    PushNotification.configure({
      onRegister: async function(token) {
        try {
          await AsyncStorage.setItem('fmsToken', token.token);
          const fmsToken = (await AsyncStorage.getItem('fmsToken')) || '';
          console.log('~~~~~~TOKEN:', fmsToken);
        } catch (error) {
          console.log(
            '[SPIDER] [Problem] [FMSTOKEN] Can not save tocken',
            error,
          );
        }
      },
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification);
        processNotification(notification);
      },

      senderID: senderID,
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

const mapStateToProps = (state) => ({
  pData: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RemotePushController);
