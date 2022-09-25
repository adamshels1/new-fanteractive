import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Linking } from 'react-native'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import { Text } from '@components'

export default function Day(props) {
  const containerStyle = props.status === 'redeemed' ? styles.container : { ...styles.container, backgroundColor: '#fff' }
  const dayTextStyle = props.status === 'redeemed' ? styles.dayText : { ...styles.dayText, color: '#000' }
  return (

    <Animatable.View
      animation={props.status === 'active' ? 'pulse' : null}
      easing="ease-out"
      iterationCount="infinite"
      onPress={props.onPress}
      style={containerStyle}
    >
      {props.status === 'redeemed' ? (
        <Image source={require('@assets/icons/check-mark.png')} style={styles.checkIcon} />
      ) : (
        <Text style={styles.points}>
          +{props?.points}
        </Text>
      )}

      <Text style={dayTextStyle}>
        {props?.title}
      </Text>

    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  container: { width: 70, height: 70, backgroundColor: '#2D77C5', borderRadius: 12, borderColor: '#2D77C5', borderWidth: 1, justifyContent: 'center', alignItems: 'center', margin: '1.8%' },
  dayText: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 12, color: '#fff' },
  points: { fontFamily: 'Montserrat', fontWeight: '700', fontSize: 16, color: '#2D77C5', marginBottom: 4 },
  checkIcon: { width: 20, height: 20, marginBottom: 7 },
})
