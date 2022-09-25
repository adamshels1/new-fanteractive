import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

export default function CustomText(props) {
  let fontFamily = 'Avenir'
  // if (Platform.OS === 'android') {
  //   switch (props?.style?.fontWeight) {
  //     case '100':
  //       fontFamily = 'Avenir-Thin'
  //       break;
  //     case '200':
  //       fontFamily = 'Avenir-ExtraLight'
  //       break;
  //     case '300':
  //       fontFamily = 'Avenir-Light'
  //       break;
  //     case '400':
  //       fontFamily = 'Avenir-Regular'
  //       break;
  //     case '500':
  //       fontFamily = 'Avenir-Medium'
  //       break;
  //     case '600':
  //       fontFamily = 'Avenir-SemiBold'
  //       break;
  //     case '700':
  //       fontFamily = 'Avenir-Bold'
  //       break;
  //     case '800':
  //       fontFamily = 'Avenir-Bold'
  //       break;
  //     case '900':
  //       fontFamily = 'Avenir-ExtraBold'
  //       break;
  //     default:
  //       fontFamily = 'Avenir-Medium'
  //   }
  // }
  const customStyle = { fontFamily, ...props.style }
  return (
    <Text  {...props} style={customStyle}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
})