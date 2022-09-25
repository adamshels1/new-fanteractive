import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Input, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setTokenAction, setUserAction } from '@redux/actions/userActions'

export default function Login({ navigation }) {
  const dispatch = useDispatch()
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const user = useSelector(state => state.userReducer.user)
  const token = useSelector(state => state.userReducer.token)

  const onChangePassword = async () => {
    if ((password && password !== repeatPassword)) {
      return await AlertAsync('You have entered the repeated password incorrectly')
    }
    try {
      dispatch(loaderAction({ isLoading: true }))

      const data = await mainApi.changePassword({
        user_id: user?.userId,
        token,
        password: oldPassword,
        newpassword: password,
      })
      dispatch(loaderAction({ isLoading: false }))
      if (data.state === 'success') {
        setOldPassword('')
        setPassword('')
        setRepeatPassword('')
        navigation.goBack()
      } else {
        await AlertAsync('Error', data?.reason || 'Something went wrond')
      }

    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Change password'
        goBack={navigation.goBack}
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>
            <View style={styles.bodyTop}>
              <Text style={styles.bodyTitle}>
              </Text>
              <Image style={styles.image} resizeMode='contain' source={require('@assets/icons/Sing_log.png')} />
            </View>

            <View style={styles.bodyBottom}>
              <Input
                field='Old password'
                onChangeText={oldPassword => setOldPassword(oldPassword)}
                value={oldPassword}
                showSecureTextButton
                secureTextEntry={true}
                autoCapitalize="none"
                style={{ marginBottom: 24 }}
                maxLength={50}
              />

              <Input
                field='Password'
                onChangeText={password => setPassword(password)}
                value={password}
                showSecureTextButton
                secureTextEntry={true}
                autoCapitalize="none"
                style={{ marginBottom: 24 }}
                maxLength={50}
              />

              <Input
                field='Repeat Password'
                onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
                value={repeatPassword}
                showSecureTextButton
                secureTextEntry={true}
                autoCapitalize="none"
                maxLength={50}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('RecoverPassword')}
              >
                <Text style={styles.forgot}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>

              <Button
                disabled={!oldPassword || !password || !repeatPassword}
                style={styles.signup}
                text='Change'
                onPress={onChangePassword}
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
  body: { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 17, flex: 1 },
  bodyTop: { marginTop: 46, alignItems: 'center' },
  bodyBottom: { marginTop: 40, width: '100%' },
  bodyTitle: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 24, color: '#121212' },
  image: { width: 56, height: 84, marginTop: 42 },
  forgot: { color: '#378BED', fontFamily: 'Montserrat', fontWeight: '600', fontSize: 14, marginLeft: 8, textAlign: 'right', marginTop: 17 },
  agreeWrap: { marginTop: 21, flexDirection: 'row', alignItems: 'center' },
  signup: { marginTop: 35, marginBottom: 50 },
  checkboxIcon: { width: 18, height: 18 }
})