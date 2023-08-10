import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';

class MyWeb extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <WebView source={{ uri: 'https://aixb6-aqaaa-aaaap-qbjmq-cai.raw.icp0.io/' }} />
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    );
  }
}
export default MyWeb;