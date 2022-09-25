import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

export default function CustomText(props) {
  let fontFamily = 'Avenir'
  // if (Platform.OS === 'android') {
  //   switch (props?.style?.fontWeight) {
  //     case '100':
  //       fontFamily = 'Montserrat-Thin'
  //       break;
  //     case '200':
  //       fontFamily = 'Montserrat-ExtraLight'
  //       break;
  //     case '300':
  //       fontFamily = 'Montserrat-Light'
  //       break;
  //     case '400':
  //       fontFamily = 'Montserrat-Regular'
  //       break;
  //     case '500':
  //       fontFamily = 'Montserrat-Medium'
  //       break;
  //     case '600':
  //       fontFamily = 'Montserrat-SemiBold'
  //       break;
  //     case '700':
  //       fontFamily = 'Montserrat-Bold'
  //       break;
  //     case '800':
  //       fontFamily = 'Montserrat-Bold'
  //       break;
  //     case '900':
  //       fontFamily = 'Montserrat-ExtraBold'
  //       break;
  //     default:
  //       fontFamily = 'Montserrat-Medium'
  //   }
  // }
  const customStyle = { fontFamily, ...props.style }
  return (
    <Text  {...props} style={customStyle}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
})