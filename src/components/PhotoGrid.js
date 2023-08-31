import React, { useContext, useCallback } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PhotoContext } from "./PhotoContext";
import LoadingScreen from "./LoadingScreen";

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
        <View style={styles.flatlist}>
          <FlatList
            data={photos}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePhotoPress(item.img_src)}>
                <Image source={{ uri: item.img_src }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>
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
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
    resizeMode: "cover",
  },
});

export default PhotoGrid;
