import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import moment from 'moment'
import { Text } from '@components'

export default function RewardListItem({ points, action, title, item_title, date_time, type }) {
  const color = (action === '-') ? '#D91F26' : '#2D77C5'
  // let typeText = ''
  // switch (typeText) {
  //   case 'daily_reward':
  //     typeText = 'Daily Rewards'
  //     break
  //   case 'redeemed_reward':
  //     typeText = 'Redeemed Reward'
  //     break

  // }
  return (
    <TouchableOpacity style={styles.container}>

      <View style={{ width: '75%' }}>
        <Text style={styles.title}>
          {type?.label}
        </Text>
        <Text style={styles.desc}>
          {item_title}
        </Text>
      </View>


      <View style={{ paddingRight: 20 }}>
        <Text style={styles.date}>
          {moment(date_time).format('MMMM DD, YYYY')}
        </Text>
        <Text style={{ ...styles.points, color }}>
          <Text style={{ fontWeight: '700' }}>
            {action}{points}
          </Text> points
        </Text>
      </View>

    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingTop: 14,
    paddingBottom: 17
  },
  title: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#121212' },
  desc: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 13, color: '#7A7A7A', marginTop: 6 },
  date: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 13, color: '#B7B7B7', paddingRight: 10 },
  points: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#2D77C5', marginTop: 5 },
});
