import React, { Component } from 'react';
import { SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView 
          source={{ uri: 'https://kvyr2-jyaaa-aaaam-qbaca-cai.ic0.app/' }} 
        />
      </SafeAreaView>
    );
  }
}
export default MyWeb;