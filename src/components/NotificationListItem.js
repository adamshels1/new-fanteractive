import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types'
import moment from 'moment'
import { Text } from '@components'

export default function RewardListItem({ event, points, action, onPress, read_status }) {
  const imageSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_logo.png');
  const borderColor = read_status ? '#FFF' : '#F8B133'
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { borderColor }]}>

      {event?.title && (
        <View style={styles.company}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.wrapInfo}>

            <Text style={styles.title} numberOfLines={1}>
              {event?.title}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.optionWrap, { maxWidth: '50%' }]}>
                <Image source={require('@assets/icons/maps.png')} style={{ width: 10, height: 13 }} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {event?.address}
                </Text>
              </View>
              <View style={styles.optionWrap}>
                <Image source={require('@assets/icons/agenda.png')} style={{ width: 12, height: 12 }} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {moment(event?.date_from).format('DD MMMM')} - {moment(event?.date_to).format('DD MMMM')}
                </Text>
              </View>
            </View>

          </View>
        </View>
      )}

      {points === 0 || points && (
        <Text style={{ marginTop: 7 }}>
          <Text style={styles.availablePoints}>
            You Earned Rewards:  <Text style={styles.points}>{action} {points}</Text> <Text style={{ color: '#121212' }}>points</Text>
          </Text>
        </Text>
      )}


    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingBottom: 17,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1
  },
  title: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#121212', marginBottom: 3 },
  number: { fontFamily: 'Montserrat', fontWeight: '700', fontSize: 20, color: '#CFCFCF', marginTop: 6 },
  wrapInfo: { width: '70%', marginLeft: 18 },
  availablePoints: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#7A7A7A' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' },
  image: { width: 55, height: 55, borderRadius: 25 },
  optionWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 15, marginTop: 7 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 7 },
  company: {
    flexDirection: 'row', borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 15
  },
});
