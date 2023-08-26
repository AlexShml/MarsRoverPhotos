import "react-native-gesture-handler";
import { Button } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import PhotoSelector from "./screens/PhotoSelector";
import PhotoGrid from "./screens/PhotoGrid";
import LoadingScreen from "./screens/LoadingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const onShowPhotos = async (camera, date) => {
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
    <NavigationContainer>
      <Stack.Navigator>
        {!showPhotos ? (
          <Stack.Screen
            name="PhotoSelector"
            options={{ title: "Select Camera and Date" }}
          >
            {(props) => (
              <PhotoSelector
                {...props}
                onShowPhotos={onShowPhotos}
                navigation={props.navigation}
              />
            )}
          </Stack.Screen>
        ) : isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : (
          <Stack.Screen
            name="PhotoGrid"
            options={({ navigation }) => ({
              headerLeft: () => (
                <Button
                  onPress={() => navigation.navigate("PhotoSelector")}
                  title="Info"
                  color="#fff"
                />
              ),
            })}
          >
            {(props) => (
              <PhotoGrid
                {...props}
                photos={photos}
                navigation={props.navigation}
                // selectedCamera={selectedCamera}
                // selectedDate={selectedDate}
                // isLoading={isLoading}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
