import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Image } from 'react-native';
import { colors } from '@constants'
import { Text } from '@components'

export default function ListItem(props) {
  return (
    <TouchableOpacity {...props} style={{
      width: '100%',
      height: 76,
      borderRadius: 16,
      backgroundColor: '#fff',
      paddingHorizontal: 11,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.22,

      elevation: 3,
    }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: '#EDEEF3', justifyContent: 'center', alignItems: 'center', marginRight: 11, }}>
          <Image source={props.icon} style={{ width: 52, height: 52, borderRadius: 26 }} resizeMode='center' />
        </View>

        <View>
          <Text style={{ fontWeight: '900', fontSize: 16, color: '#00293B', width: 200 }} numberOfLines={1}>
            {props?.amount}
          </Text>
          <Text style={{ fontWeight: '500', fontSize: 12, color: '#7D86A9', width: 200 }} numberOfLines={1}>
            {props?.title}
          </Text>
        </View>
      </View>

      {props?.value ? (
        <Text style={{ fontWeight: '700', fontSize: 32, color: '#00293B', fontFamily: 'Oswald' }}>{props?.value}</Text>
      ) : <Image source={require('@assets/icons/arrow-right.png')} style={{ width: 12.51, height: 22.52 }} />}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
});
