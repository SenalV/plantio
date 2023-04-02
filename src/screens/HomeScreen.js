import { View, Text } from "react-native";
import { Icon } from "react-native-eva-icons";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { findAll } from "../services/diseases.mjs";
import { ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const url = "http://127.0.0.1:8000/ping";

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
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <View className="h-screen p-5 pt-10 bg-white">
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-semibold">
            Welcome Back,
            <Text className="text-green-800"> Johnss</Text>
          </Text>
          <Text className="text-gray-500">
            Start treating your plants with Plantio.
          </Text>
        </View>

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
    </View>
  );
}
