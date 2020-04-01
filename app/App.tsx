import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-native-paper';
import { theme } from './src/core/theme';
import SplashScreen from 'react-native-splash-screen';

import { connect } from 'react-redux';
import { change_save_data } from './src/core/reducer';
import socketIO from 'socket.io-client';
import { baseUrl } from './src/core/const';

import {
  createAppContainer,
  CommonActions,
  NavigationActions,
  StackActions,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PushNotification from 'react-native-push-notification';
import { senderID } from './src/core/const';
import { AsyncStorage } from 'react-native';

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  UploadScreen,
  FaceRecognition,
  HomeScreen,
  CreateGroup,
  GroupInvitation,
  TargetScreen,
  ClosePlayers,
  NotificationScreen,
  ChoosenTargetScreen,
  SecretTarget,
  KilledScreen,
} from './src/screens';

import stripe from 'tipsi-stripe';
import { baseApiUrl, PostServer } from './src/core/const';

stripe.setOptions({
  publishableKey: 'pk_test_M2uVFMQ8wi1Yuf1vgDNsb4V7',
});

const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    UploadScreen,
    FaceRecognition,
    HomeScreen,
    CreateGroup,
    GroupInvitation,
    TargetScreen,
    ClosePlayers,
    NotificationScreen,
    ChoosenTargetScreen,
    SecretTarget,
    KilledScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

const App = createAppContainer(Router);

class Main extends Component {
  navigator: any;
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '',
    };
  }

  componentDidMount() {
    // const socket = socketIO(baseUrl + ':3001', {
    //   transports: ['websocket'],
    //   jsonp: false,
    // });
    // socket.connect();
    // socket.on('connect', () => {
    //   SplashScreen.hide();
    //   this.props.changeSaveData({
    //     ...this.props.pData,
    //     isSocketConnected: true,
    //     socket: socket,
    //     killerName: '',
    //     victimName: '',
    //   });
    // });
    // var that = this;
    // PushNotification.configure({
    //   onRegister: async function(token) {
    //     try {
    //         const fmsToken = token.token;
    //         await AsyncStorage.setItem('fmsToken', fmsToken);
    //         console.log('Registere TOKEN:', fmsToken);
    //         console.log('-------------->', that.props.pData.uid);
    //         PostServer(
    //           'registerNotification',
    //           {
    //             uid: that.props.pData.uid,
    //             fmsToken: fmsToken,
    //           }
    //         )
    //         .then((res) => {
    //           console.log('[SPIDER] [APP] [FMSTOKEN] [OK]', res);
    //         })
    //         .catch((err) => {
    //           console.log('[SPIDER] [APP] [FMSTOKEN] [ERROR]', err);
    //         });
    //       } catch (error) {
    //         console.log('[SPIDER] [APP] [FMSTOKEN] [ERROR] Can not save tocken', error);
    //     }
    //   },
    //   onNotification: function(notification) {
    //       console.log('REMOTE NOTIFICATION ==>', notification);
    //       // processNotification(notification);
    //       that.handleNotification(notification);
    //   },
    //   senderID: senderID,
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });
  }
  handleNotification(notification) {
    console.log('handleNotification');
    var notificationId = '';
    try {
      const data = JSON.parse(notification.message_data);
      const message_id = notification.message_id;
      if (message_id == 'group_invite') {
        console.log('received notification = ', data);
        console.log(' pData = ', this.props.pData);

        if (data.receiver.includes(this.props.pData.uid)) {
          const notifications = this.props.pData.notifications;
          notifications.push({
            message_id: message_id,
            isSeen: [],
            data: JSON.stringify({
              type: 'group_invite',
              group_name: data.group_name,
              group_uid: data.group_uid,
              group_creater_uid: data.group_creater_uid,
              sender: data.sender,
              senderImage: data.senderImage,
              notification_uid: data.notification_uid,
            }),
          });
          this.props.changeSaveData({
            ...this.props.pData,
            notifications: [...notifications],
          });
          console.log(this.props.pData);
        }
      } else if (message_id == 'accept_invitation') {
        console.log('received accept invitation');
      } else if (message_id == 'kill') {
        console.log('you were killed.');
        // console.log(Router.props.navigation);
        // this.navigator.dispatch(StackActions.push({ component: 'KilledScreen'}));
        this.navigator.dispatch(
          NavigationActions.navigate({
            routeName: 'HomeScreen',
            params: {
              isVisible: true,
              // goBack : {() => setIsKilled(false)},
              killed: {
                uid: data.killerUid,
                data: JSON.parse(notification.message_data),
              },
            },
          }),
        );
      }
    } catch (err) {
      console.log('Error with Processing Notification', err);
    }
  }

  render() {
    return (
      <Provider theme={theme}>
        <App ref={(nav) => (this.navigator = nav)} />
      </Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  pData: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
