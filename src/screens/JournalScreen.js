import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from '@react-native-async-storage/async-storage';

const SubmittedEntry = (props) => {
    const navigator = useNavigation()
  // console.log(`Props: ${props}`)

  // Finally got this to work! Before I was trying to check if allEntries.route.params was undefined, but since this variable is only initialzed when the event happens, it wasn't even reading that variable. Of course, it had to look at the props for it to evaluate this!
  console.log('my journal rendered')

  if (props.route.params === undefined) {
    return (
      <View style={{backgroundColor:'#C1F8CF',display:'flex',alignItems:'center',height:'100%',justifyContent:'center',padding:25}}>
        <Text style={{textAlign:'center',marginBottom:20,fontSize:12}}>You haven't created any entries yet.</Text>
        <Text style={{textAlign:'center'}}>To create an entry, go to the + New Entry.</Text>
        <TouchableOpacity className="absolute bottom-4 right-4 bg-lime-800 p-3 px-4 rounded-full"
        onPress={() => navigator.navigate("add-journal")}
        >
          <Text className="text-white font-bold">Add Entry +</Text>
        </TouchableOpacity>
      </View>
    )
  } 

  const [savedEntries, setSavedEntries] = useState([]);
const { allEntries } = props.route.params;

useEffect(() => {
  if (allEntries) {
    setSavedEntries(prevEntries => [...prevEntries, ...allEntries]);
  }
}, [allEntries]);
 


  const submittedEntries = savedEntries?.map(entry => 
    <View key={entry.id}>
      <Pressable 
        onLongPress={() => Alert.alert(
          'Delete',
          'Do you want to delete this entry?',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => {
                console.log('ENTRY TO DELETE:', JSON.stringify(entry, null, 2))
                let remainingEntries = savedEntries.filter(item => item !== entry)
                console.log('REMAINING ENTRIES:', JSON.stringify(remainingEntries, null, 2))
                setSavedEntries(remainingEntries)
              }
            }
          ],
          {
            cancelable: true,
          }
        )
        }>
        <Card key={entry.id}>
          <Card.Title style={{fontWeight:'normal',fontSize:18,marginBottom:10}}>{entry.title}</Card.Title>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:5, paddingBottom:5}}>
            <Text style={{textAlign:'center',fontSize:10}}>{entry?.date}</Text>
            <Icon size={35} name={entry?.mood?.name} color={entry?.mood?.color} type='font-awesome-5' />
          </View>
          <Card.Divider />
          <Text style={{fontSize:12,fontStyle:'normal',paddingHorizontal:5}}>{entry.text}</Text>

        </Card>
      </Pressable>
    </View>
  );
  return (
      <ScrollView style={styles.container}>
        {submittedEntries}
        <TouchableOpacity className="absolute bottom-4 right-4 bg-lime-800 p-3 px-4 rounded-full"
        onPress={() => navigator.navigate("add-journal")}
        >
          <Text className="text-white font-bold">Add Entry +</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor:'#C1F8CF',
  }
})

export default SubmittedEntry;
