import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class UpdatesModal extends Component {

  render() {
    const { onClose, onOk, pointsRewards, enoughPoints } = this.props;
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
            <Image source={require('@assets/icons/spend.png')} style={styles.image} />

            {enoughPoints ? (
              <Text style={styles.text}>
                Are you sure you want to buy {`\n`}this for <Text style={{ color: '#F2A71D' }}>{pointsRewards}</Text> points?

              </Text>
            ) : (
              <Text style={styles.text}>
                You don't have enough points!
              </Text>
            )}


            {enoughPoints && (
              <View style={styles.buttons}>
                <Button
                  text='No'
                  inverter
                  onPress={onClose}
                  style={{ width: '48%' }}
                  textStyle={{ color: '#F2A71D' }}
                />
                <Button
                  text='Yes'
                  onPress={onOk}
                  style={{ width: '48%' }}
                />
              </View>
            )}


          </View>

        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFF', borderTopRightRadius: 12, borderTopLeftRadius: 12, paddingHorizontal: 17, paddingBottom: 57 },
  text: { marginTop: 12, fontWeight: '600', fontFamily: 'Montserrat', fontSize: 20, color: '#121212', textAlign: 'center', lineHeight: 24.38 },
  day: { fontWeight: '400', fontFamily: 'Montserrat', fontSize: 12, color: '#121212', textAlign: 'center' },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Montserrat', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 83, height: 83, marginTop: 58, marginBottom: 24 },
  buttons: { marginTop: 54, flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
