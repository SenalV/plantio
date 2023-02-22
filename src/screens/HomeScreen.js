import { View, Text } from "react-native";
import { Icon } from "react-native-eva-icons";
import { TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View className="h-screen p-5 mt-8">
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-semibold">
            Welcome Back,
            <Text className="text-green-800"> John</Text>
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
