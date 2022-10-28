import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'

export default function BlockTitle(props) {
  return (
    <View style={{ height: 33, width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 21 }}>
      <View style={{ backgroundColor: '#fff' }}>
        <Text style={{
          fontWeight: '800', fontSize: 24, color: '#00293B', paddingRight: 10,
          fontFamily: props?.showLine ? 'Oswald' : 'Avenir',
          textTransform: props?.showLine ? 'uppercase' : 'capitalize'
        }}>
          {props?.title}
        </Text>
      </View>
      {props?.showLine && (
        <View style={{ width: '100%', height: 1, backgroundColor: '#7D86A9' }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
})