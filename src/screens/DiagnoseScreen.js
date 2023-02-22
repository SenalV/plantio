import { View, Text } from "react-native";

export default function DiagnoseScreen() {
  return (
    <View className="h-screen p-5 mt-8">
      <Text className="text-xl font-semibold">Diagnose the disease.</Text>
      <Text className="text-gray-500">Capture an image to diagnose and for remedies. </Text>
    </View>
  );
}
