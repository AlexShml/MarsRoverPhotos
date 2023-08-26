import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";

const PhotoGrid = ({ photos, navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.img_src }} style={styles.image} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
