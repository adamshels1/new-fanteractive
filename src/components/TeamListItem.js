import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Image } from 'react-native';
import { colors } from '@constants'
import { Text } from '@components'

export default function TeamListItem(props) {
  return (

    <View style={{ marginRight: 30 }}>
      <View style={{ width: 105, height: 105, backgroundColor: '#EDEEF3', justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: props?.image }}
          resizeMode='contain'
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <Text style={{ fontWeight: '500', fontSize: 16, color: '#00293B', width: 105, textAlign: 'center', marginTop: 9 }}>
        {props.name}
      </Text>
    </View>

  )
}

const styles = StyleSheet.create({
});
