import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../core/theme";

const Header = ({style, fontSize, children }) => 
<Text textTransform='uppercase' style={ [ styles.header, style, fontSize= {fontSize}]}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Archivo',
    color: theme.colors.secondary,
    fontWeight: "bold",
    paddingVertical: 14,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  }
});

export default memo(Header);
