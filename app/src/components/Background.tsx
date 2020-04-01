import React, { memo } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";

const Background = ({ children }) => (
  <View
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled={false}>
      {children}
    </KeyboardAvoidingView>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(Background);
