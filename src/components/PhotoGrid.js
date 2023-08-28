import React, { useContext } from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";
import { PhotoContext } from "./PhotoContext";
import LoadingScreen from "./LoadingScreen";

const PhotoGrid = () => {
  const { photos, isLoading } = useContext(PhotoContext);
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
              <Image source={{ uri: item.img_src }} style={styles.image} />
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
