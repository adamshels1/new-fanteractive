import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Image, Switch, Platform } from 'react-native';
import PropTypes from 'prop-types'
import { colors } from '@constants'
import { Text } from '@components'

export default function Button(props) {
  return (
    <View style={styles.wrap}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {props.leftComponent}
        <Text style={{...styles.text, ...props.textStyle}}>
          {props.title}
        </Text>
      </View>
      <Switch
        trackColor={{ false: "gray", true: colors.APP }}
        thumbColor={props.active ? 'white' : "#f4f3f4"}
        ios_backgroundColor="gray"
        onValueChange={props.onChange}
        value={props.active}
      />
    </View>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  wrap: { borderColor: '#DEDEDE', borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  text: { fontWeight: '400', fontFamily: 'Montserrat', fontSize: 16, },
  icon: { width: 6, height: 10 }
});
