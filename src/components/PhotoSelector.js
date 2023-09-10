import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { PhotoContext } from "./PhotoContext";
import { useNavigation } from "@react-navigation/native";
import CameraChange from "./CameraChange";
import DateSelect from "./DateSelect";
import moment from "moment";

const currentDate = moment(); // or new Date();
const firstDate = currentDate.subtract(2, "days").format("YYYY/MM/DD");

const PhotoSelector = () => {
  const navigation = useNavigation();
  const { onShowPhotos } = useContext(PhotoContext);
  const [camera, setCamera] = useState("fhaz");
  const [date, setDate] = useState(firstDate);

  const handleShowPhotos = () => {
    console.log("Selected Date:", date);
    onShowPhotos(camera, date);
    navigation.navigate("PhotoGrid");
  };

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#DCCEBE" }}>
    <View style={styles.container}>
      <Text>Select Camera:</Text>
      <CameraChange setCamera={setCamera} camera={camera} />
      <Text>Select Date:</Text>
      <DateSelect setDate={setDate} date={date} />
      <Button title="Explore" onPress={handleShowPhotos} />
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#DCCEBE",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});

export default PhotoSelector;
