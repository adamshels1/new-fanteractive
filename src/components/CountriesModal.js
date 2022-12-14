import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text, StatusBar } from '@components'
import { colors } from '@constants'
import { FlatList } from 'react-native-gesture-handler';

export default function CountriesModal(props) {
  const { onClose, countries = [], onSelect } = props
  return (
    <Modal
      style={styles.modal}
      onSwipeComplete={onClose}
      // swipeDirection={['down', 'up']}
      onBackdropPress={onClose}
      {...props}
    >
      <ImageBackground
        style={styles.container}
        source={require('@assets/images/bg_screen.jpg')}
      >

        <View style={{ marginTop: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, paddingBottom: 27 }}>
          <TouchableOpacity onPress={onClose}>
            <Image style={{ width: 22, height: 16, marginRight: 11 }} source={require('@assets/icons/back_modal.png')} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '900', fontSize: 22, color: '#FFFFFF' }}>Select Your Country</Text>
        </View>

        <FlatList
          data={countries}
          keyExtractor={(item, index) => item.code}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={()=>onSelect(item)}
                style={{ height: 64, justifyContent: 'center', paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#1B3D53', marginHorizontal: 11 }}
              >
                <Text style={{ fontWeight: '500', fontSize: 15, color: '#FFFFFF' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )
          }}
        />


      </ImageBackground>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: {
    flex: 1,
    backgroundColor: '#0C2738',
  },
  text: { marginTop: 12, fontWeight: '600', fontFamily: 'Avenir', fontSize: 20, color: '#121212', textAlign: 'center' },
  day: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 12, color: '#121212', textAlign: 'center' },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Avenir', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 80, height: 82, marginTop: 67, marginBottom: 16 },
  buttons: { marginTop: 54, flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
