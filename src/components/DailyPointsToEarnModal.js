import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
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
              <Image source={require('@assets/images/im.png')} style={styles.image} />

              <Text style={styles.text}>
                You have {`\n`}
                Daily Points to Earn!
              </Text>



              <Button
                text='Claim Points Now!'
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
  container: { marginHorizontal: 10, backgroundColor: '#FFF', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 32 },
  text: { marginTop: 12, fontWeight: '400', fontFamily: 'Montserrat', fontSize: 20, color: '#121212', textAlign: 'center', marginBottom: 54 },
  day: { fontWeight: '400', fontFamily: 'Montserrat', fontSize: 12, color: '#121212', textAlign: 'center', marginTop: 13, marginBottom: 52 },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Montserrat', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 231, height: 215, marginTop: 34, marginBottom: 15 },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
