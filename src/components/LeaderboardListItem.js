import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { Text } from '@components'

export default function RewardListItem({ avatar, place, points, onPress, first_name, last_name }) {
  const imageSource = avatar ? { uri: avatar } : require('@assets/images/no_image.png');
  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row' }}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.wrapInfo}>

          <Text style={styles.title}>
            {first_name} {last_name}
          </Text>
          <Text style={styles.availablePoints}>
            <Text style={styles.points}>{points}</Text> points
          </Text>

        </View>
      </View>

      <Text style={styles.number}>
        {place}
      </Text>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingTop: 14,
    paddingBottom: 17,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#121212', marginBottom: 3 },
  number: { fontFamily: 'Montserrat', fontWeight: '700', fontSize: 20, color: '#CFCFCF', marginTop: 6 },
  wrapInfo: { width: '70%', marginLeft: 18 },
  availablePoints: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#121212' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' },
  image: { width: 55, height: 55, borderRadius: 25 },
});
