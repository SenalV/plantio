import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const SubmittedEntry = (props) => {
  const navigator = useNavigation();
  // console.log(`Props: ${props}`)

  console.log("my journal rendered");

  if (props.route.params === undefined) {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
          padding: 25,
        }}
      >
        <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 12 }}>
          You haven't created any entries yet.
        </Text>
        <Text style={{ textAlign: "center" }}>
          To create an entry, go to the Add Entry + .
        </Text>
        <TouchableOpacity
          className="absolute bottom-4 right-4 bg-lime-800 p-3 px-4 rounded-full"
          onPress={() => navigator.navigate("add-journal")}
        >
          <Text className="text-white font-bold">Add Entry +</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const [savedEntries, setSavedEntries] = useState([]);
  const { allEntries } = props.route.params;

  useEffect(() => {
    if (allEntries) {
      setSavedEntries((prevEntries) => [...prevEntries, ...allEntries]);
    }
  }, [allEntries]);

  const submittedEntries = savedEntries?.map((entry) => (
    <View key={entry.id}>
      <Pressable
        onLongPress={() =>
          Alert.alert(
            "Delete",
            "Do you want to delete this entry?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  console.log(
                    "ENTRY TO DELETE:",
                    JSON.stringify(entry, null, 2)
                  );
                  let remainingEntries = savedEntries.filter(
                    (item) => item !== entry
                  );
                  console.log(
                    "REMAINING ENTRIES:",
                    JSON.stringify(remainingEntries, null, 2)
                  );
                  setSavedEntries(remainingEntries);
                },
              },
            ],
            {
              cancelable: true,
            }
          )
        }
      >
        <View key={entry.id} className="bg-black mb-5 rounded-lg p-5">
          <View className="flex flex-row items-center">
            <Text className="text-gray-400">Plant Name : </Text>
            <Text className="text-white">{entry.title}</Text>
          </View>
          {entry.images && entry.images[0] && (
            <Image
              className="w-full h-60 object-cover rounded-md mt-3"
              source={{ uri: entry.images[0] }}
            />
          )}
          <Text className="font-bold text-white my-3">{entry.text}</Text>
          <Text className="text-gray-400 text-xs">
            Created at : {entry?.date}
          </Text>
        </View>
      </Pressable>
    </View>
  ));
  return (
    <ScrollView className="bg-white h-screen p-5">
      <View className="mb-10 pt-5 flex flex-row items-center">
        <View className="w-4/6">
          <Text className="text-xl font-semibold">Journal Entries</Text>
          <Text className="text-gray-500">
            Add entries to keep track of you plant progress.
          </Text>
        </View>
        <TouchableOpacity
          className=" bg-lime-800 p-3 px-4 rounded-full"
          onPress={() => navigator.navigate("add-journal")}
        >
          <Text className="text-white font-bold">Add Entry +</Text>
        </TouchableOpacity>
      </View>
      {submittedEntries}
    </ScrollView>
  );
};

export default SubmittedEntry;
