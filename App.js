import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";
import PhotoSelector from "./src/components/PhotoSelector";
import PhotoGrid from "./src/components/PhotoGrid";
import LoadingScreen from "./src/components/LoadingScreen";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const handleShowPhotos = async (camera, date) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
        {
          params: {
            earth_date: date,
            camera,
            api_key: "DEMO_KEY",
          },
        }
      );
      setPhotos(response.data.photos);
      setSelectedCamera(camera);
      setSelectedDate(date);
      setShowPhotos(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!showPhotos ? (
        <PhotoSelector onShowPhotos={handleShowPhotos} />
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <PhotoGrid
          photos={photos}
          selectedCamera={selectedCamera}
          selectedDate={selectedDate}
          isLoading={isLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
