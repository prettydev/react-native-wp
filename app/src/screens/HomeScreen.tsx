import React, { memo, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { SliderBox } from 'react-native-image-slider-box';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import MissionCard from '../components/MissionCard';
import BackButton from '../components/BackButton';
import InfoScreen from './InfoScreen';
import Settings from './Settings';
import HomeMenu from './HomeMenu';
import Scoring from './Scoring';
import LeaderBoards from './LeaderBoards';
import BuyLives from './BuyLives';
import SecretMission from './SecretMission';
import KilledScreen from './KilledScreen';
import { change_save_data } from '../core/reducer';
import { baseApiUrl } from '../core/const';

const height = Math.round(Dimensions.get('window').height);
const ratio = height / 812;

const HomeScreen = ({ navigation, pData, changeSaveData }) => {
  const [isVisibleInfo, setVisibleInfo] = useState(false);
  const [isVisibleSettings, setVisibleSettings] = useState(false);
  const [isVisibleMenu, setVisibleMenu] = useState(false);
  const [isVisibleScore, setVisibleScore] = useState(false);
  const [isVisibleRanking, setVisibleRanking] = useState(false);
  const [isVisibleLives, setVisibleLives] = useState(false);
  const [isSecretMission, setSecretMission] = useState(false);
  const [isKilled, setIsKilled] = useState(false);
  const [killedData, setKilledData] = useState({});

  const images = [pData.photoUrlFront, pData.photoUrlSide];



  const updateNotification = (notifications) => {
    fetch(baseApiUrl + 'updateNotify', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: {
        notifications: JSON.stringify(notifications),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('Update notification successed!');
      });
  };

  const getLocationName = () => {
    async function requestPermissions() {
      if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
         authorizationLevel: 'whenInUse',
       });
      }
    
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    }
    requestPermissions();

    Geolocation.getCurrentPosition(
      async (position) => {
        console.log('__________', position);
        Geocoder.geocodePosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
          .then((res) => {
            console.log('Current location Name = ', res[0].locality);
            //register lat and lng to server
            fetch(baseApiUrl + 'setLocation', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid: pData.uid,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                locationName: res[0].locality,
              }),
            })
              .then((response) => response.json())
              .then((response) => {
                // if(response=="1") {
                console.log('Location registering succeeded! ', response);
                // }
              })
              .catch((err) => {
                console.log('Error while registering location', err);
              });
            // console.log('[SPIDER][HOME Screen]', pData);
            changeSaveData({
              ...pData,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              locationName: res[0].locality,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      (error) => {
        //TODO: better design
        console.log('Error while getting current location.... ', error.message);
      },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 60 * 1000},
    );
  };
  useEffect(()=> {
    try{
      // console.log('<><><><><><><><><><><>>', navigation);
      // console.log('@@@@@@@@@@', navigation.state.params);
      // console.log('@@@@@@@@@@', navigation.state.params);
      if (navigation.state.params.isVisible == true) {
        setKilledData(navigation.state.params.killed);
        setIsKilled(true);
      }
    } catch(err) {
      console.log('Killed Screen Error', err);
    }
  }, [navigation]);

  useEffect(() => {
    // console.log('pData on HomeScreen = ', pData);
    // try {
    //   pData.socket.on('receive_message', (data) => {
    //     console.log('data = ', data);
    //     if (data.message_id == 'kill') {
    //       if (data.data.victimID == pData.uid) {
    //         setIsKilled(true);
    //         setKilledData(data);
    //         changeSaveData({
    //           ...pData,
    //           killerName: data.data.killerName,
    //         });
    //       }
    //     } else if (data.message_id == 'die') {
    //       const notifications = pData.notifications;
    //       notifications.push({
    //         type: 'die',
    //         killer: data.killerName,
    //         currentPoints: pData.currentPoints - 100,
    //       });
    //       updateNotification(notifications);
    //       changeSaveData({
    //         ...pData,
    //         victimName: data.data.victimName,
    //         notifications: notifications,
    //       });
    //     } else if (data.message_id == 'group_invite') {
    //       console.log('received notification = ', data);
    //       if (data.data.receiver.includes(pData.uid)) {
    //         const notifications = pData.notifications;

    //         notifications.push({
    //           type: 'group_invite',
    //           group_name: data.data.group_name,
    //           group_uid: data.data.group_uid,
    //           sender: data.data.sender,
    //           senderImage: data.data.senderImage,
    //           notification_uid: data.data.notification_uid,
    //         });
    //         updateNotification(notifications);
    //         changeSaveData({
    //           ...pData,
    //           notifications: [...notifications],
    //         });
    //       }
    //     }
    //   });
    // } catch (err) {}

    // getLocationName();

    //get location name in real-time
    const interval = setInterval(() => {
      try {
        getLocationName();
      } catch (e) {
        console.log('Error while getting current location ', e.message || '');
      }
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, [pData]);

  return (
    <View style={styles.safearea}>
      <KilledScreen
        isVisible={isKilled}
        goBack={() => setIsKilled(false)}
        killed={killedData}
        pData={pData}
      />
      <SecretMission
        isVisible={isSecretMission}
        goBack={() => setSecretMission(false)}
        pData={pData}
        navigation={navigation}
      />
      <InfoScreen
        isVisible={isVisibleInfo}
        goBack={() => setVisibleInfo(false)}
        pData={pData}
        goDashboard={() => {
          setVisibleInfo(false);
          navigation.navigate('Dashboard');
        }}
      />
      <Scoring
        isVisible={isVisibleScore}
        goBack={() => setVisibleScore(false)}
        pData={pData}
      />
      <LeaderBoards
        isVisible={isVisibleRanking}
        goBack={() => setVisibleRanking(false)}
        pData={pData}
        changeSaveData={changeSaveData}
      />
      <BuyLives
        isVisible={isVisibleLives}
        goBack={() => setVisibleLives(false)}
        pData={pData}
        navigation={navigation}
      />
      <Settings
        isVisible={isVisibleSettings}
        goBack={() => setVisibleSettings(false)}
        pData={pData}
      />
      <HomeMenu
        isVisible={isVisibleMenu}
        goBack={() => {
          setVisibleMenu(false);
        }}
        goBack4Secret={() => {
          setVisibleMenu(false);
          setSecretMission(true);
        }}
        navigation={navigation}
      />

      <View style={{ flex: 6 }}>
        <SliderBox
          images={images}
          sliderBoxHeight={'100%'}
          dotColor="transparent"
          inactiveDotColor="transparent"
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 15,
            borderWidth: 4,
            borderColor: 'white',
            marginBottom: 120,
          }}
        ></SliderBox>
      </View>
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            marginTop: -130,
            fontSize: 25 * ratio,
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {pData.name}
        </Text>
        <View style={styles.rookie_group}>
          <View
            style={[
              styles.status_style,
              pData.status == 'Rookie'
                ? styles.rookie
                : pData.status == 'Pro'
                ? styles.pro
                : styles.advanced,
            ]}
          >
            <Text
              style={[
                { fontWeight: 'bold', fontSize: 15 * ratio },
                pData.status == 'Rookie'
                  ? { color: '#1DEEAE' }
                  : pData.status == 'Pro'
                  ? { color: '#FF2300' }
                  : { color: '#FFDD00' },
              ]}
            >
              {pData.status}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.iMark}
            activeOpacity={0.7}
            onPress={() => setVisibleInfo(true)}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15 * ratio,
                fontWeight: 'bold',
              }}
            >
              i
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
          <MissionCard
            missionType="Free"
            points={pData.free_kills}
            kills={pData.free_deaths}
          />
          <MissionCard
            missionType="Mission"
            points={pData.secret_kills}
            kills={pData.secret_deaths}
          />
          <MissionCard
            missionType="Group"
            points={pData.group_kills}
            kills={pData.group_deaths}
          />
          <MissionCard
            missionType="Pick A Target"
            points={pData.pick_kills}
            kills={pData.pick_deaths}
          />
        </ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100 * ratio,
          }}
        >
          <Text style={[styles.normaltext, { marginTop: 5 }]}>Points:</Text>
          <TouchableOpacity onPress={() => setVisibleScore(true)}>
            <Text style={styles.boldtext}>{pData.currentPoints}</Text>
          </TouchableOpacity>
          <Text style={styles.normaltext}>World ranking:</Text>
          <TouchableOpacity onPress={() => setVisibleRanking(true)}>
            <Text style={styles.boldtext}>{pData.world_rank}</Text>
          </TouchableOpacity>
          <Text style={styles.normaltext}>Available lives:</Text>
          <TouchableOpacity onPress={() => setVisibleLives(true)}>
            <Text style={styles.boldtext}>{pData.currentLives}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.notification}
        onPress={() => {
          if (pData.notifications) {
            navigation.navigate('NotificationScreen');
          }
        }}
      >
        <Text style={{ color: 'white' }}>
          {pData.notifications ? pData.notifications.length : '0'}
        </Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flex: 3 }}></View>
          <View
            style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <BackButton
              imgSource={require('../assets/Option.png')}
              goBack={() => setVisibleSettings(true)}
            />
          </View>
          <View style={{ flex: 3 }}></View>
          <View
            style={{ flex: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <TouchableOpacity
              onPress={() => setVisibleMenu(true)}
              style={{ width: '100%' }}
              activeOpacity={0.7}
            >
              <View
                style={{
                  backgroundColor: 'red',
                  borderRadius: 10 * ratio,
                  height: 48 * ratio,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18 * ratio,
                    fontWeight: 'bold',
                  }}
                >
                  LET'S ASSASSINATE
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
  bottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldtext: {
    fontSize: 18 * ratio,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  normaltext: {
    fontSize: 10 * ratio,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    marginTop: 10 * ratio,
  },
  rookie_group: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10 * ratio,
  },
  status_style: {
    borderRadius: 18 * ratio,
    shadowColor: 'rgba(0, 0, 0, .16)',
    paddingHorizontal: 15 * ratio,
    paddingVertical: 5 * ratio,
    alignContent: 'center',
    marginRight: 10 * ratio,
  },
  rookie: {
    backgroundColor: 'rgba(29, 238, 174, .4)',
    color: '#1DEEAE',
    fontSize: 15 * ratio,
    fontWeight: 'bold',
  },
  pro: {
    color: '#FF2300',
    backgroundColor: 'rgba(255, 35, 0, .4)',
    fontSize: 15 * ratio,
    fontWeight: 'bold',
  },
  advanced: {
    color: '#FFDD00',
    backgroundColor: 'rgba(255, 251, 0, .4)',
    fontSize: 15 * ratio,
    fontWeight: 'bold',
  },
  iMark: {
    backgroundColor: '#1DEEAE',
    width: 20 * ratio,
    height: 20 * ratio,
    borderRadius: 20 * ratio,
  },
  safearea: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'black',
  },
  header: {
    marginTop: -100 * ratio,
  },
  notification: {
    position: 'absolute',
    right: 30,
    top: 30,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

const Home = memo(HomeScreen);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
