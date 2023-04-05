import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getRdb } from "../services/rdb.mjs";
import { ref as sRef, onValue } from "firebase/database";
import styles from "../styles/styles.js";
import img from "../../assets/clipart.jpg";

export default function PlantScreen() {
  const [moistureLevel, setMoistureLevel] = useState(null);

  function convertMoistureValue(rawValue) {
    const dryValue = 750;
    const wetValue = 450;

    const valueRange = dryValue - wetValue;
    const normalizedValue = (rawValue - wetValue) / valueRange;
    const moisturePercentage = 100 - normalizedValue * 100;

    return moisturePercentage.toFixed(2);
  }

  function getCoolerColor(moistureLevel) {
    if (moistureLevel <= 30) {
      return "tomato";
    } else if (moistureLevel > 30 && moistureLevel <= 85) {
      return "darkseagreen";
    } else if (moistureLevel > 85 && moistureLevel <= 100) {
      return "tomato";
    } else {
      return "orange";
    }
  }

  useEffect(() => {
    const startRef = sRef(getRdb(), "soilMoistureData");
    onValue(startRef, (snapshot) => {
      const value = snapshot.child("soilMoistureValue").val();
      setMoistureLevel(convertMoistureValue(value));
      console.log(moistureLevel + " raw value ==> " + value);
    });
  }, []);

  return (
    <View className="bg-white h-screen">

      <View className="p-5">

        <View className="pt-5">
          <Text className="text-xl font-semibold">
            Keep track of your 
            <Text className="text-green-800"> Plant</Text>
          </Text>
          <Text className="text-gray-500">
            See what the environment of your plant is like and keep track on the progress.
          </Text>
        </View>

        <View className=" mt-5 bg-black p-5 rounded-xl" style={styles.shadow}>
          <View className="flex-row items-center">
            <Image
              source={img}
              style={{ width: 130, height: 150 }}
              className="rounded-lg"
            />
            <View className="ml-4">
              <Text className="text-gray-400">Plant Name</Text>
              <Text className="font-bold text-white text-base">
                My bell pepper plant
              </Text>
              <Text className="text-gray-400 mt-5">Moisture Level</Text>
              <Text
                className="font-bold text-3xl"
                style={{ color: getCoolerColor(moistureLevel) }}
              >
                {moistureLevel}%
              </Text>
            </View>
          </View>
          <Text className="text-gray-400 text-xs mt-4">
            The moisture level above is updated realtime. If you don't see any
            changes check the hardware
          </Text>
        </View>
      </View>
    </View>
  );
}
