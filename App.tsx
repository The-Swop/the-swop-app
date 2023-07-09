import './shim'

import { LogBox } from 'react-native'
//import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

LogBox.ignoreAllLogs(true)

import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';

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

  return (
    <View style={styles.container}> 
        <View style={styles.stats}>
            <Text style={styles.header6}>TOTAL TIME TO BURN 1 ICP</Text>
            <Text style={{ color: "#fc609d" }}>{timeResult}</Text>
            <Text style={{ color: "#f5f5f7", fontSize: 17 }}>{notice}</Text>
            <View style={styles.credits}>
              
            </View>
        </View>
    </View>

  )
}
export default App;
