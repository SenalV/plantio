import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiagnoseScreen from "./src/screens/DiagnoseScreen";
import { Icon } from "react-native-eva-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={{
        headerShown: false
      }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Diagnose" component={DiagnoseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
