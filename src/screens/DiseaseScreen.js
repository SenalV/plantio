import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { firebase } from '../screens/config';

export default function DiseaseScreen({ navigation, route }) {
  const [diseases, setDiseases] = useState([]);
  const [name, setName] = useState(route.params.data.class);

  useEffect(() => {
    const todoRef = firebase.firestore().collection('Plant Disease');

    todoRef.where('Name', '==', name).get().then(querySnapshot => {
      const diseases = [];
      querySnapshot.forEach(doc => {
        const { Name, Description, Remedy } = doc.data();
        diseases.push({
          id: doc.id,
          Name,
          Description,
          Remedy
        });
      });
      setDiseases(diseases);
    });
  }, [name]);

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{name.replace(/_/g, ' ').toUpperCase()}</Text>
      </View>
      <FlatList
        style={{ height: 'auto', opacity: 0.8 }}
        data={diseases}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>Description:</Text>
              <Text style={styles.itemText}>{item.Description}</Text>
              <Text style={styles.itemHeading}>Remedy:</Text>
              <Text style={styles.itemText}>{item.Remedy}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  container: {
    backgroundColor: '#e8f9d1',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    marginBottom: 32,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  itemHeading: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  itemText: {
    fontWeight: '300',
    marginBottom: 10,
    color: 'black',
  },
});
