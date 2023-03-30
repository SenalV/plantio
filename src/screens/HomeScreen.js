import { View, Text } from "react-native";
import { Icon } from "react-native-eva-icons";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { findAll } from "../services/diseases.mjs";

export default function HomeScreen() {
  const url = "http://127.0.0.1:8000/ping";

  const [loading, setLoading] = useState(false);
  const [diseases, setDiseases] = useState([]);

  const fetchData = async () => {
    setLoading(true)

    const res = await findAll()

    setDiseases([...res])
    setLoading(false)
}

useEffect(() => {
  fetchData();
},[])

if(loading) {
  return (
    <View classNam="flex items-center justify-center h-screen">
      <Text>Loading</Text>
    </View>
  )
}


  // const getPing = () => {
  //   axios
  //     .get("http://127.0.0.1:8000/ping")
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   // fetch("http://127.0.0.1:8000/ping")
  //   //   .then((response) => response.json())
  //   //   .then((json) => {
  //   //     console.log(json);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });
  // };

  // useEffect(() => {
  //   // getPing();
  // }, []);

  return (
    <View className="h-screen p-5 mt-8">
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
