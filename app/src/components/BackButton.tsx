import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";

const height = Math.round(Dimensions.get('window').height);
const ratio = height/812;

const BackButton = ({ goBack, imgSource }) => (
  <TouchableOpacity onPress={goBack} style={styles.container} activeOpacity={.7}>
      <Image
        resizeMode='stretch'
        source={imgSource}
      />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width:45 * ratio, 
    height: 45 * ratio,
    borderRadius: 9 * ratio,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 3,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default memo(BackButton);
