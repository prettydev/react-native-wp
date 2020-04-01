import React, { memo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import { signInUser } from '../api/auth-api';
import Toast from '../components/Toast';
import { change_save_data } from '../core/reducer';
import { connect } from 'react-redux';
import md5 from 'md5';
import { baseApiUrl } from '../core/const';
const RegisterScreen = ({ navigation, changeSaveData, pData }) => {
  const [name, setName] = useState({
    value: navigation.getParam('name', ''),
    error: '',
  });
  const [screenName, setScreenName] = useState('');
  const [email, setEmail] = useState({
    value: navigation.getParam('email', ''),
    error: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const registerSettings = async (uid, newUserInfo) => {
    await fetch(baseApiUrl + 'registerSettings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        free_kills: 0,
        free_deaths: 0,
        secret_kills: 0,
        secret_deaths: 0,
        group_kills: 0,
        group_deaths: 0,
        pick_kills: 0,
        pick_deaths: 0,
        currentPoints: 0,
        currentLives: 10,
        isPlayingRand: 0,
        isPlayingSecret: 0,
        isPlayingGroup: 0,
        groupNames: '',
        curGroupName: '',
        isVisible: 0,
      }),
    })
      .then((response) => {
        console.log('setting response... ... ...', response);
        return response.json();
      })
      .then(async (response) => {
        console.log('changeSaveData response = ', response);
        if (response == 1) {
          await changeSaveData({
            ...pData,
            name: newUserInfo['name'],
            screenName: newUserInfo['screenName'],
            phoneNumber: newUserInfo['phoneNumber'],
            email: newUserInfo['email'],
            birthday: newUserInfo['birthday'],
            photoUrlFront: '',
            photoUrlSide: '',
            uid: newUserInfo['uid'],
            password: newUserInfo['password'],
            status: 'Rookie',
            free_kills: 0,
            free_deaths: 0,
            secret_kills: 0,
            secret_deaths: 0,
            group_kills: 0,
            group_deaths: 0,
            pick_kills: 0,
            pick_deaths: 0,
            currentPoints: 0,
            currentLives: 10,
            isPlayingRand: 0,
            isPlayingSecret: 0,
            isPlayingGroup: 0,
            groupNames: '',
            curGroupName: '',
            isVisible: 0,
          });
        } else {
          setError('Register settings failed!');
        }
      });
  };

  const _onSignUpPressed = async () => {
    if (loading) return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    console.log('birthday = ', birthday);

    setLoading(true);

    await fetch(baseApiUrl + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        screenName: screenName,
        phoneNumber: phoneNumber,
        email: email.value,
        birthday: birthday,
        password: md5(password.value),
      }),
    })
      .then((response) => {
        console.log('json log......', response);
        return response.json();
      })
      .then(async (response) => {
        console.log('registering = ', response);
        if (response != false) {
          const res = JSON.parse(response);
          console.log('signup = ', res);
          const newUserInfo = {
            name: res['name'],
            screenName: res['screenName'],
            phoneNumber: res['phoneNumber'],
            email: res['email'],
            birthday: res['birthday'],
            photoUrlFront: '',
            photoUrlSide: '',
            uid: res['uid'],
            password: res['password'],
          };

          console.log('start register log......');

          await registerSettings(res['uid'], newUserInfo);

          console.log('reg setting finished.....');

          navigation.navigate('Dashboard');
        }
      })
      .catch((err) => {
        console.log('registering error = ', err);
        setError('Registration failed!');
      });
    setLoading(false);
  };

  return (
    <Background>
      <View style={{ flex: 3 }}>
        <Header fontSize={25}>LET'S GET STARTED</Header>
      </View>

      <View
        style={{
          flex: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: 30,
        }}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Full name"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Screen name"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          value={screenName.value}
          onChangeText={(text) => setScreenName(text)}
          error={!!screenName.error}
          errorText={screenName.error}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          value={phoneNumber.value}
          onChangeText={(text) => setPhoneNumber(text)}
          error={!!phoneNumber.error}
          errorText={phoneNumber.error}
          textContentType="telephoneNumber"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email address"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          textContentType="emailAddress"
        />

        {/* <TextInput
          style={styles.textInput}
          placeholder = "Date of birth"
          placeholderTextColor = "rgba(255, 255, 255, 0.7)"
          
          returnKeyType="next"
          value={birthday.value}
          onChangeText={text => setBirthday(text)}
          error={!!birthday.error}
          errorText={birthday.error}
        /> */}
        <DatePicker
          style={styles.textInput}
          mode="date"
          date={birthday}
          placeholder="Birthday"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          // iconComponent={renderIcon(iconDate)}
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

            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => setBirthday(date)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>

      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          marginTop: 40,
        }}
      >
        <Button
          loading={loading}
          mode="contained"
          onPress={_onSignUpPressed}
          //onPress={()=>navigation.navigate("Dashboard")}
          style={styles.button}
        >
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Toast message={error} onDismiss={() => setError('')} />
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
    backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
    textDecorationLine: 'underline',
  },
  textInput: {
    flex: 1,
    marginBottom: 10,
    width: '80%',
    height: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    color: 'white',
    padding: 0,
  },
});

const Register = memo(RegisterScreen);

const mapStateToProps = (state) => ({
  pData: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
