import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@components'
import { TextInputMask } from 'react-native-masked-text';

export default class Input extends Component {
  constructor(props) {
    super(props);
    const { secureTextEntry = false } = this.props;
    this.state = {
      borderColor: '#D6D6D6',
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
      borderColor: '#D6D6D6',
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
      <View style={[this.props.wrapStyle]}>
        <View style={styles.wrapFiedl}>
          <Text style={styles.textFiedl}>
            {this.props.field}
          </Text>
        </View>
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
              style={{ width: 20, height: 20, top: 8 }}
            />
          </View>
        )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: { width: '100%', height: 38, borderBottomWidth: 2, borderColor: '#D6D6D6', fontSize: 16, fontFamily: 'Avenir', color: '#CBCBCB', fontWeight: '400' },
  secureTextButton: { position: 'absolute', right: 0, top: 0, width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  closedEye: { height: 19, width: 22 },
  openEye: { height: 16, width: 22 },
  wrapFiedl: { paddingHorizontal: 0 },
  textFiedl: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14, color: '#8F9FB3', textTransform: 'uppercase' },
});