import { View, Text, SafeAreaView, ScrollView, Touchable } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function JournalScreen() {
    const navigator = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-5">
          <View>
            <Text className="text-xl font-semibold">Plant Journal Entries</Text>
            <Text className="text-gray-500">
              Start journaling your plant progress.
            </Text>
          </View>
        </View>
        <TouchableOpacity className="absolute bottom-4 right-4 bg-lime-800 p-3 px-4 rounded-full"
        onPress={() => navigator.navigate("add-journal")}
        >
          <Text className="text-white font-bold">Add Entry +</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
