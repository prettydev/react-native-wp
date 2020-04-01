import React, { memo, useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { loginUser } from '../api/auth-api';
import Toast from '../components/Toast';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import { GoogleSignin, statusCodes } from 'react-native-google-signin';

import Spinner from 'react-native-loading-spinner-overlay';
import { change_save_data } from '../core/reducer';
import { connect } from 'react-redux';
import md5 from 'md5';
import { baseApiUrl, PostServer } from '../core/const';

const height = Math.round(Dimensions.get('window').height);
const ratio = height / 812;

const LoginScreen = ({ navigation, changeSaveData, pData }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [error, setError] = useState('');

  const getUserData = async () => {
    try {
      const isLogged = (await AsyncStorage.getItem('isLoggedIn')) || 'none';
      if (isLogged == '1') {
        const data = await AsyncStorage.getItem('pData');
        console.log('[LOGIN] [READ STORAGE] data = ', data);
        changeSaveData({
          ...pData,
          ...JSON.parse(data),
        });
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return {};
  };

  const saveUserData = async (userInfo) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', '1');
      let data = JSON.stringify(userInfo);
      console.log('data = ', data);
      await AsyncStorage.setItem('pData', data);
    } catch (error) {
      // Error retrieving data
      console.log('error while saving asyncstorage' + error.message);
    }
  };

  useEffect(() => {
    // getUserData();
  }, []);

  const _onFacebookLogin = async () => {
    try {
      let result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      console.log('facebook login result...', result);

      if (result.isCancelled) {
        alert('Login was cancelled.');
        console.log('Login was cancelled');
      } else {
        console.log(result, 'facebook login result.......');
        AccessToken.getCurrentAccessToken().then((data) => {
          console.log(data, 'token data...');

          const accessToken = data.accessToken;

          const responseInfoCallback = async (error, result) => {
            if (error) {
              console.log('Error fetching data=', error);
            } else {
              console.log('Success fetching data=', result);

              //////////////////////////////////////////////

              const fb_email = result.email;
              const fb_name = result.name;

              try {
                setLoading(true);
                // get user info
                await fetch(baseApiUrl + 'gof_login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: fb_email,
                    idToken: accessToken,
                  }),
                })
                  .then((response) => response.json())
                  .then((response) => {
                    console.log('let me check...' + response);

                    if (response == 'null') {
                      console.log('New Facebook Login');
                      register_user_with_email(fb_email, fb_name);
                    } else {
                      console.log('Auto facebook_login');
                      get_user_info(response);
                    }
                  })
                  .catch((err) => {
                    console.log('Facebook signin error...', err);
                    setError(err.message);
                  });
                setLoading(false);
              } catch {
                console.log('Facebook user signin error.........');
              }

              //////////////////////////////////////////////
            }
          };
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name',
                },
              },
            },
            responseInfoCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        });
      }
    } catch (error) {
      alert('Login failed with error.');
      console.log('Login falied with error:', error);
    }
  };
  const register_user_with_email = async (email, name) => {
    console.log(email, name, '...register_goole_user...');

    navigation.navigate('RegisterScreen', {
      email,
      name,
    });
  };

  const _onGoogleLogin = async () => {
    console.log('_onGoogleLogin', loadingScreen, loading);
    if (loadingScreen) return;
    if (loading) return;
    setLoadingScreen(true);

    try {
      await GoogleSignin.configure({
        webClientId:
          '825670207641-q5b1hargnfaja3kftk95l7ots60po67j.apps.googleusercontent.com',
        offlineAccess: true,
        // forceConsentPrompt: true
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const google_email = userInfo.user.email;
      const google_name = userInfo.user.name;
      const google_idToken = userInfo.idToken;

      try {
        setLoading(true);
        // get user info
        await fetch(baseApiUrl + 'gof_login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: google_email,
            idToken: google_idToken,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log('let me check...' + response);

            if (response == 'null') {
              console.log('New Google Login');
              register_user_with_email(google_email, google_name);
            } else {
              console.log('Auto google_login');
              get_user_info(response);
            }
          })
          .catch((err) => {
            console.log('Google signin error...', err);
            setError(err.message);
          });
        setLoading(false);
      } catch {
        console.log('Google user signin error.........');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log('---->error', error);
    }
    setLoadingScreen(false);
  };

  const loadGroupInfo = (group_uid, newUserInfo) => {
    fetch(baseApiUrl + 'startGroupGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group_uid: group_uid,
        uid: pData.uid,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response != 'false') {
          const acceptedMembers = JSON.parse(response);
          console.log('Group Game started. Group members = ', acceptedMembers);
          changeSaveData({
            ...newUserInfo,
            socket: pData.socket,
            opponentPlayers: [...acceptedMembers],
            groupPlayers: [...acceptedMembers],
          });
          navigation.navigate('HomeScreen');
        }
      })
      .catch((err) => {
        console.log('Error while starting group game... ', err.message);
      });
  };

  const get_user_info = async (response) => {
    const fmsToken = (await AsyncStorage.getItem('fmsToken')) || '';
    let userInfo = JSON.parse(response);
    console.log('[SPIDER] [LOGIN] [FMSTOKEN] [TRY] ', fmsToken);
    if (fmsToken != '') {
      PostServer('registerNotification', {
        uid: userInfo.uid,
        fmsToken: fmsToken,
      })
        .then((res) => {
          console.log('[SPIDER] [LOGIN] [FMSTOKEN] [OK] ', res);
        })
        .catch((err) => {
          console.log('[SPIDER] [LOGIN] [FMSTOKEN] [ERR]', err);
        });
    }

    if (response) {
      // get user settings
      fetch(baseApiUrl + 'getSettings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userInfo.uid,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          let setting = JSON.parse(response);
          console.log('Log_setting', setting);
          //get users marker points
          fetch(baseApiUrl + 'getAllLocations', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              latitude: userInfo.latitude,
              longitude: userInfo.longitude,
              uid: userInfo.uid,
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              const userLocations = JSON.parse(response);
              console.log('_____ [SPIDER] [USER LOCATIONS]', userLocations);
              fetch(baseApiUrl + 'getAllNotifications', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid: userInfo.uid,
                }),
              })
                .then((response) => response.json())
                .then((response) => {
                  const notifications = JSON.parse(response);
                  const newUserInfo = {
                    //userInfo
                    uid: userInfo.uid,
                    name: userInfo.name,
                    screenName: userInfo.screenName,
                    phoneNumber: userInfo.phoneNumber,
                    email: userInfo.email,
                    birthday: userInfo.birthday,
                    password: userInfo.password,
                    photoUrlFront: userInfo.photoUrlFront,
                    photoUrlSide: userInfo.photoUrlSide,
                    latitude: userInfo.latitude,
                    longitude: userInfo.longitude,
                    locationName: userInfo.locationName,
                    dateJoined: userInfo.dateJoined,
                    age: userInfo.age,
                    status: userInfo.status,
                    loginStatus: userInfo.loginStatus,
                    notifications: notifications,
                    //settings
                    free_kills: setting.free_kills,
                    free_deaths: setting.free_deaths,
                    secret_kills: setting.secret_kills,
                    secret_deaths: setting.secret_deaths,
                    group_kills: setting.group_kills,
                    group_deaths: setting.group_deaths,
                    pick_kills: setting.pick_kills,
                    pick_deaths: setting.pick_deaths,
                    currentPoints: setting.currentPoints,
                    currentLives: setting.currentLives,
                    isPlayingRand: setting.isPlayingRand,
                    isPlayingSecret: setting.isPlayingSecret,
                    isPlayingGroup: setting.isPlayingGroup,
                    groupNames: setting.groupNames,
                    curGroupName: setting.curGroupName,
                    isVisible: setting.isVisible,
                    userLocations: userLocations,
                    world_rank: setting.rank,
                  };
                  saveUserData(newUserInfo);

                  if (setting.isPlayingGroup == '1') {
                    loadGroupInfo(setting.curGroupName, newUserInfo);
                  } else {
                    changeSaveData({
                      ...newUserInfo,
                      socket: pData.socket,
                      opponentPlayers: [],
                      groupPlayers: [],
                    });
                    navigation.navigate('HomeScreen');
                  }
                })
                .catch((err) => {
                  console.log(
                    'Error while getting notifications. ',
                    err.message,
                  );
                });
            })
            .catch((err) => {
              console.log('Error while getting user locations. ', err.message);
            });
        })
        .catch((err) => {
          console.log('Error while getting settings. ', err.message);
        });
    } else {
      setError('Login failed. Please check your email and password!');
    }
  };

  const _onLoginPressed = async () => {
    // initPushNotification();
    // LocalNotification();

    try {
      if (loading) return;
      if (loadingScreen) return;

      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      console.log('email = ' + email.value + ' password = ' + password.value);

      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }
      console.log('OnLoginPressed');

      setLoading(true);

      // get user info
      await fetch(baseApiUrl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: md5(password.value),
        }),
      })
        .then((response) => response.json())
        .then(get_user_info)
        .catch((err) => {
          setError(err.message);
        });

      setLoading(false);
    } catch {}
  };

  return (
    <Background>
      <Spinner
        visible={loadingScreen}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <View style={styles.top}>
        <Header fontSize={35 * ratio}>HEY THERE{'\n'}ASSASSIN!</Header>
        <TextInput
          style={{
            marginTop: 40 * ratio,
            width: '80%',
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            color: 'white',
            padding: 0,
          }}
          placeholder="Email or phone number"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          style={{
            marginTop: 20 * ratio,
            width: '80%',
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            borderBottomColor: 'lightgray',
            color: 'white',
            padding: 0,
          }}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          autoCapitalize="none"
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text
              style={
                (styles.label,
                {
                  textDecorationLine: 'underline',
                  color: 'white',
                  fontWeight: 'bold',
                })
              }
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          loading={loading}
          mode="contained"
          onPress={() => _onLoginPressed()}
          style={{ width: '80%', marginTop: 30 * ratio }}
        >
          Login
        </Button>
      </View>

      <View style={styles.bottom}>
        <Text style={{ color: '#565656' }}>or login with</Text>
        <TouchableOpacity
          onPress={_onGoogleLogin}
          style={{
            marginTop: 15 * ratio,
            backgroundColor: '#1a1a1a',
            borderRadius: 10,
            height: 48,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
            GOOGLE
          </Text>
          <Image
            style={{ width: 40, height: 40, position: 'absolute', left: 12 }}
            source={{
              uri: 'http://pngimg.com/uploads/google/google_PNG19635.png',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={_onFacebookLogin}
          style={{
            marginTop: 8,
            backgroundColor: '#1a1a1a',
            borderRadius: 10,
            height: 48,
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
            FACEBOOK
          </Text>
          <Image
            style={{ width: 30, height: 30, position: 'absolute', left: 18 }}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
            }}
          />
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.label}>
            Don’t have an account yet?{' '}
            <Text style={{ fontWeight: 'bold' }}>Sign up </Text>{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.link}>here</Text>
          </TouchableOpacity>
        </View>

        {/* <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn}
          disabled={this.state.isSigninInProgress} /> */}
      </View>

      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 6,
    backgroundColor: 'red',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  bottom: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20 * ratio,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20 * ratio,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
    textDecorationLine: 'underline',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const Login = memo(LoginScreen);

const mapStateToProps = (state) => ({
  pData: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
