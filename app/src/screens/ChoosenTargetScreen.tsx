import React, { memo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';
import { connect } from "react-redux";
import BackButton from '../components/BackButton';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;

const ChoosenTargetScreen = ({ navigation, pData }) => {
    console.log("Target player = ", pData.opponentPlayers);

    return (
        <View style={styles.safeArea}>
            <View style={styles.top}>
                <View style={{backgroundColor: '#848484', borderRadius: 18, padding: 5}}>
                    <Text style={[styles.text, {fontWeight: 'bold'}]}>02:55:10</Text>
                </View>
                <Text style={[styles.textTitle, {marginTop: 20}]}>YOUR CHOOSEN {'\n'} TARGET</Text>
            </View>
            <View style={styles.bottom}>
                <View style={[styles.image, {marginTop: 20}]}>
                    <Image
                        source={{uri: pData.opponentPlayers[0].photoUrlFront}}
                        style={{width: 134 * ratio, height: 134 * ratio}}
                    />
                </View>
                <View style={[styles.image, {marginTop: 20}]}>
                    <Image
                        source={{uri: pData.opponentPlayers[0].photoUrlSide}}
                        style={{width: 134 * ratio, height: 134 * ratio}}
                    />
                </View>
                <Text style={[styles.textTitle, {marginTop: 20}]}>{pData.opponentPlayers[0].name}</Text>
                <View style={[styles.pointView, {marginTop: 20, bottom: 40}]}>
                    <Text style={[styles.textTitle, {fontSize: 20 * ratio}]}>{pData.opponentPlayers[0].currentPoints / 2}</Text>
                    <Text style={styles.text}>will be your reward{'\n'}it's half of their current points</Text>
                </View>
            </View>
            <View style={styles.bottomButton}>
                <View style={styles.buttons}>
                    <View style={styles.backButton}>
                        <BackButton
                            imgSource={require('../assets/left-arrow.png')}
                            goBack={() => {
                                navigation.navigate("FaceRecognition");
                            }}
                        />
                    </View>
                </View>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black'
    },
    top: {
        flex:3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: '#0E141A',
    },
    textTitle: {
        fontSize: 25 * ratio,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 15 * ratio,
        color: 'white',
        textAlign: 'center'
    },
    image: {
        width: 134 * ratio, 
        height: 134 * ratio, 
        borderRadius: 134 * ratio, 
        overflow: 'hidden'
    },
    buttons: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    backButton: {
        flex: 4, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    bottomButton: {
        width: '100%', 
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 30, 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center'
    },
    pointView: {
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, .1)',
        width: '80%',
        marginVertical: 15,
        padding: 15,
        marginTop: 20
    }
})

const mapStateToProps = (state) => ({
    pData: state.data
});
const mapDispatchToProps = (dispatch) => ({
changeSaveData: (...arg) => {
    dispatch(change_save_data(...arg));
}
});

const ChoosenTarget = memo(ChoosenTargetScreen);

export default connect(mapStateToProps, mapDispatchToProps)(ChoosenTarget);