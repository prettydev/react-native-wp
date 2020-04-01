import React, { memo, useState, useEffect } from 'react';
import { logoutUser } from '../api/auth-api';
import LocationButton from '../components/LocationButton';
import BackButton from '../components/BackButton';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoder';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { change_save_data } from '../core/reducer';
import { connect } from 'react-redux';

import { baseApiUrl } from '../core/const';

const height = Math.round(Dimensions.get('window').height);
const ratio = height / 812;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Dashboard = ({ navigation, changeSaveData, pData }) => {
  map = null;
  const [locationName, setLocationName] = useState('');
  const [region, setRegion] = useState(initialRegion);
  useEffect(() => {
    getCurrentPosition();
    console.log('pData = ', pData);
  }, []);

  const renderMarker = (playerName) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.markerContainer}>
          {/* <Image 
            style={styles.markerImage}
            source={require(pData.photoUrlFront)}
            resizeMethod='scale' 
            resizeMode='stretch'
          /> */}
          <View style={styles.markerImage}></View>
          <Text
            style={{ color: 'white', fontSize: 14 * ratio, fontWeight: 'bold' }}
          >
            {playerName}
          </Text>
        </View>
        <View style={styles.markerTriangle}></View>
      </View>
    );
  };

  const getCurrentPosition = () => {
    try {
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
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };

          await setRegion(region);
          console.log('region = ', region);
          console.log('pData = ', pData);
          //get location name from lon and lat
          Geocoder.geocodePosition({
            lat: region.latitude,
            lng: region.longitude,
          })
            .then((res) => {
              console.log('Current location Name = ', res[0].locality);
              setLocationName(res[0].locality);

              //register lon and lat to server
              fetch(baseApiUrl + 'setLocation', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid: pData.uid,
                  latitude: region.latitude,
                  longitude: region.longitude,
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

              changeSaveData({
                ...pData,
                latitude: region.latitude ? region.latitude : 0,
                longitude: region.longitude ? region.longitude : 0,
              });
            })
            .catch((err) => console.log(err));
        },
        (error) => {
          //TODO: better design
          Alert.alert(
            'Error while getting current location.... ',
            error.message,
          );
        },
        { enableHighAccuracy: true, timeout: 2000, maximumAge: 6000 },
      );
    } catch (e) {
      alert('Error while getting current location ', e.message || '');
    }
  };

  return (
    <View style={styles.safearea}>
      <View style={styles.top}>
        <Text
          style={{
            marginTop: 50,
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Archivo',
          }}
        >
          {pData.name}'s LOCATION
        </Text>
        <TextInput
          style={styles.locationText}
          placeholder="Enter your location"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          onChangeText={(text) => setLocationName(text)}
          value={locationName}
        />
      </View>
      <View style={styles.bottom}>
        <MapView
          onMapReady={() => {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then((granted) => {
              //alert(granted) // just to ensure that permissions were granted
            });
          }}
          ref={(map) => (map = map)}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={region}
          showsMyLocationButton={false}
          rotateEnabled={false}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          >
            {renderMarker(pData.name)}
          </Marker>
        </MapView>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 90,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flex: 15 }}></View>
          <View
            style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}
          >
            <LocationButton onPress={() => getCurrentPosition()} />
          </View>
          <View style={{ flex: 3 }}></View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
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
              imgSource={require('../assets/left-arrow.png')}
              goBack={() => {
                logoutUser();
                navigation.navigate('LoginScreen');
              }}
            />
          </View>
          <View style={{ flex: 1 }}></View>
          <View
            style={{ flex: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UploadScreen');
              }}
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
                    fontFamily: 'archivo',
                    fontSize: 18 * ratio,
                    fontWeight: 'bold',
                  }}
                >
                  SELECT
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
    flex: 2,
    backgroundColor: 'black',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    zIndex: 1,
  },
  bottom: {
    flex: 8,
    justifyContent: 'flex-end',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },
  safearea: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationText: {
    marginBottom: 20,
    width: '80%',
    height: 40,
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'white',
    marginTop: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    bottom: 20,
  },
  markerContainer: {
    backgroundColor: 'black',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 5,
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: 'black',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

const Dash = memo(Dashboard);

const mapStateToProps = (state) => ({
  pData: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
