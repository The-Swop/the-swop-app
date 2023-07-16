import './shim'

import {LogBox, ScrollView } from 'react-native'
//import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

LogBox.ignoreAllLogs(false)

import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, FlatList, Image, View } from 'react-native';

import React, { useEffect, useState } from "react"
import * as cyclesIDL from "./interfaces/cmc";
import { HttpAgent, Actor, Identity } from "@dfinity/agent";
import styles from './app.styles.js';
import 'react-native-url-polyfill/auto'
import { Principal } from '@dfinity/principal'
import { getBackendActor } from './lib/actor'
import swopHeader from "./assets/images/header.png";
function App() {

  const [timeResult, setTimeResult] = useState("");

  const basicAgent : HttpAgent = new HttpAgent({
    host: "https://ic0.app",
  });

  
  let backendActor;

  const loadBackendActor = async () => {
    try {
      backendActor = await getBackendActor();
    } catch (e) {
      console.error(e);
    }
  }
  
  const getOwner = async () => {
    if (!backendActor) {
      console.error("backendActor not initialized");
      return;
    }
    try {
      const owner = await backendActor.seeOwner();
      console.log(Principal.from(owner[0]).toText());
    } catch (e) {
      console.error(e);
    }
  }

  const [entriesList, setEntriesList] = useState<Array<post>>([]);

  const generateEntriesList = async() => {
    const entries = await backendActor.getAllPosts() as post[];
    console.log(entries);
    setEntriesList(entries);

  }

  type post = {
    postID: number,
    text: string,
    photo: string
  }


  const renderItem = ({ item }) => (
    <View key={item.postID} style={styles.postContainer}>
      <Text style={styles.postContent}>{item.text}</Text>
      <Image source={{uri: item.photo}} style={styles.postImage} />
    </View>
  );

  useEffect(() => {
    const initializeActorAndFetchData = async () => {
      await loadBackendActor();
      console.log(backendActor);
      getOwner();
      generateEntriesList();
    };
  
    initializeActorAndFetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={swopHeader}
          style={styles.image} 
        />
      </View>

      <FlatList
        data={entriesList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.postID ? item.postID.toString() : index.toString()}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>This is a footer</Text>
      </View>
    </View>
  )
}

export default App;
