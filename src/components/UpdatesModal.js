import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image, Button } from 'react-native';
import Modal from 'react-native-modal';

export default class UpdatesModal extends Component {
  
  render() {
    const { onClose, onApply, updates } = this.props;
    return (
      <Modal
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down', 'up']}
        // onBackdropPress={onClose}
        {...this.props}
      >
        <SafeAreaView>
          <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>
                Version: {updates && updates.label} available. Please restart Application.
              </Text>

              <TouchableOpacity style={styles.closeWrap} onPress={onClose}>
                <Image style={styles.colseIcon} resizeMode='contain' source={require('@assets/icons/x.png')} />
              </TouchableOpacity>
            </View>

            <Button
              title='Apply updates'
              onPress={onApply}
              style={{ marginTop: 45 }}
            />

          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, justifyContent: 'center' },
  container: { marginHorizontal: 10, backgroundColor: '#FFF', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 18 },
  colseIcon: { width: 20, height: 20 },
  closeWrap: { width: 50, height: 50, right: -10, top: -15, justifyContent: 'center', alignItems: 'center', position: 'absolute', flex: 1 },
  button: { backgroundColor: 'blue', borderColor: '#0029FF', borderWidth: 1, marginTop: 20 },
  distanceValue: { fontWeight: '600', fontFamily: 'Gotham Pro', color: '#777F95', fontSize: 14 },
  distancesWrap: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },

});
