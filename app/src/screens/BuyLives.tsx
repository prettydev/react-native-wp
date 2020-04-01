import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { change_save_data } from '../core/reducer';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import BackButton from '../components/BackButton';
import imgChecked from '../assets/livesChecked.png';
import imgUnchecked from '../assets/livesUnchecked.png';
import RNModal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import Background from '../components/Background';
import { baseApiUrl } from '../core/const';

import stripe from 'tipsi-stripe';

const height = Math.round(Dimensions.get('window').height);
const ratio = height / 812;

const BuyLives = ({ isVisible, pData, goBack, changeSaveData }) => {
  const [isLive1Checked, setLive1Checked] = useState(true);
  const [isLive2Checked, setLive2Checked] = useState(false);
  const [isLive10Checked, setLive10Checked] = useState(false);
  const [isPerformed, setPerformed] = useState(false);
  const [livesNum, setLivesNum] = useState(1);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const setLivesChecked = (val) => {
    switch (val) {
      case 1:
        setLive1Checked(true);
        setLive2Checked(false);
        setLive10Checked(false);
        setLivesNum(1);
        break;
      case 2:
        setLive2Checked(true);
        setLive1Checked(false);
        setLive10Checked(false);
        setLivesNum(2);
        break;
      case 3:
        setLive10Checked(true);
        setLive2Checked(false);
        setLive1Checked(false);
        setLivesNum(10);
        break;
    }
  };

  const stripeProc = async () => {
    console.log(livesNum, 'you are going to buy... .. ...');

    try {
      const stripe_token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Gunilla Haugeh',
            line1: 'Canary Place',
            line2: '3',
            city: 'Macon',
            state: 'Georgia',
            country: 'US',
            postalCode: '31217',
            email: 'ghaugeh0@printfriendly.com',
          },
        },
      });

      //////////////////////////////////////////////////////

      setLoadingScreen(true);

      fetch(baseApiUrl + 'payWithStripe', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: pData.uid,
          livesNum,
          currency: 'usd',
          token: stripe_token.tokenId,
        }),
      })
        .then((response) => {
          console.log('(((((((((((((((((((((((');
          console.log(response, '))))))))))))))))))))))');
          return response.json();
        })
        .then((responseJson) => {
          console.log('+++++++++++++++++++++++++++++');
          console.log(responseJson, '-----------------------------');

          if ('succeeded' === responseJson) {
            changeSaveData({
              ...pData,
              currentLives: parseInt(pData.currentLives) + parseInt(livesNum),
            });
          }
          setLoadingScreen(false);
        })
        .catch((error) => {
          console.error(error);
          setLoadingScreen(false);
          alert('error...', error);
        });

      //////////////////////////////////////////////////////////
    } catch (error) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>', error);
      setLoadingScreen(false);
      alert('error', error);
    }

    // setPerformed(true);
  };

  return (
    <Background>
      <Spinner
        visible={loadingScreen}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
      <Modal animationType="slide" visible={isVisible} style={styles.modal}>
        <RNModal
          isVisible={isPerformed}
          animationType="slide"
          swipeDirection={'down'}
          onSwipeComplete={() => setPerformed(false)}
          onBackButtonPress={() => setPerformed(false)}
          onBackdropPress={() => setPerformed(false)}
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
              YOU'RE GOOD TO GO!
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
              You now have {livesNum} lives.{'\n'}
              Remember to visit the prize pool page to see other ways of getting
              a free life.
            </Text>
            <TouchableOpacity
              style={{
                width: '60%',
                borderRadius: 9,
                borderWidth: 3,
                borderColor: 'rgba(255, 255, 255, .4)',
                backgroundColor: 'black',
              }}
              onPress={() => {
                setPerformed(false);
                goBack();
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
          </View>
        </RNModal>
        <View style={styles.safearea}>
          <Text style={styles.header}>NEED MORE LIVES?</Text>
          <View>
            <View style={styles.photo}>
              <Image
                source={{ uri: pData.photoUrlFront }}
                style={{ width: 120, height: 120 }}
                resizeMode={'cover'}
              />
            </View>
            <View style={styles.liveNum}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {pData.currentLives}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>
            You look pretty good for someone who has been assassinated.{'\n'}
            Let us get you back in the game.
          </Text>
          <TouchableOpacity
            onPress={() => setLivesChecked(1)}
            style={[
              styles.lives_1,
              isLive1Checked
                ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                : {},
            ]}
          >
            <Text
              style={{
                justifyContent: 'flex-start',
                fontSize: 20 * ratio,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              1 LIFE
            </Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 18 * ratio,
                  color: 'white',
                  marginRight: 10,
                }}
              >
                $1.00
              </Text>
              <Image source={isLive1Checked ? imgChecked : imgUnchecked} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLivesChecked(2)}
            style={[
              styles.lives_1,
              isLive2Checked
                ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                : {},
            ]}
          >
            <Text
              style={{
                justifyContent: 'flex-start',
                fontSize: 20 * ratio,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              2 LIVES
            </Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 18 * ratio,
                  color: 'white',
                  marginRight: 10,
                }}
              >
                $2.00
              </Text>
              <Image source={isLive2Checked ? imgChecked : imgUnchecked} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLivesChecked(3)}
            style={[
              styles.lives_1,
              isLive10Checked
                ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                : {},
            ]}
          >
            <Text
              style={{
                justifyContent: 'flex-start',
                fontSize: 20 * ratio,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              10 LIVES
            </Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 18 * ratio,
                  color: 'white',
                  marginRight: 10,
                }}
              >
                $10.00
              </Text>
              <Image source={isLive10Checked ? imgChecked : imgUnchecked} />
            </View>
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
                style={{
                  flex: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BackButton
                  imgSource={require('../assets/down-arrow.png')}
                  goBack={goBack}
                />
              </View>
              <View style={{ flex: 1 }}></View>
              <View
                style={{
                  flex: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => stripeProc()}
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
                      PAY WITH STRIPE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 3 }}></View>
            </View>
          </View>
        </View>
      </Modal>
    </Background>
  );
};

const styles = StyleSheet.create({
  lives_1: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 15 * ratio,
    borderRadius: 20,
    width: '80%',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 120,
    marginTop: 20 * ratio,
    overflow: 'hidden',
  },
  text: {
    flexShrink: 1,
    color: 'white',
    width: '80%',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20 * ratio,
    marginBottom: 20 * ratio,
  },
  liveNum: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 30,
    height: 30,
    marginTop: 90 + 20 * ratio,
    marginLeft: 80,
    backgroundColor: 'red',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  header: {
    marginTop: 50 * ratio,
    fontSize: 25 * ratio,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Archivo',
    textAlign: 'center',
  },
  modal: {
    width: '100%',
    height: '100%',
  },
  rnModal: {},
  bottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30 * ratio,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safearea: {
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'black',
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyLives);
