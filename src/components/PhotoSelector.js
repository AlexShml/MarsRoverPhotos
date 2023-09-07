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
import { Dropdown } from "react-native-element-dropdown";

const CameraOptions = [
  { abbreviation: "FHAZ", cameraName: "Front Hazard Avoidance Camera" },
  { abbreviation: "RHAZ", cameraName: "Rear Hazard Avoidance Camera" },
  { abbreviation: "MAST", cameraName: "Mast Camera" },
  { abbreviation: "CHEMCAM", cameraName: "Chemistry and Camera Complex" },
  { abbreviation: "MAHLI", cameraName: "Mars Hand Lens Imager" },
  { abbreviation: "MARDI", cameraName: "Mars Descent Imager" },
  { abbreviation: "NAVCAM", cameraName: "Navigation Camera" },
  { abbreviation: "PANCAM", cameraName: "Panoramic Camera" },
  {
    abbreviation: "MINITES",
    cameraName: "Miniature Thermal Emission Spectrometer (Mini-TES)",
  },
];

const PhotoSelector = () => {
  const navigation = useNavigation();
  const { onShowPhotos } = useContext(PhotoContext);
  const [camera, setCamera] = useState("fhaz");
  const [date, setDate] = useState("");

  const renderItem = (item) => {
    return (
      <View>
        <Text>{item.cameraName}</Text>
      </View>
    );
  };

  const handleShowPhotos = () => {
    onShowPhotos(camera, date);
    navigation.navigate("PhotoGrid");
  };

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#DCCEBE" }}>
    <View style={styles.container}>
      <Text>Select Camera:</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={CameraOptions}
        labelField="cameraName"
        valueField="abbreviation"
        placeholder="Front Hazard Avoidance Camera"
        value={camera}
        onChange={(item) => {
          setCamera(item.abbreviation);
        }}
        renderItem={renderItem}
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

  dropdown: {
    margin: 16,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  placeholderStyle: {},

  selectedTextStyle: {
    fontSize: 16,
  },
});

export default PhotoSelector;
