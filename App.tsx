import './shim'

import { LogBox } from 'react-native'
//import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

LogBox.ignoreAllLogs(true)

import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, FlatList, Image, View } from 'react-native';

import React, { useState, useEffect } from "react"
import * as cyclesIDL from "./interfaces/cmc";
import { HttpAgent, Actor } from "@dfinity/agent";
import styles from './app.styles.js';
import 'react-native-url-polyfill/auto'
import { Principal } from "@dfinity/principal";
import { idlFactory } from "./interfaces/backend";
const App = () => {
  const [entriesList, setEntriesList] = useState<post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const basicAgent = new HttpAgent({ host: 'https://ic0.app' });
  const backendActor = Actor.createActor(idlFactory, {
    agent: basicAgent,
    canisterId: '35nwh-5qaaa-aaaap-qbhtq-cai',
  });

  const getOwner = async () => {
    const owner = await backendActor.seeOwner() as Principal[];
    console.log(Principal.from(owner[0]).toText());
  };

  const generateEntriesList = async () => {
    const entries = await backendActor.getAllPosts() as post[];
    console.log(entries);
    setEntriesList(entries);
    setIsLoading(false);
  };

  type post = {
    postID: number,
    text: string,
    photo: string
  };

  const populateBody = async (entriesList: post[]) => {
    return Promise.all(
      entriesList.map(async (entry, index) => (
        <View key={index} style={styles.postContent}>
          <Text>{entry.text}</Text>
          <Image source={{ uri: entry.photo }} style={styles.postImage} />
        </View>
      ))
    );
  };

  useEffect(() => {
    console.log(backendActor);
    getOwner();
    generateEntriesList();
  }, []);

  return (
    <View>
      <View>
        <Image source={require('./assets/images/header.png')} />
      </View>

      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>{populateBody(entriesList)}</>
        )}
      </View>

      <View>
        <View>
          <Text>This is a footer</Text>
        </View>
      </View>
    </View>
  );
};

export default App;