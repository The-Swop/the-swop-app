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

import React, { useState } from "react"
import * as cyclesIDL from "./interfaces/cmc";
import { HttpAgent, Actor } from "@dfinity/agent";
import styles from './app.styles.js';
import 'react-native-url-polyfill/auto'
function App() {

  const [timeResult, setTimeResult] = useState("");

  const basicAgent : HttpAgent = new HttpAgent({
    host: "https://ic0.app",
  });

  const calculateSecondsToBurnICP = async () : Promise<void> => {
    const conversionRate : number = await getConversionRate();
    const burnRate : number = await getBurnRate();
    if (!burnRate) {
      Alert.alert("Please enter a burn rate");
      return;
    }
    const secondsToBurnICP = conversionRate / burnRate;
    const minutesToBurnICP = Number((secondsToBurnICP / 60).toFixed(2));
    const minutesRemainderDecimal = Number((minutesToBurnICP % 1).toFixed(2));
    const decimalToSeconds = Number((minutesRemainderDecimal * 60).toFixed(0));
    const minutesToBurnICPFormatted = minutesToBurnICP.toString().split(".")[0];
    setTimeResult(Number((minutesToBurnICPFormatted)) + " Minutes and " + decimalToSeconds.toFixed(0) + " Seconds");
    console.log("Updated!");
  }

  const getBurnRate = async (): Promise<number> => {
    const burnRateAPI:string = "https://ic-api.internetcomputer.org/api/v3/metrics/cycle-burn-rate";
    
    try {
      const response = await fetch(burnRateAPI);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      const jsonResponse = await response.json();
      const finalResponse = Number(jsonResponse.cycle_burn_rate[0][1]).toFixed(0);
      return Number(finalResponse);
    } catch (error) {
      console.error('Error:', error);
      // You might want to handle the error differently, maybe even re-throw it
      return 0;
    }
  }
  

  const getConversionRate = async () : Promise<number> => {
    const mainnetCyclesCanister: string = "rkp4c-7iaaa-aaaaa-aaaca-cai";
    const cyclesMintingActor = Actor.createActor(cyclesIDL.idlFactory, {
      agent: basicAgent,
      canisterId: mainnetCyclesCanister,
    });
    const conversionRate: any = await cyclesMintingActor.get_icp_xdr_conversion_rate();
    const actualRate = conversionRate.data.xdr_permyriad_per_icp.toString();
    const requiredZeros = "00000000";
    const finalRate = Number(actualRate + requiredZeros);
    return finalRate;
  }

  React.useEffect(() => {
    calculateSecondsToBurnICP();
    const interval = setInterval(() => {
      calculateSecondsToBurnICP();
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const notice: string = "(Based On ICP>XDR)";

  const posts = [
    { id: '1', title: 'First post', content: 'This is the 1st post.' },
    { id: '2', title: 'Second post', content: 'This is the 2nd post.' },
    { id: '3', title: 'Third post', content: 'This is the 3rd post.' },
    { id: '4', title: 'Fourth post', content: 'This is the 4th post.' },
  ];

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Image
        style={styles.postImage}
        source={require('./assets/images/outpost.png')}
      />
    </View>
  );

  return (
  <View style={styles.container}>
    <View style={styles.header}>
      <Image
        style={styles.image}
        source={require('./assets/images/header.png')}
      />
    </View>
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={item => item.id}
    />
     <View style={styles.footer}>
      <Text style={styles.footerText}>This is a footer</Text>
    </View>
  </View>
);

  
}
export default App;
