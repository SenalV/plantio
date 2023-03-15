import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Camera, CameraType } from "expo-camera";

export default function DiagnoseScreen() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View className="h-screen p-5 mt-8">
        <Text className="text-xl font-semibold">Diagnose the disease.</Text>
        <Text className="text-gray-500">
          Diagnose the disease and find out what you can do to solve.
        </Text>

        <View className="p-5 rounded-xl flex items-center justify-center mt-10 bg-slate-300">
          <Text className=" text-gray-500 font-bold text-base">
            Upload image to diagnose.
          </Text>
          <Text className="mb-3 text-green-700 text-sm">
            Select and upload an image to diagnose the disease.
          </Text>
          <TouchableOpacity onPress={pickImage}>
            {/* <Button title="Upload Image" /> */}
            <View className="bg-green-700 p-3 w-2/5 flex items-center justify-center rounded-xl">
              <Text className="font-bold text-sm text-green-100">
                Upload Image
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {image && (
          <View className="flex justify-center w-full items-center mt-10">
            <Text className="mb-3 text-gray-500 text-center w-4/5">
              Uploaded Image, upload again to change or click Diagnose to
              proceed
            </Text>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
              className="rounded-lg"
            />
            <TouchableOpacity className="mt-5">
              <View className="bg-slate-600 p-3 w-2/5 flex items-center justify-center rounded-xl">
                <Text className="font-bold text-sm text-blue-100">
                  Diagnose
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View className="p-5 rounded-xl flex items-center justify-center mt-10 bg-slate-300">
          <Text className=" text-gray-500 font-bold text-base">
            Capture image to diagnose.
          </Text>
          <Text className="mb-3 text-green-700 text-sm text-center">
            Capture an image using camera to diagnose the disease.
          </Text>
          <TouchableOpacity onPress={pickImage}>
            <View className="bg-blue-600 p-3 w-2/5 flex items-center justify-center rounded-xl">
              <Text className="font-bold text-sm text-blue-100">
                Capture Image
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View>
        <Camera type={type} className="h-full mb-10">
          <View>
            <TouchableOpacity onPress={toggleCameraType} className>
              <Text>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View> */}

    </ScrollView>
  );
}

const Button = (title) => {
  return (
    <View className="bg-green-700 p-3 w-2/5 flex items-center justify-center rounded-xl">
      <Text className="font-bold text-sm text-green-100">Upload Image</Text>
    </View>
  );
};
