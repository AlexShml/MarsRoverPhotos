import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const PhotoSelector = ({ onShowPhotos, navigation }) => {
  const [camera, setCamera] = useState("fhaz");
  const [date, setDate] = useState("");

  const handleShowPhotos = () => {
    onShowPhotos(camera, date);
  };

  return (
    <View style={styles.container}>
      <Text>Select Camera:</Text>
      <TextInput
        style={styles.input}
        placeholder="Camera"
        value={camera}
        onChangeText={setCamera}
      />
      <Text>Select Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Explore" onPress={handleShowPhotos} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});

export default PhotoSelector;
