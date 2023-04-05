import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

export default function AddJournal() {
  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-5">
          <View>
            <Text className="text-xl font-semibold">Add a Journal Entry</Text>
            <Text className="text-gray-500">
              Add a milestone on your plant progress.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}