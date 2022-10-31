import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Image } from 'react-native';
import { colors } from '@constants'
import { Text } from '@components'

export default function ListItem(props) {
  console.log('props', props)

  const item = props.item

  if (props.type === 'article') return (
    <TouchableOpacity {...props} style={styles.wrap}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.wrapImage}>
          <Image source={{ uri: props?.icon }} style={styles.image} resizeMode='center' />
        </View>

        <View>
          <Text style={styles.amount} numberOfLines={2}>
            {props?.amount}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Image source={require('@assets/icons/comments.png')} style={{ width: 16, height: 17 }} />
        <Text style={{ fontWeight: '500', fontSize: 13, color: '#5EC422', marginLeft: 7, fontFamily: 'Avenir' }}>
          {item?.comments_count}
        </Text>
      </View>

    </TouchableOpacity>
  )


  return (
    <TouchableOpacity {...props} style={styles.wrap}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.wrapImage}>
          <Image source={{ uri: props?.icon }} style={styles.image} resizeMode='center' />
        </View>

        <View>
          <Text style={styles.amount} numberOfLines={1}>
            {props?.amount}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {props?.title}
          </Text>
        </View>
      </View>

      {props?.value ? (
        <Text style={styles.value}>{props?.value}</Text>
      ) : <Image source={require('@assets/icons/arrow-right.png')} style={{ width: 12.51, height: 22.52 }} />}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
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
  },
  wrapImage: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#EDEEF3', justifyContent: 'center', alignItems: 'center', marginRight: 11, },
  image: { width: 52, height: 52, borderRadius: 26 },
  amount: { fontWeight: '900', fontSize: 16, color: '#00293B', width: 200 },
  title: { fontWeight: '500', fontSize: 12, color: '#7D86A9', width: 200 },
  value: { fontWeight: '700', fontSize: 32, color: '#00293B', fontFamily: 'Oswald' },
});
