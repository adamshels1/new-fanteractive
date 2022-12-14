import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class UpdatesModal extends Component {

  render() {
    const { onClose, onOk } = this.props;
    return (
      <Modal
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down', 'up']}
        onBackdropPress={onClose}
        {...this.props}
      >
        <SafeAreaView>
          <View style={styles.container}>

          <TouchableOpacity onPress={onClose} style={styles.closeWrap}>
            <Image source={require('@assets/icons/x2.png')} style={styles.closeIcon} />
          </TouchableOpacity>


            <View style={{ alignItems: 'center' }}>
              <Image source={require('@assets/images/log-out.png')} style={styles.image} />


              <Text style={styles.text}>
                Are you sure you want to log out?
              </Text>


              <View style={{ marginTop: 29, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Button
                  text='Ok'
                  inverter
                  onPress={onOk}
                  style={{ width: '48%' }}
                  textStyle={{ color: '#121212' }}
                />
                <Button
                  text='Cancel'
                  onPress={onClose}
                  style={{ width: '48%' }}
                />
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
  text: { marginTop: 12, fontWeight: '600', fontFamily: 'Avenir', fontSize: 20, color: '#121212', textAlign: 'center' },
  day: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 12, color: '#121212', textAlign: 'center' },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Avenir', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 81, height: 73, marginTop: 70, marginBottom: 22 },
  closeWrap: { position: 'absolute', right: 5, top: 5, zIndex: 1 },
  closeIcon: { width: 50, height: 50 },
});
