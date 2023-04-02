import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';

const CHANNEL_ID = '2091947';
const READ_API_KEY = 'T4K8SBTO1VN2WKV5';

export default function PlantScreen() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=2`);
      const feeds = response.data.feeds;
      if (feeds.length > 0) {
        const lastEntry = feeds[0];
        const field1Value = lastEntry.field1;
        setUrl(`https://api.thingspeak.com/channels/${CHANNEL_ID}/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15&api_key=${READ_API_KEY}&field1=${field1Value}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="bg-white h-screen pt-10">
      <View className="p-5">
        <Text className="font-bold text-lg">Soil Moisture</Text>
        {url !== '' && (
          <WebView
            source={{ uri: url }}
            style={{ marginTop: 20 }}
          />
        )}
      </View>
    </View>
  );
}
