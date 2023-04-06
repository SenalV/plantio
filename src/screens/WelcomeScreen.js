import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: '#FFFFFF'}}>
        <View className="flex-1 flex justify-around my-4">
            <Text 
                className="text-black font-bold text-4xl text-center">
                Welcome to Plantio
            </Text>
            <View className="flex-row justify-center">
                <Image source={require("../../assets/images/plant6.png")}

                    style={{width: 300, height: 520}} />
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Signup')}
                    className="py-3  mx-7 rounded-xl" style={{backgroundColor: '#569033'}}>
                        <Text 
                            className="text-xl font-bold text-center text-gray-700 "
                        >
                            Sign Up
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-black font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text className="font-semibold text-green-600"> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}