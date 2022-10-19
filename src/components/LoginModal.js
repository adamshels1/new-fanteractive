import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class LoginModal extends Component {

  render() {
    const { onClose, onLogin, isLoading, onEmail, renderHeader, text } = this.props;
    return (
      <Modal
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down', 'up']}
        onBackdropPress={onClose}
        avoidKeyboard={true}
        {...this.props}
      >
        <SafeAreaView>
          <View style={styles.container}>

            <TouchableOpacity onPress={onClose} style={styles.closeWrap}>
              <Image source={require('@assets/icons/x2.png')} style={styles.closeIcon} />
            </TouchableOpacity>


            <View style={{ alignItems: 'center' }}>
              {/* <Image source={require('@assets/icons/comments.png')} style={{ width: 118, height: 118, marginTop: 39 }} /> */}

              {/* <Image source={require('@assets/images/rew.png')} style={{ width: 185, height: 172, marginTop: 34 }} /> */}

              {renderHeader && renderHeader()}

              <Text style={styles.text}>
                {text}
              </Text>



              <View style={styles.bodyBottom}>


                <Button
                  text='Log in'
                  style={{ width: '100%' }}
                  onPress={onLogin}
                />

                <View style={styles.orWrap}>
                  <View style={styles.line} />
                  <Text style={styles.or}>Or sign up with</Text>
                  <View style={styles.line} />
                </View>

                <View style={styles.wrapButtons}>
                  {/* <Button
                    text='Facebook'
                    inverter
                    onPress={onLogin}
                    color='#1377FB'
                    textStyle={{ color: '#1377FB' }}
                    style={{ width: '48%' }}
                    leftComponent={<Image style={styles.fbIcon} resizeMode='contain' source={require('@assets/icons/facebook.png')} />}
                  /> */}
                  <Button
                    text='Email'
                    inverter
                    onPress={onEmail}
                    textStyle={{ color: '#F2A71D' }}
                    style={{ width: '100%' }}
                    leftComponent={<Image style={styles.emailIcon} resizeMode='contain' source={require('@assets/icons/email.png')} />}
                  />
                </View>

              </View>

            </View>

          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, justifyContent: 'center', paddingTop: '20%' },
  container: { marginHorizontal: 10, backgroundColor: '#FFF', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 20 },
  text: { marginTop: 15, fontWeight: '400', fontFamily: 'Avenir', fontSize: 20, lineHeight: 26, color: '#121212', textAlign: 'center', marginBottom: 41 },
  bodyBottom: { width: '100%' },
  orWrap: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 19 },
  or: { color: '#B7B7B7', fontFamily: 'Avenir', fontWeight: '600', fontSize: 14 },
  fbIcon: { width: 18, height: 18, marginRight: 8 },
  emailIcon: { width: 18, height: 18, marginRight: 8 },
  line: { backgroundColor: '#B7B7B7', height: 1, width: '30%' },
  wrapButtons: { marginTop: 19, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
