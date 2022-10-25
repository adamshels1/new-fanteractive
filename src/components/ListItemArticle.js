import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Image } from 'react-native';
import { colors } from '@constants'
import { Text } from '@components'

export default function ListItem(props) {
  return (
    <TouchableOpacity {...props} style={{
      width: '100%',
      height: 94,
      marginBottom: 5,
      flexDirection: 'row',
      padding: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#CBD5EA'
    }}>
      <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#EDEEF3', justifyContent: 'center', alignItems: 'center', marginRight: 14, }}>
        <Image source={props.image} resizeMode='contain' style={{ width: 50, height: 50, borderRadius: 25 }} />
        {props.miniImage && (
          <Image source={props.miniImage} resizeMode='contain' style={{ width: 20, height: 20, borderRadius: 8, position: 'absolute', right: 0, bottom: 0 }} />
        )}

      </View>

      <View>
        <Text style={{ fontWeight: '500', fontSize: 10, color: '#7D86A9', width: 200 }} numberOfLines={1}>
          {props?.value1}
        </Text>
        <Text style={{ fontWeight: '900', fontSize: 16, color: '#00293B', width: 250 }} numberOfLines={1}>
          {props?.value2}
        </Text>
        <Text style={{ fontWeight: '500', fontSize: 13, color: '#00293B', width: 200 }} numberOfLines={1}>
          {props?.value3}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 5.5 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('@assets/icons/user_article.png')} style={{ width: 13, height: 13 }} />
            <Text style={{ fontWeight: '500', fontSize: 12, color: '#00293B', marginLeft: 6 }}>
              {props?.value4}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <Image source={require('@assets/icons/calendar.png')} style={{ width: 11.5, height: 11 }} />
            <Text style={{ fontWeight: '500', fontSize: 12, color: '#00293B', marginLeft: 6 }}>
              {props?.value5}
            </Text>
          </View>

        </View>
      </View>

      {props?.gameResult && (
        <Text style={{ position: 'absolute', top: 10, right: 10, fontFamily: 'Oswald', fontSize: 26, fontWeight: '700' }}>
          {props.gameResult}
        </Text>
      )}


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
});
