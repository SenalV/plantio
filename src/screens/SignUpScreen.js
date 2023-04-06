import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-eva-icons";
import { useNavigation } from "@react-navigation/native";

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#569033" }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <Icon
              name="arrow-ios-back-outline"
              fill="white"
              height={30}
              width={30}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mb-5">
          <Image source={require('../../assets/images/logo1.png')} 
          style={{width: 200, height: 200}} />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            // value="john snow"
            placeholder="Enter Name"
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            // value="john@gmail.com"
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            // value="test12345"
            placeholder="Enter Password"
          />
          <TouchableOpacity
            className="py-3  rounded-xl"
            style={{ backgroundColor: "#569033" }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-green-600"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}