// Import necessary components from React and React Native
import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";

import styles from "../styles/styles";// Import styles from external file

// Declare and export the DiseaseScreen component, which receives navigation and route as props
export default function DiseaseScreen({ navigation, route }) {
  
  // Extract necessary data from route params
  const name = route.params.data.class;
  const item = route.params.remedy;
  const imagePath = route.params.image;

  // Function to format remedy text into bullet points
  function createBulletPoints(text) {
    const steps = text.split(". ");
    const bulletPoints = steps.map((step) => `${step.trim()}`);
    return bulletPoints.join("\n\n");
  }

  const breakText = createBulletPoints(item.Remedy);

  // Call the createBulletPoints function and log the result to the console when the component mounts
  useEffect(() => {
    console.log(route.params.remedy.Remedy);
  }, []);

  // Render the SafeAreaView component to provide a safe area for content
  // Render a ScrollView to enable scrolling when content overflows
  return (
    <SafeAreaView className="flex-1 bg-white h-screen">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="h-full"//class name declared as h-full
      >
        <View>
          <View className="p-5">
            <View
              className="mt-10 bg-lime-800 p-5 rounded-xl flex flex-row items-center"
              style={styles.shadow}
            >
              <Image
                source={{ uri: imagePath }}
                style={{ width: 130, height: 150 }}
                className="rounded-lg"
              />
              <View className="ml-3">
                <Text className="text-gray-300">Disease Name</Text>
                <Text className="text-white font-bold text-lg w-4/6">
                  {name.replace(/_/g, " ")}
                </Text>
              </View>
            </View>

            <View className="mt-10">
              <Text className="text-base font-bold mb-2">Description:</Text>
              <Text style={styles.itemText}>{item.Description}</Text>
              <Text className="text-base font-bold my-2 mt-5">Remedy:</Text>
              <Text style={styles.itemText}>{breakText}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "black",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   headerText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 24,
//   },
//   container: {
//     backgroundColor: "#e8f9d1",
//     padding: 15,
//     borderRadius: 15,
//     margin: 5,
//     marginHorizontal: 10,
//     marginBottom: 32,
//   },
//   innerContainer: {
//     alignItems: "center",
//     flexDirection: "column",
//     marginTop: 20,
//   },
//   itemHeading: {
//     fontWeight: "bold",
//     marginBottom: 5,
//     color: "black",
//   },
//   itemText: {
//     fontWeight: "300",
//     marginBottom: 10,
//     color: "black",
//   },
// });
