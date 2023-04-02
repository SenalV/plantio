import { View, Text } from "react-native";

export default function DiseaseScreen({navigation, route}) {
  return (
    <View className="bg-white h-screen p-5 pt-10">
        <Text>{route.params.data.class}</Text>
    </View>
  )
}
