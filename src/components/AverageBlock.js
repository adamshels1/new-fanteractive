import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text, View, ImageBackground } from 'react-native';

export default function AvarageBlock(props) {
  return (
    <View style={{ width: 300, height: 120, alignItems: 'center' }}>
    <View
      style={styles.averageBlock}>
      <View style={styles.averageWrap}>
        <Text style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: 12, color: '#FFFFFF' }}>
          {props?.title}
        </Text>
      </View>

      <View style={{ width: '100%', height: 62, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: '400', fontSize: 42, color: '#000000' }}>
          {props.value}
        </Text>
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  textWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  optionTitle: { fontWeight: '500', fontSize: 14, paddingBottom: 8, paddingLeft: 3 },
  optionValue: { fontWeight: '700', fontSize: 18, fontFamily: 'Oswald', textTransform: 'uppercase' },
  gradientLine: { width: '100%', height: 6, borderRadius: 3, alignItems: 'flex-end', marginBottom: 16 },
  grayLine: { backgroundColor: '#F4F4FB', height: 6, },
  averageBlock: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.22,
    elevation: 3,
    width: 220,
    height: 98,
    backgroundColor: '#fff',
    borderRadius: 7
  },
  averageWrap: { width: '100%', height: 35, backgroundColor: '#00293B', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 7, borderTopLeftRadius: 7 },
});
