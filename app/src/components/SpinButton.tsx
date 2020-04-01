import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import onImage from '../assets/spin_on.png';
import offImage from '../assets/spin_off.png';

const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;

const BackButton = ({ isOn, goBack, style, disabled }) => (
  <TouchableOpacity onPress = {goBack} style={[styles.container, style]} activeOpacity={.7} disabled={disabled}>
      <Image
        resizeMode='stretch'
        source={isOn?onImage:offImage}
        style={{width: 70 * ratio, height: 35 * ratio}}
        resizeMethod = {'resize'}
        resizeMode = {'stretch'}
      />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default memo(BackButton);
