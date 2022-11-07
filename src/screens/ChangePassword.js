import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, Button, FilterModal, Input2, CountriesModal, MultiSelectModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import { logout } from '@redux/actions/userActions'
import { CommonActions } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker'
import AlertAsync from 'react-native-alert-async'
import helper from '@services/helper'

export default function Interests({ route, navigation }) {
  const dispatch = useDispatch()
  const [visibleFilterModal, setVisibleFilterModal] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  console.log('user', user)

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')


  const onSave = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.changePassword(token, {
        newPassword,
        newPasswordConfirmation,
        password,
      });
      console.log('resresresres', res)
      dispatch(loaderAction({ isLoading: false }))
      await AlertAsync('Password changed successfully')
      navigation.goBack()
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }



  // const onChangePassword = async () => {
  //   if ((password && password !== repeatPassword)) {
  //     return await AlertAsync('You have entered the repeated password incorrectly')
  //   }
  //   try {
  //     dispatch(loaderAction({ isLoading: true }))

  //     const data = await mainApi.changePassword({
  //       user_id: user?.userId,
  //       token,
  //       password: oldPassword,
  //       newpassword: password,
  //     })
  //     dispatch(loaderAction({ isLoading: false }))
  //     if (data.state === 'success') {
  //       setOldPassword('')
  //       setPassword('')
  //       setRepeatPassword('')
  //       navigation.goBack()
  //     } else {
  //       await AlertAsync('Error', data?.reason || 'Something went wrond')
  //     }

  //   } catch (e) {
  //     console.log(e.message)
  //     dispatch(loaderAction({ isLoading: false }))
  //     AlertAsync(e.message || 'Something went wrond')
  //   }
  // }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        goBack={navigation.goBack}
        showFilter
        navigation={navigation}
        onFilter={() => setVisibleFilterModal(true)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={{ paddingVertical: 27, paddingHorizontal: 20, flex: 1 }}>


            <Text style={{ fontSize: 22, fontWeight: '500', color: '#00293B' }}>
              Change Password
            </Text>

            <View style={{ marginTop: 19 }}>


              <Input2
                field='Current Password'
                maxLength={50}

                onChangeText={setPassword}
                value={password}
                showSecureTextButton
                secureTextEntry={true}

              />

              <Input2
                field='New Password'
                maxLength={50}

                onChangeText={setNewPassword}
                value={newPassword}
                showSecureTextButton
                secureTextEntry={true}

              />


              <Input2
                field='Confirm New Password'
                maxLength={50}

                onChangeText={setNewPasswordConfirmation}
                value={newPasswordConfirmation}
                showSecureTextButton
                secureTextEntry={true}

              />


              <Button
                text='Save Changes'
                style={{ marginTop: 17 }}
                textStyle={{ fontFamily: 'Oswald' }}
                onPress={onSave}
              />


            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  filterItem: { flexDirection: 'row', alignItems: 'center' },
  filterText: { fontWeight: '900', fontSize: 12, color: '#00293B' },
  filterIcon: { width: 7.53, height: 4.34, top: 1, marginLeft: 3.24 },
  filtersWrap: { height: 30, width: '100%', backgroundColor: '#EDF1F9', borderRadius: 3, paddingHorizontal: 11, flexDirection: 'row', justifyContent: 'space-between' },

  inputButton: { width: '100%', height: 50, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.32)', borderRadius: 4, marginTop: 23, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, flexDirection: 'row' },
  inputButtonField: { left: 16, top: -9, backgroundColor: '#fff', zIndex: 2, position: 'absolute' },
  inputButtonFieldText: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 12, color: '#00293B', paddingHorizontal: 5 },
  inputButtonText: { fontSize: 16, fontFamily: 'Avenir', color: '#00293B', fontWeight: '400' },
})