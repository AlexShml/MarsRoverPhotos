import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PhotoSelector from "../screens/PhotoSelector";
import LoadingScreen from "../screens/LoadingScreen";
import PhotoGrid from "../screens/PhotoGrid";

const screens = {
    PhotoSelector:{
        screen: PhotoSelector
    },
    PhotoGrid:{
        screen: PhotoGrid
    }
}

const appStack= createStackNavigator(screens);