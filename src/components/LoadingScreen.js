import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";

const LoadingScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/splash/Splash.png")}
      style={styles.container}
    >
      <ActivityIndicator size="large" color="#228b22" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
