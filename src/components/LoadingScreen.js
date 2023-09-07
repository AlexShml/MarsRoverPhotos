import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const LoadingScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/splash/Splash.png")}
      style={styles.imageBackground}
    >
      <ActivityIndicator size="large" color="#228b22" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
