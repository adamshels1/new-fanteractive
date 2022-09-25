import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'

export default function BlockTitle(props) {
  return (
    <View style={{ height: 33, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: '700', fontSize: 22, color: '#161F2D', paddingRight: 10, textTransform: 'uppercase' }}>
          {props?.title}
        </Text>
      </View>
      <View style={{ width: '100%', height: 1, backgroundColor: '#7D86A9' }} />
    </View>
  )
}

const styles = StyleSheet.create({
})