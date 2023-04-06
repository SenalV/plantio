import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Icon, Button, Card } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

const dateObj = new Date();
const weekdayArr = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
const weekday = weekdayArr[dateObj.getDay()];
const month = dateObj.getMonth() + 1;
const day = dateObj.getDate();
const year = dateObj.getFullYear();
const date = `${weekday}, ${day}/${month}/${year}`;

const AddJournal = ({ navigation }) => {
  const [imageModal, setImageModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);

  // const [allEntries, setAllEntries] = useState([])
  const [newEntryData, setNewEntryData] = useState([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryText, setNewEntryText] = useState("");
  const [newEntryImage, setNewEntryImage] = useState([]);

  function handleSubmitEntry() {
    let allEntries = newEntryData.concat({
      id: newEntryData ? newEntryData : "",
      date: date,
      title: newEntryTitle,
      text: newEntryText,
      images: newEntryImage,
    });

    setNewEntryData(allEntries);
    navigation.navigate("journal", { allEntries });
    setNewEntryTitle("");
    setNewEntryText("");
    setNewEntryImage([]);
    setPreviewModal(!previewModal);
    Alert.alert("Journal entry submitted");
  }

  const pickGalleryImage = async () => {
    setImageModal(!imageModal);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewEntryImage((prevJournalImages) => [
        ...prevJournalImages,
        result.uri,
      ]);
      console.log(newEntryImage);
    }
  };

  const pickCameraImage = async () => {
    setImageModal(!imageModal);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewEntryImage((prevJournalImages) => [
        ...prevJournalImages,
        result.uri,
      ]);
      console.log(newEntryImage);
    }
  };

  return (
    <ScrollView style={styles.container} className="p-5 pt-10 ">
      <View>
        <View>
          <Text className="text-base mb-10 font-bold">Date : {date}</Text>
        </View>
      </View>
      <View style={styles.text}>
        <Icon
          style={{ marginLeft: 2.5, marginRight: 5 }}
          name="pencil"
          type="font-awesome"
        />
        <Text>Plant Name:</Text>
        <TextInput
          style={styles.title}
          onChangeText={(title) => setNewEntryTitle(title)}
          // onChangeText={title => }
          defaultValue={newEntryTitle}
          value={newEntryTitle}
          autoCapitalize="words"
        />
      </View>
      <View style={{ margin: 10 }}>
        <TextInput
          style={styles.textarea}
          onChangeText={(text) => setNewEntryText(text)}
          defaultValue={newEntryText}
          value={newEntryText}
          multiline
          numberOfLines={10}
          allowFontScaling
          autoCapitalize="sentences"
          textAlignVertical="top"
          placeholder="Add your plant journal entry here!"
        />
      </View>
      <View style={{ marginBottom: 5 }}>
        {newEntryImage &&
          newEntryImage.map((image) => (
            <Image
              key={image}
              source={{ uri: image }}
              style={{
                width: 360,
                height: 270,
                marginBottom: 10,
                alignSelf: "center",
              }}
              resizeMode="cover"
            />
          ))}
      </View>
      <TouchableOpacity
        className="bg-black p-3 w-2/5 rounded-full flex items-center mb-3"
        onPress={() => setImageModal(true)}
      >
        <Text className="text-white font-bold">Select Image</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={imageModal}
        onRequestClose={() => {
          setImageModal(!imageModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  setImageModal(!imageModal);
                }}
              >
                <Icon
                  style={{ margin: -5, padding: -10 }}
                  name="close"
                  type="ionicons"
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                margin: 15,
                paddingBottom: 10,
                display: "flex",
                flexDirection: "row",
                width: "85%",
                justifyContent: "space-between",
              }}
            >
              <Button
                icon={{
                  name: "camera",
                  type: "feather",
                  size: 100,
                  color: "white",
                }}
                containerStyle={{
                  height: 130,
                  width: 130,
                }}
                onPress={pickCameraImage}
                style={{ paddingLeft: 10 }}
              />

              <Button
                icon={{
                  name: "image",
                  type: "feather",
                  size: 100,
                  color: "white",
                }}
                containerStyle={{
                  height: 130,
                  width: 130,
                }}
                onPress={pickGalleryImage}
              />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        className="bg-lime-800 p-3 w-2/5 rounded-full flex items-center"
        onPress={() => setPreviewModal(true)}
      >
        <Text className="text-white font-bold">Log Entry</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={previewModal}
        onRequestClose={() => {
          setPreviewModal(!previewModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignSelf: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  setPreviewModal(!previewModal);
                }}
              >
                <Icon
                  style={{ margin: -5, padding: -10 }}
                  name="close"
                  type="ionicons"
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, letterSpacing: 1, marginBottom: 10 }}>
              Plant Journal Entry:
            </Text>
            <ScrollView style={{ width: "100%" }}>
              <Card>
                <Card.Title
                  style={{
                    fontWeight: "normal",
                    fontSize: 18,
                    marginBottom: 10,
                  }}
                >
                  {newEntryTitle}
                </Card.Title>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: 5,
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 10 }}>
                    {date}
                  </Text>
                </View>
                <Card.Divider />
                <Text style={{ fontSize: 12 }}>{newEntryText}</Text>
                {newEntryImage &&
                  newEntryImage.map((image) => (
                    <Image
                      key={image}
                      source={{ uri: image }}
                      style={{
                        width: 260,
                        height: 195,
                        marginVertical: 10,
                        alignSelf: "center",
                      }}
                      resizeMode="cover"
                    />
                  ))}
              </Card>
            </ScrollView>
            <Button
              className="previewModalBtn"
              title="Submit"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                borderRadius: 5,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 20,
              }}
              onPress={() => handleSubmitEntry()}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,

    elevation: 6,
  },
  container: {
    padding: 16,
  },
  text: {
    marginTop: 10,
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    backgroundColor: "#FFF",
    width: "72%",
    height: 46,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  textarea: {
    backgroundColor: "#FFF",
    padding: 10,
    marginHorizontal: -10,
    alignItems: "flex-start",
    marginTop: 5,
    fontStyle: "normal",
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 56,
    marginBottom: 79,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "92%",
    maxHeight: "75%",
    margin: 15,
    backgroundColor: "#FFF",
    shadowColor: "#3E4985",
    shadowRadius: 10,
    shadowOffset: 10,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  moodsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 30,
  },
  touchableOpacity: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floationButton: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
});

export default AddJournal;
