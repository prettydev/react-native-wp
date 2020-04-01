import React, { memo } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
// import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

const MyTextInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholderTextColor='lightgray'
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12
  },
  input: {
    backgroundColor: 'black',
    color: 'white'
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4
  }
});

export default memo(MyTextInput);
