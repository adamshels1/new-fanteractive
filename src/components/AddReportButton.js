import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text, View, ImageBackground, Image } from 'react-native';

export default function AddReportButton(props) {
  return (
    <TouchableOpacity
      {...props}
      style={{ position: 'absolute', width: 49, height: 49, right: 12, top: '60%', zIndex: 2 }}
    >
      <Image style={{ width: 49, height: 49 }} source={require('@assets/icons/add-icon.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
});
