import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text, View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types'

export default function AvarageItem(props) {
  const { range = 100 } = props
  const rangeCalc = 100 - range
  return (
    <View {...props}>
      <View style={styles.textWrap}>
        <Text style={styles.optionTitle}>
          {props?.title}
        </Text>
        <Text style={styles.optionValue}>
          {props?.value}
        </Text>
      </View>
      <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
        <View style={{ ...styles.grayLine, width: `${rangeCalc}%` }} />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  textWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  optionTitle: { fontWeight: '500', fontSize: 14, paddingBottom: 8, paddingLeft: 3 },
  optionValue: { fontWeight: '700', fontSize: 18, fontFamily: 'Oswald', textTransform: 'uppercase' },
  gradientLine: { width: '100%', height: 6, borderRadius: 3, alignItems: 'flex-end', marginBottom: 16 },
  grayLine: { backgroundColor: '#F4F4FB', height: 6, }
});
