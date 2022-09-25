import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class UpdatesModal extends Component {

  render() {
    const { onClose, onDeletePhoto, onCamera, onGallery } = this.props;
    return (
      <Modal
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down', 'up']}
        onBackdropPress={onClose}
        {...this.props}
      >
        <View style={styles.container}>

          <TouchableOpacity onPress={onClose} style={styles.closeWrap}>
            <Image source={require('@assets/icons/x.png')} style={styles.closeIcon} />
          </TouchableOpacity>


          <View style={{ alignItems: 'center' }}>

            <View style={styles.textWrap}>
              <Text style={styles.text}>
                Upload Photo
              </Text>
            </View>


            <View style={styles.wrapSelectButtons}>
              <TouchableOpacity
                onPress={onCamera}
              >
                <Image source={require('@assets/images/bg_button.png')} style={styles.buttonBG} />
                <View style={styles.buttonContent}>
                  <Image source={require('@assets/icons/photo.png')} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>Camera</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onGallery}
              >
                <Image source={require('@assets/images/bg_button.png')} style={styles.buttonBG} />
                <View style={styles.buttonContent}>
                  <Image source={require('@assets/icons/from-galery.png')} style={styles.buttonIconGallery} />
                  <Text style={styles.buttonText}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>




{/* 
            <View style={styles.buttons}>
              <Button
                text='Delete'
                inverter
                color='#D91F26'
                onPress={onDeletePhoto}
                textStyle={{ color: '#D91F26' }}
              />
            </View> */}


          </View>

        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFF', borderRadius: 12, bottom: 0, paddingHorizontal: 17, paddingBottom: 57 },
  text: { marginTop: 12, fontWeight: '600', fontFamily: 'Montserrat', fontSize: 20, color: '#121212' },
  day: { fontWeight: '400', fontFamily: 'Montserrat', fontSize: 12, color: '#121212', textAlign: 'center' },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Montserrat', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 80, height: 82, marginTop: 67, marginBottom: 16 },
  buttons: { marginTop: 50, flexDirection: 'row', justifyContent: 'space-between', width: '100%' },

  buttonText: { marginTop: 18, fontWeight: '600', fontFamily: 'Montserrat', fontSize: 18, color: '#121212' },
  buttonContent: { width: 165, height: 145, position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  buttonBG: { width: 162, height: 145 },
  buttonIcon: { width: 44, height: 35 },
  buttonIconGallery: { width: 45, height: 40 },
  wrapSelectButtons: { flexDirection: 'row', marginTop: 27, justifyContent: 'space-around', width: '105%' },
  textWrap: { width: '100%', marginTop: 35 },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
