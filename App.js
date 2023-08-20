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
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      {!showPhotos ? (
        <Stack.Screen
          name="PhotoSelector"
          options={{ title: "Select Camera and Date" }}
        >
          {({ navigation }) => (
            <PhotoSelector
              onShowPhotos={handleShowPhotos}
              navigation={navigation}
            />
          )}
        </Stack.Screen>
      ) : isLoading ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <Stack.Screen
          name="PhotoGrid"
          options={({ navigation }) => ({
            title: "PhotoGrid",
            headerLeft: () => (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Назад</Text>
              </TouchableOpacity>
            ),
          })}
        >
          {({ navigation }) => (
            <PhotoGrid
              navigation={navigation}
              photos={photos}
              selectedCamera={selectedCamera}
              selectedDate={selectedDate}
              isLoading={isLoading}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
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
  backButtonText: {
    color: "#000",
    textAlign: center,
    fontFamily: Dosis,
    fontSize: 18,
    fontStyle: normal,
    fontWeight: 600,
    lineHeight: 22,
  },
});
