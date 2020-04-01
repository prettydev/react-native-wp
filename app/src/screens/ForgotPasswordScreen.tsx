import React, { memo, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { emailValidator, passwordValidator } from "../core/utils";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { theme } from "../core/theme";
import Button from "../components/Button";
import { sendEmailWithPassword } from "../api/auth-api";
import Toast from "../components/Toast";
import md5 from "md5";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });

  const _onSendPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      alert(emailError);
      return;
    }

    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      alert(passwordError);
      return;
    }

    setLoading(true);

    const response = await sendEmailWithPassword(
      email.value,
      md5(password.value)
    );

    console.log("Let me check again...", response);

    if (response == -1) {
      setToast({ type: "error", value: response.error });
    } else {
      let message = "";
      if (response === 0) message = "Email not Exists!";
      else if (response === 1) message = "Week Password";
      else if (response === 2) message = "Please check your Email box.";
      else message = "Unknown Error";

      setToast({
        type: "success",
        value: message
      });
    }

    setLoading(false);
  };

  return (
    <Background>
      <Header>Restore Password</Header>

      <TextInput
        style={[styles.textInput, { marginTop: 5 }]}
        placeholder="E-mail address"
        returnKeyType="done"
        placeholderTextColor="white"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.textInput, { marginTop: 15 }]}
        placeholder="New password"
        returnKeyType="done"
        placeholderTextColor="white"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        autoCapitalize="none"
        autoCompleteType="password"
        secureTextEntry
      />

      <Button
        loading={loading}
        mode="contained"
        onPress={_onSendPressed}
        style={styles.button}
      >
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>

      <Toast
        type={toast.type}
        message={toast.value}
        onDismiss={() => setToast({ value: "", type: "" })}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: "80%",
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginTop: 12,
    backgroundColor: "red",
    width: "80%"
  },
  label: {
    color: theme.colors.secondary,
    width: "100%"
  },
  textInput: {
    marginBottom: 10,
    width: "80%",
    height: 20,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    color: "white",
    padding: 0
  }
});

export default memo(ForgotPasswordScreen);
