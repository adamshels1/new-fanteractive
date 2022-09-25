import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class Confirm extends Component {

  render() {
    const { onClose, onGiveUp } = this.props;
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
            <Image source={require('@assets/icons/give_up.png')} style={styles.image} />


            <Text style={styles.text}>
              Are you sure you want {`\n`}to give up? You will earn
              {`\n`}<Text style={{ color: '#F2A71D' }}>0 points!</Text>
            </Text>


            <View style={styles.buttons}>

              <Button
                text='Give Up'
                inverter
                onPress={onGiveUp}
                color='#D91F26'
                style={{ width: '48%' }}
                textStyle={{ color: '#D91F26' }}
              />
              <Button
                text='Continue'
                inverter
                onPress={onClose}
                style={{ width: '48%' }}
                textStyle={{ color: '#F2A71D' }}
              />
            </View>


          </View>

        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFF', borderRadius: 12, bottom: 0, paddingHorizontal: 17, paddingBottom: 57 },
  text: { marginTop: 12, fontWeight: '600', fontFamily: 'Montserrat', fontSize: 20, color: '#121212', textAlign: 'center' },
  day: { fontWeight: '400', fontFamily: 'Montserrat', fontSize: 12, color: '#121212', textAlign: 'center' },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Montserrat', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 91, height: 100, marginTop: 67, marginBottom: 16 },
  buttons: { marginTop: 54, flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
