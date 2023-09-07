import React, { useContext, useCallback } from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PhotoContext } from "./PhotoContext";
import LoadingScreen from "./LoadingScreen";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const PhotoGrid = () => {
  const { photos, isLoading } = useContext(PhotoContext);
  const navigation = useNavigation();
  const handlePhotoPress = (imageUrl) => {
    navigation.navigate("FullScreenPhoto", { imageUrl });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={{ backgroundColor: "#DCCEBE" }}>
          <View style={styles.flatlist}>
            {photos.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePhotoPress(item.img_src)}
              >
                <Image source={{ uri: item.img_src }} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  flatlist: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 16,
    backgroundColor: "#DCCEBE",
  },

  image: {
    width: deviceWidth / 3 - 19,
    height: deviceHeight / 7,
    margin: 4,
    borderRadius: 8,
  },
});

export default PhotoGrid;
