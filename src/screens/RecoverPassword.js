import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Input, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setRewardsAction } from '@redux/actions/mainActions'
import helper from '@services/helper'

export default function EmailVerification({ navigation }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('recoverPassword')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')


  const resetState = () => {
    setEmail('')
    setStep('recoverPassword')
    setCode('')
    setPassword('')
    setPasswordConfirmation('')
  }

  const recoverPassword = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.recoverPassword({ email });
      dispatch(loaderAction({ isLoading: false }))
      if (res.status === 200) {
        setEmail('')
        setStep('changePassword')
      } else {
        AlertAsync(res?.data?.message || 'Something went wrond')
      }
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }


  const recoverChangePassword = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.recoverChangePassword({ code, password, passwordConfirmation });
      dispatch(loaderAction({ isLoading: false }))
      if (res.status === 200) {
        setEmail('')
        await AlertAsync('Success', 'Password changed succesfully')
        navigation.navigate('Login')
        resetState()
      } else {
        AlertAsync(res?.data?.message || 'Something went wrond')
      }
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }

  const renderRecoverPassword = () => {
    return (
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text style={styles.bodyTitle}>
            Recover Password
          </Text>
          <Image style={styles.image}
            resizeMode='contain'
            source={require('@assets/images/email3.png')}
          />
          <Text style={styles.desc}>
            Enter a valid email address that will be used for recover your password.
            A verification code will be sent to your email on the next step.
          </Text>
        </View>

        <View style={styles.bodyBottom}>
          <Input
            field='Email'
            onChangeText={email => setEmail(email)}
            value={email}
            autoCapitalize="none"
          />

          <Button
            style={styles.confirmButton}
            text='Send'
            onPress={recoverPassword}
          />
        </View>


      </View>
    )
  }

  const renderChangePassword = () => {
    return (
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text style={styles.bodyTitle}>
            Recover Password
          </Text>
          <Image style={styles.image}
            resizeMode='contain'
            source={require('@assets/images/email3.png')}
          />
          {/* <Text style={styles.desc}>
            Enter a valid email address that will be used for recover your password.
            A verification code will be sent to your email on the next step.
          </Text> */}
        </View>

        <View style={styles.bodyBottom}>
          <Input
            field='Code'
            onChangeText={text => setCode(text)}
            value={code}
            autoCapitalize="none"
            keyboardType='number-pad'
            maxLength={5}
          />

          <Input
            wrapStyle={{ marginTop: 15 }}
            field='Password'
            onChangeText={text => setPassword(text)}
            value={password}
            showSecureTextButton
            secureTextEntry={true}
            autoCapitalize="none"
            maxLength={50}
          />


          <Input
            wrapStyle={{ marginTop: 15 }}
            field='Password Confirmation'
            onChangeText={text => setPasswordConfirmation(text)}
            value={passwordConfirmation}
            showSecureTextButton
            secureTextEntry={true}
            autoCapitalize="none"
            maxLength={50}
          />


          <Button
            style={styles.confirmButton}
            text='Send'
            onPress={recoverChangePassword}
          />
        </View>


      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Recover Password'
        goBack={navigation.goBack}
        navigation={navigation}
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          {step === 'recoverPassword' && renderRecoverPassword()}
          {step === 'changePassword' && renderChangePassword()}

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
  bodyBottom: { marginTop: 70, width: '100%' },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 24, color: '#121212' },
  desc: { marginTop: 30, fontFamily: 'Avenir', fontWeight: '400', color: '#7A7A7A', fontSize: 16, textAlign: 'center', lineHeight: 27 },
  image: { width: 81, height: 81, marginTop: 40 },
  confirmButton: { marginTop: 27, marginBottom: 50 },
  sendAgainText: { color: '#F2A71D', fontFamily: 'Avenir', fontWeight: '600', fontSize: 14 },
  sendAgain: { alignItems: 'center', marginTop: 40 },
})