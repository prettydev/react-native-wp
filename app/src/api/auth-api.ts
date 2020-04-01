// import firebase from "firebase/app";
// import "firebase/auth";
// import 'firebase/firestore';

import { baseUrl, baseApiUrl } from "../core/const";

export const logoutUser = () => {
  // firebase.auth().signOut();
};

export const signInUser = async ({
  name,
  screenName,
  phoneNumber,
  email,
  birthday,
  password
}) => {
  console.log(name);

  // "http://vps271456.vps.ovh.ca/?rest_route=/rest/v1/";

  fetch("http://192.168.0.244:8080/wordpress/?rest_route=/rest/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      screenName: screenName,
      phoneNumber: phoneNumber,
      email: email,
      birthday: birthday,
      password: password
    })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err.message);
    });
  return "Signup Failed";
  try {
    console.log("email: ", email);
    console.log("password: ", password);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({
      displayName: name
    });
    id = firebase.auth().currentUser.uid;
    console.log(id);
    await firebase
      .firestore()
      .collection("UserList/")
      .doc(id)
      .set({
        name: name,
        screenName: screenName,
        phoneNumber: phoneNumber,
        email: email,
        birthday: birthday,
        photoUrlFront: "",
        photoUrlSide: ""
      });

    return {};
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "E-mail already in use."
        };
      case "auth/invalid-email":
        return {
          error: "Invalid e-mail address format."
        };
      case "auth/weak-password":
        return {
          error: "Password is too weak."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};

export const loginUser = async ({ email, password }) => {
  console.log(email);
  //fetch(baseApiUrl+"register", {
  fetch("http://192.168.0.244:8080/wordpress/?rest_route=/rest/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(response => {
      console.log("response = ", response);
      return response;
    })
    .catch(err => {
      console.log(err.message);
    });

  return "";

  // try {
  //   await firebase.auth().signInWithEmailAndPassword(email, password);
  //   id = firebase.auth().currentUser.uid;
  //   console.log(id);
  //   firebase.firestore().collection('UserList/').doc(id).get().then((data)=>{
  //     console.log(data.data());
  //   });
  //   return {};
  // } catch (error) {
  //   switch (error.code) {
  //     case "auth/invalid-email":
  //       return {
  //         error: "Invalid email address format."
  //       };
  //     case "auth/user-not-found":
  //     case "auth/wrong-password":
  //       return {
  //         error: "Invalid email address or password."
  //       };
  //     case "auth/too-many-requests":
  //       return {
  //         error: "Too many request. Try again in a minute."
  //       };
  //     default:
  //       return {
  //         error: "Check your internet connection."
  //       };
  //   }
  // }
};

export const sendEmailWithPassword = async (email, password) => {
  console.log("<><>", email, password);
  const result = await fetch(baseApiUrl + "resetPwd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => response.json())
    .then(response => {
      const res = JSON.parse(response);
      console.log(res.result, "----------------dfdfdf>");
      return parseInt(res.result);
    })
    .catch(err => {
      console.log(err, "<-------------");
      return -1;
    });

  return result;
};
