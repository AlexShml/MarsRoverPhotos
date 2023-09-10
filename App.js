import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import axios from "axios";
import PhotoSelector from "./src/components/PhotoSelector";
import PhotoGrid from "./src/components/PhotoGrid";
import FullScreenPhoto from "./src/components/FullScreenPhoto";
import { PhotoContext } from "./src/components/PhotoContext";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"#DCCEBE"} /* hidden */ />
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
    setIsLoading(true);
    date = date.replace(/\//g, "-");
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
          navigationBarHidden: true,
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
          options={{
            title: "PhotoGrid",
          }}
        />

        <Stack.Screen
          name="FullScreenPhoto"
          component={FullScreenPhoto}
          options={{
            title: "Full Screen Photo",
            headerStyle: { backgroundColor: "black", borderColor: "black" },
          }}
        />
      </Stack.Navigator>
    </PhotoContext.Provider>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCCEBE",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  backButton: {
    marginLeft: 10,
  },
});
