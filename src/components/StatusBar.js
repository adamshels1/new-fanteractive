import React from 'react';
import { StatusBar, SafeAreaView, View, StyleSheet } from 'react-native';

export default function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={styles.statusBar}>
      <SafeAreaView>
        <StatusBar translucent  barStyle='light-content' />
      </SafeAreaView>
    </View>
  )
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: '#00293B',
  },
});