import React, { memo } from "react";
import { logoutUser } from "../api/auth-api";
import BackButton from "../components/BackButton";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { StyleSheet, View, Modal, Dimensions, Image, Text } from "react-native";
import { connect } from "react-redux";
import { PermissionsAndroid } from "react-native";

const height = Math.round(Dimensions.get("window").height);
const ratio = height / 812;

const MapScreen = ({ isVisible, goBack, pData }) => {
  const renderMarkers = () => {
    return pData.userLocations.map(item => {
      return (
        <Marker
          coordinate={{
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude)
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.markerContainer}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  overflow: "hidden"
                }}
              >
                <Image
                  style={{ flex: 1 }}
                  source={{ uri: item.photoUrlFront }}
                  resizeMode={"cover"}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 14 * ratio,
                  fontWeight: "bold"
                }}
              >
                {item.name}
              </Text>
            </View>
            <View style={styles.markerTriangle}></View>
          </View>
        </Marker>
      );
    });
  };

  return (
    <Modal animationType="slide" visible={isVisible} style={styles.modal}>
      <View style={styles.safearea}>
        <MapView
          onMapReady={() => {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ).then(granted => {
              //alert(granted) // just to ensure that permissions were granted
            });
          }}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: parseFloat(pData.latitude),
            longitude: parseFloat(pData.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          {renderMarkers()}
        </MapView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          <BackButton
            imgSource={require("../assets/left-arrow.png")}
            goBack={goBack}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%"
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30
  },
  safearea: {
    flex: 1,
    position: "relative",
    backgroundColor: "white"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  markerContainer: {
    backgroundColor: "black",
    borderRadius: 20,
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  markerImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    marginRight: 5
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "black",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  }
});

export default MapScreen;
