import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text, StatusBar, Input2 } from '@components'
import { colors } from '@constants'
import { FlatList } from 'react-native-gesture-handler';

export default function CountriesModal(props) {
  const { onClose, data = [], onSelect, title, showSearch, searchValue, onChangeSearchText } = props
  console.log('data', data)
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

        <View style={{ marginTop: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, paddingBottom: 17 }}>
          <TouchableOpacity onPress={onClose}>
            <Image style={{ width: 22, height: 16, marginRight: 11 }} source={require('@assets/icons/back_modal.png')} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '900', fontSize: 22, color: '#FFFFFF' }}>
            {title}
          </Text>
        </View>

        {/* {showSearch && (
          <View style={{ paddingHorizontal: 22 }}>
            <Input
              placeholder='Search'
              onChangeText={onChangeSearchText}
              value={searchValue}
              autoCapitalize="none"
              style={{ marginBottom: 20 }}
            />
          </View>
        )} */}

        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id}
          style={{ backgroundColor: '#fff' }}
          ListHeaderComponent={<View style={{ paddingHorizontal: 15, paddingBottom: 8 }}>
            <Input2
              onChangeText={onChangeSearchText}
              value={searchValue}
              showSearchIcon
              placeholder='Search Players'
            />
          </View>}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => onSelect(item)}
                style={{ height: 78, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#D9DBE9', flexDirection: 'row', alignItems: 'center' }}
              >

                <Image style={{ width: 24, height: 24, marginRight: 11 }}
                  source={item?.selected ? require('@assets/icons/check-player.png') : require('@assets/icons/uncheck-player.png')}
                />

                <Image
                  style={{ width: 61, height: 61, marginRight: 15 }}
                  source={item?.thumbnail?.url ? { uri: item?.thumbnail?.url } : require('@assets/icons/user.png')}
                />

                <View>
                  <Text style={{ fontWeight: '500', fontSize: 18, color: '#081735' }}>
                    {item?.name}
                  </Text>
                  <Text style={{ fontWeight: '500', fontSize: 13, color: '#A0A3BD' }}>
                    {item?.position?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />

        <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#fff' }}>
          <Button
            style={{ marginTop: 26, marginBottom: 30, width: '80%' }}
            text='Save'
            onPress={onClose}
          />
        </View>


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
