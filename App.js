import HomeScreen from "./src/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DiagnoseScreen from "./src/screens/DiagnoseScreen";
import { Icon } from "react-native-eva-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiseaseScreen from "./src/screens/DiseaseScreen";
import { StatusBar } from "expo-status-bar";
import PlantScreen from "./src/screens/PlantScreen";
import JournalScreen from "./src/screens/JournalScreen";
import AddJournal from "./src/screens/AddJournal";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import SignUpScreen from "./src/screens/SignUpScreen"
import LoginScreen from "./src/screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DiagnoseStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Diagnose-screen" component={DiagnoseScreen} />
      <Stack.Screen name="Disease" component={DiseaseScreen} />
    </Stack.Navigator>
  );
}

function PlantStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="plant" component={PlantScreen} />
    </Stack.Navigator>
  );
}

function JournalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="journal" component={JournalScreen} />
      <Stack.Screen name="add-journal" component={AddJournal} />
    </Stack.Navigator>
  );
}

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Diagnose") {
            iconName = focused ? "maximize" : "maximize-outline";
          } else if (route.name === "Plant") {
            iconName = focused
              ? "thermometer-plus"
              : "thermometer-plus-outline";
          } else if (route.name === "Journal") {
            iconName = focused ? "book" : "book-outline";
          }

          // return <Icon name={iconName} size={size} color={color} />;
          return <Icon name={iconName} fill={color} height={25} width={25} />;
        },
        tabBarActiveTintColor: "#569033",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: "center",
          marginBottom: 8,
        },
        tabBarStyle: {
          height: 60,
          justifyContent: "center",
          alignItems: "center",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Diagnose" component={DiagnoseStack} />
      <Tab.Screen name="Plant" component={PlantStack} />
      <Tab.Screen name="Journal" component={JournalStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen
            name="home"
            component={HomeTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
