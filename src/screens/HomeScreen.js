import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import { Icon } from "react-native-eva-icons";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { findAll } from "../services/diseases.mjs";
import { ActivityIndicator } from "react-native";
import plant from "../../assets/plant-bg.jpg";
import styles from "../styles/styles.js";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const url = "http://127.0.0.1:8000/ping";


  const navigator = useNavigation();

  const [loading, setLoading] = useState(false);
  const [diseases, setDiseases] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    const res = await findAll();

    setDiseases([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex items-center justify-center bg-white h-screen">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-5">
          <View className="flex flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-semibold">
                Welcome to
                <Text className="text-green-800"> Plantio</Text>
              </Text>
              <Text className="text-gray-500">
                Start treating your plants with Plantio.
              </Text>
            </View>

            {/* <Text>{JSON.stringify(diseases)}</Text> */}

            <View className="flex flex-row">
              <TouchableOpacity>
                <Icon
                  name="settings-outline"
                  fill="black"
                  height={20}
                  width={20}
                  className="mr-2"
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Icon name="bell-outline" fill="black" height={20} width={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-10 bg-lime-800 p-5 rounded-xl" style={styles.shadow}>
            <View className="flex flex-row items-center">
              <Image
                source={plant}
                style={{ width: 130, height: 150 }}
                className="rounded-lg"
              />
              <Text className="text-white font-black text-3xl ml-5">
                Diagnose
              </Text>
            </View>
            <Text className="text-white font-bold text-lg mt-5">
              Somethings wrong with your plant ?
            </Text>
            <Text className="text-white">
              Take a picture to see and diagnose possible diseases.
            </Text>
            <View className="mt-5">
              <TouchableOpacity onPress={()=> navigator.navigate("Diagnose")}>
                <View className="flex flex-row bg-lime-500 p-3 w-2/5 items-center justify-center rounded-xl">
                  <Icon
                    name="image-outline"
                    fill="black"
                    height={20}
                    width={20}
                    className="mr-2"
                  />
                  <Text className="font-bold text-sm text-black">Diagnose</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="my-5 text-gray-400 font-semibold text-xl">Track & Keep</Text>

          <TouchableOpacity onPress={()=> navigator.navigate("Plant")}>
            <View
              className="bg-lime-800 p-5 rounded-xl flex flex-row items-center justify-between"
              style={styles.shadow}
            >
              <Icon
                name="thermometer-plus"
                fill="white"
                height={20}
                width={20}
                className="mr-2"
              />
              <Text className="text-white">Track your plants environment</Text>

              <Icon
                name="arrow-ios-forward-outline"
                fill="white"
                height={20}
                width={20}
                // className="ml-10"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigator.navigate("Journal")}>
            <View
              className="mt-5 bg-lime-800 p-5 rounded-xl flex flex-row items-center justify-between"
              style={styles.shadow}
            >
              <Icon
                name="book"
                fill="white"
                height={20}
                width={20}
                className="mr-2"
              />
              <Text className="text-white">Keep a Journal</Text>

              <Icon
                name="arrow-ios-forward-outline"
                fill="white"
                height={20}
                width={20}
                // className="ml-10"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
