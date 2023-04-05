import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native";
import { Icon } from "react-native-eva-icons";
import { findByName, findOne } from "../services/diseases.mjs";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles.js";

const API_URL = "https://us-central1-plantio-272dd.cloudfunctions.net/predict";

export default function DiagnoseScreen() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [prediction, setPrediction] = useState();
  const [loading, setLoading] = useState(false);
  const [remedy, setRemedy] = useState();
  const [showCamera, setShowCamera] = useState(false);

  const navigator = useNavigation();
  const cameraRef = useRef();

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setImage(uri);
      setShowCamera(false);
    }
  };

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

  const fetchRemedy = async (name) => {
    console.log("getting remedy....");
    const res = await findOne("2kcGVYW8WAxte4FPmyJD");
    setRemedy(res);
  };

  const sendPostRequest = async () => {
    if (image) {
      setLoading(true);
      console.log("predicting....");
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      });
      console.log("File == > " + image);
      try {
        await axios
          .post(API_URL, formData, {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            setPrediction(res.data);
            fetchRemedy();
            navigator.navigate("Disease", { data: res.data });
          });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, minHeight: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Modal visible={showCamera}>
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
              <View className="flex-1 flex-row justify-center mb-5">
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                  <View className="bg-white p-5 rounded-full">
                    <Icon
                      name="camera-outline"
                      fill="black"
                      height={30}
                      width={30}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        </Modal>

        <View className="p-5">
          <Text className="text-xl font-semibold">Diagnose the disease.</Text>
          <Text className="text-gray-500">
            Diagnose the disease and find out what you can do to solve.
          </Text>

          <View
            className="p-5 rounded-xl flex items-center justify-center mt-10 bg-black"
            style={styles.shadow}
          >
            <Text className=" text-gray-200 font-bold text-base">
              Upload image to diagnose.
            </Text>
            <Text className="mb-3 text-green-600 text-sm text-center">
              Select and upload an image to diagnose the disease.
            </Text>
            <TouchableOpacity onPress={pickImage}>
              <View className="flex flex-row bg-green-700 p-3 w-fit items-center justify-center rounded-xl">
                <Icon
                  name="image-outline"
                  fill="white"
                  height={20}
                  width={20}
                  className="mr-2"
                />
                <Text className="font-bold text-sm text-green-100">
                  Upload Image
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {image && (
            <View className="flex justify-center w-full items-center mt-10">
              <Text className="mb-5 text-gray-500 text-center w-4/5 bg-green-50 p-3 rounded-lg">
                Uploaded / Captured Image, upload or capture again to change or click Diagnose to
                proceed
              </Text>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                className="rounded-lg"
              />
              <TouchableOpacity className="mt-5" onPress={sendPostRequest}>
                <View className="bg-slate-600 p-3 w-fit flex items-center justify-center rounded-xl">
                  {loading ? (
                    <View className="flex flex-row">
                      <Text className="font-bold text-sm text-white mr-2">
                        Detecting
                      </Text>
                      <ActivityIndicator size="small" />
                    </View>
                  ) : (
                    <View className="flex flex-row items-center justify-between">
                      <Icon
                        name="search-outline"
                        fill="white"
                        height={20}
                        width={20}
                        className="mr-2"
                      />
                      <Text className="font-bold text-sm text-white">
                        Diagnose
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}

          <View
            className="p-5 rounded-xl flex items-center justify-center mt-10 bg-black"
            style={styles.shadow}
          >
            <Text className=" text-gray-200 font-bold text-base">
              Capture image to diagnose.
            </Text>
            <Text className="mb-3 text-green-600 text-sm text-center">
              Capture an image using camera to diagnose the disease.
            </Text>
            <TouchableOpacity onPress={() => setShowCamera(true)}>
              <View className="flex flex-row bg-blue-600 p-3 w-fit items-center justify-center rounded-xl">
                <Icon
                  name="camera-outline"
                  fill="white"
                  height={20}
                  width={20}
                  className="mr-2"
                />
                <Text className="font-bold text-sm text-blue-100">
                  Capture Image
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Button = (title) => {
  return (
    <View className="bg-green-700 p-3 w-2/5 flex items-center justify-center rounded-xl">
      <Text className="font-bold text-sm text-green-100">Upload Image</Text>
    </View>
  );
};
