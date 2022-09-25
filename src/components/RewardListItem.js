import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types'
import { Text } from '@components'

export default function RewardListItem({ intro_image, address, content, title, points, onPress }) {
  const imageSource = intro_image ? { uri: intro_image } : require('@assets/images/no_image.png');
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>

      <View style={{ flexDirection: 'row' }}>
        <Image source={imageSource} style={styles.image} />
        <View style={{ width: '70%', marginLeft: 17 }}>

          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.desc} numberOfLines={3}>
            {content}
          </Text>

        </View>
      </View>

      <View style={styles.footer}>

        <View style={styles.optionWrap}>
          {/* <Image source={require('@assets/icons/maps.png')} style={{ width: 10, height: 13 }} />
          <Text style={styles.optionText} numberOfLines={1}>{address}</Text> */}
        </View>

        <Text style={styles.availablePoints}>
          <Text style={styles.points}>{points}</Text> points
        </Text>
      </View>

    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingTop: 14,
    paddingBottom: 17
  },
  title: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 14, color: '#121212' },
  desc: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 13, color: '#7A7A7A', marginTop: 6 },
  availablePoints: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#121212' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' },
  optionWrap: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10, width: 230 },
  image: { width: 102, height: 79, borderRadius: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
});
