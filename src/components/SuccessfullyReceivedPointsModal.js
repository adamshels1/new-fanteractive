import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class UpdatesModal extends Component {

  render() {
    const { onClose, isLoading, day, title } = this.props;
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
              <Image source={require('@assets/icons/reward.png')} style={styles.image} />

              {day?.title && (
                <Text style={styles.day}>
                  {day?.title}
                </Text>
              )}

              {title && (
                <Text style={styles.day}>
                  {title}
                </Text>
              )}

              <Text style={styles.text}>
                Successfully Received
              </Text>

              <Text style={styles.points}>
                +{day?.points}
              </Text>



              <Button
                text='Ok'
                onPress={onClose}
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
  text: { marginTop: 12, fontWeight: '600', fontFamily: 'Montserrat', fontSize: 20, color: '#121212', textAlign: 'center' },
  day: { fontWeight: '400', fontFamily: 'Montserrat', fontSize: 12, color: '#121212', textAlign: 'center' },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Montserrat', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 151, height: 151, marginTop: 68, marginBottom: 50 },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
