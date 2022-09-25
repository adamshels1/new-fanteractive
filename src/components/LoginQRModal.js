import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class UpdatesModal extends Component {

  render() {
    const { onClose, onLogin, isLoading } = this.props;
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
              <Image source={require('@assets/icons/x.png')} style={styles.closeIcon} />
            </TouchableOpacity>


            <View style={{ alignItems: 'center' }}>
              <Image source={require('@assets/icons/QRcode.png')} style={{ width: 97, height: 97, marginTop: 39 }} />



              <Text style={styles.text}>
                Please login to your {`\n`}account to scan the QR code
              </Text>



              <Button
                text='Log in'
                onPress={onLogin}
                isLoading={isLoading}
              />

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
  text: { marginTop: 15, fontWeight: '400', fontFamily: 'Montserrat', fontSize: 20, lineHeight: 26, color: '#121212', textAlign: 'center', marginBottom: 59 },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
