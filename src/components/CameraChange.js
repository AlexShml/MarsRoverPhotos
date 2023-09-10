import { Dropdown } from "react-native-element-dropdown";
import { Text, View, StyleSheet } from "react-native";

const CameraChange = ({ camera, setCamera }) => {
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

  const renderItem = (item) => {
    return (
      <View>
        <Text>{item.cameraName}</Text>
      </View>
    );
  };

  return (
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
  );
};

const styles = StyleSheet.create({
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

export default CameraChange;
