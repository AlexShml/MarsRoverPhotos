import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const FullScreenPhoto = ({ route }) => {
  const { imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderColor: "black",
    // margin: 40,
    // borderRadius: 8,
  },
  image: {
    width: deviceWidth - 32,
    height: deviceHeight - 150,
    borderRadius: 8,
    margin: 16,
    // backgroundColor: "black",
    // flex: 1,
  },
});
export default FullScreenPhoto;
