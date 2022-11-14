import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';

export default function Button(props) {
  const color = props.color ? props.color : '#5EC422';
  let wrapStyle = props.inverter ? { ...styles.wrap, backgroundColor: '#fff', borderColor: color } : { ...styles.wrap, backgroundColor: color, borderColor: color };
  wrapStyle = { ...wrapStyle, opacity: props.disabled ? 0.5 : 1 }
  const textStyle = props.inverter ? { ...styles.text, color: '#5EC422', ...props.textStyle } : { ...styles.text, ...props.textStyle };
  return (
    <TouchableOpacity
      {...props}
      style={[wrapStyle, props.style]}
    >
      {props.isLoading ? (<ActivityIndicator color={props.inverter ? '#000' : '#fff'} />) : (
        <>
          {props.leftComponent}
          <Text style={{...textStyle, ...props.styleText}}>
            {props.text}
          </Text>
          {props.rightComponent}
        </>
      )}

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: { height: 64, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 32, borderWidth: 1, flexDirection: 'row',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: -2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3.22,

  elevation: 3,
 },
  text: { fontSize: 16, color: '#FFFFFF', fontFamily: 'Avenir', fontWeight: '700', textTransform: 'uppercase' }
});
