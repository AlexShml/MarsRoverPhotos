import React from "react";
import { ActivityIndicator, StyleSheet, ImageBackground } from "react-native";

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
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
