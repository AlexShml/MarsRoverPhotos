import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from "@react-navigation/elements";
import axios from "axios";
import PhotoSelector from "./src/components/PhotoSelector";
import PhotoGrid from "./src/components/PhotoGrid";
import LoadingScreen from "./src/components/LoadingScreen";
import { PhotoContext } from "./src/components/PhotoContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

const AppStack = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const onShowPhotos = async (camera, date) => {
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
    <PhotoContext.Provider value={{ onShowPhotos, photos, isLoading }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Stack.Screen
          name="PhotoSelector"
          component={PhotoSelector}
          options={({ navigation }) => ({
            title: "Select Camera and Date",
            headerRight: () => (
              <HeaderBackButton
                onPress={() => {
                  navigation.navigate("PhotoGrid");
                }}
              />
            ),
          })}
        />

        <Stack.Screen
          name="PhotoGrid"
          component={PhotoGrid}
          options={{ title: "PhotoGrid" }}
        />
      </Stack.Navigator>
    </PhotoContext.Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  backButton: {
    marginLeft: 10,
  },
});
