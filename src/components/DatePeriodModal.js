import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text, SearchInput } from '@components'
import DatepickerRange from 'react-native-range-datepicker';
import { SingleDatepicker } from 'react-native-range-datepicker';


export default function DatePeriodModal(props) {

  const { onClose, onConfirm, mode = 'multiple' } = props;
  return (
    <Modal
      style={styles.modal}
      onSwipeComplete={onClose}
      // swipeDirection={['down']}
      onBackdropPress={onClose}
      // avoidKeyboard={true}
      {...props}
    >
      <View style={styles.container}>



        <View style={{ flex: 1 }}>

          {mode === 'multiple' ? (
            <DatepickerRange
              // startDate="13052017"
              // untilDate="26062017"
              buttonColor='#51B9E5'
              onClose={onClose}
              selectedBackgroundColor='#51B9E5'
              // onSelect={onClose}
              onConfirm={onConfirm}
            />
          ) : (
            <SingleDatepicker 
              // startDate="13052017"
              // untilDate="26062017"
              buttonColor='#51B9E5'
              onClose={onClose}
              selectedBackgroundColor='#51B9E5'
              onSelect={onConfirm}
              // onConfirm={onConfirm}
            />
          )}



        </View>



      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFF', borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingHorizontal: 10, paddingBottom: 57, paddingTop: 7, height: '90%' },
  text: { marginTop: 12, fontWeight: '600', fontFamily: 'Montserrat', fontSize: 20, color: '#121212', textAlign: 'center', lineHeight: 24.38 },

  text: { fontWeight: '400', fontSize: 14, color: '#3B3E43' },
  backIcon: { width: 6, height: 10, marginRight: 9.25 },
  filterButtonWrap: { backgroundColor: '#F8F9FB', height: 60, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingLeft: 24, paddingRight: 22, marginBottom: 8 },
  checkboxIcon: { width: 20, height: 20 },
  buttonWrap: { alignItems: 'center', marginTop: 7 },
  backWrap: { flexDirection: 'row', alignItems: 'center' },
  headerWrap: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 4 }
});
