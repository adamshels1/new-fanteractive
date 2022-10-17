import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@components'
import { TextInputMask } from 'react-native-masked-text';

export default class Input extends Component {
  constructor(props) {
    super(props);
    const { secureTextEntry = false } = this.props;
    this.state = {
      borderColor: 'rgba(0, 0, 0, 0.32)',
      secureTextEntry
    };
  }
  onFocus = () => {
    this.setState({
      borderColor: '#5EC422',
    });
  }
  onBlur = () => {
    this.setState({
      borderColor: 'rgba(0, 0, 0, 0.32)',
    });
  }
  toggleSecureText = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  }
  renderSecureButton = () => {
    if (this.props.showSecureTextButton) return (
      <TouchableWithoutFeedback
        onPress={this.toggleSecureText}

      >
        <View style={styles.secureTextButton}>
          {this.state.secureTextEntry ? (
            <Image
              source={require('@assets/icons/Closed_eye_icon.png')}
              style={styles.closedEye}
            />
          ) : (
            <Image
              source={require('@assets/icons/Open_eye_icon.png')}
              style={styles.openEye}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { borderColor } = this.state;
    return (
      <View style={[styles.wrapStyle, this.props.wrapStyle]}>
        {this.props.field && (
          <View style={styles.wrapFiedl}>
            <Text style={styles.textFiedl}>
              {this.props.field}
            </Text>
          </View>
        )}

        {this.props.phone ? (
          <TextInputMask
            {...this.props}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(999) 999-9999'
            }}
            maxLength={14}
            keyboardType="numeric"
            placeholder='(999) 999-9999'
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            style={[styles.input, { borderColor, ...this.props.style }]}
            secureTextEntry={this.state.secureTextEntry}
            textContentType={'oneTimeCode'}
            placeholderTextColor='#9B9B9B'
          />
        ) : (
          <TextInput
            {...this.props}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            style={[styles.input, { borderColor, ...this.props.style, paddingRight: this.props.showSecureTextButton ? 47 : 0 }]}
            secureTextEntry={this.state.secureTextEntry}
            textContentType={'oneTimeCode'}
            placeholderTextColor='#9B9B9B'
          />
        )}
        {this.renderSecureButton()}
        {this.props.showSearchIcon && (
          <View style={styles.secureTextButton}>
            <Image
              source={require('@assets/icons/search.png')}
              style={{ width: 20, height: 20, top: -4 }}
            />
          </View>
        )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.32)', fontSize: 16, fontFamily: 'Avenir', color: '#00293B', fontWeight: '400', borderRadius: 4, paddingHorizontal: 14, paddingTop: 14, paddingBottom: 14 },
  secureTextButton: { position: 'absolute', right: 0, top: 0, width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  closedEye: { height: 19, width: 22 },
  openEye: { height: 16, width: 22 },
  wrapFiedl: { left: 16, top: -9, backgroundColor: '#fff', zIndex: 2, position: 'absolute' },
  textFiedl: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 12, color: '#00293B', paddingHorizontal: 5 },
  wrapStyle: { marginTop: 23 }
});