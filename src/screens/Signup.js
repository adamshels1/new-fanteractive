import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Linking,
  ImageBackground
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Input, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setTokenAction, setUserAction } from '@redux/actions/userActions'
import helper from '@services/helper'

export default function Login({ navigation }) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const checkboxIcon = privacyPolicy ? require('@assets/icons/oval-green.png') : require('@assets/icons/Oval.png');
  const onPrivacyPolicy = () => Linking.openURL('https://www.fanteractive.com/page/private_policy')
  const onTermAndConditions = () => Linking.openURL('https://www.fanteractive.com/page/terms_and_conditions')

  const onSignup = async () => {
    if (password !== repeatPassword) {
      AlertAsync('The entered passwords do not match')
      return
    }
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.signup({ username, email, password });
      console.log('resresres', res)
      dispatch(loaderAction({ isLoading: false }))
      const token = res?.data?.access_token
      if (token) {
        // dispatch(setTokenAction(token))
        // navigation.navigate('HomeTabs')
        // const user = res.response
        // dispatch(setTokenAction(user.token))
        // navigation.goBack()
        // dispatch(setUserAction({ userId: user.user_id, email, token: user.token, firstName, lastName }))
        navigation.navigate('ConfirmEmail', { email, token, username })
        setUsername('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setPrivacyPolicy(false)
      } else {
        AlertAsync(res?.data?.message || 'Something went wrond')
      }
    } catch (e) {

      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }
  return (
    <ImageBackground
      style={styles.container}
      source={require('@assets/images/bg_screen.jpg')}
    >
      <StatusBar barStyle='dark-content' />
      {/* <Header
        title='Welcome to Buford'
        goBack={navigation.goBack}
      /> */}


      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior="padding"
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>

            <TouchableOpacity onPress={navigation.goBack} >
              <View style={styles.buttonWrap}>
                <Image style={{ width: 20, height: 13.55 }} source={require('@assets/icons/back.png')} />
                <Text style={styles.leftButtonText}>BACK</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.bodyTitle}>
              Sign Up to Fanteractive
            </Text>

            <View style={styles.bodyBottom}>
              <Input
                field='User Name'
                onChangeText={username => setUsername(username)}
                value={username}
                autoCapitalize="none"
                style={{ marginBottom: 24 }}
              />

              <Input
                field='Email'
                onChangeText={email => setEmail(email)}
                value={email}
                autoCapitalize="none"
                style={{ marginBottom: 24 }}
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
                style={styles.agreeWrap}
                onPress={() => setPrivacyPolicy(!privacyPolicy)}
              >
                <Image
                  style={styles.checkboxIcon}
                  source={privacyPolicy ? require('@assets/icons/oval-green.png') : require('@assets/icons/Oval.png')}
                />
                <Text style={styles.agree}>
                  {'  '}I agree with
                </Text>
                <TouchableOpacity onPress={onTermAndConditions}>
                  <Text style={{ ...styles.agree, color: '#5EC422' }}> Terms and Conditions</Text>
                </TouchableOpacity>
                <Text style={styles.agree}>
                  {' '}&{' '}
                </Text>
                <TouchableOpacity onPress={onPrivacyPolicy}>
                  <Text style={{ ...styles.agree, color: '#5EC422' }}>Privacy Policy</Text>
                </TouchableOpacity>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.agreeWrap}
                onPress={() => setPrivacyPolicy(!privacyPolicy)}
              >
                <Image
                  style={styles.checkboxIcon}
                  source={checkboxIcon}
                />
                <Text style={styles.agree}>
                  {'  '}I agree with
                </Text>
                <TouchableOpacity onPress={onTermAndConditions}>
                  <Text style={{ ...styles.agree, color: '#5EC422' }}> Terms and Conditions</Text>
                </TouchableOpacity>
                <Text style={styles.agree}>
                  {' '}&{' '}
                </Text>
                <TouchableOpacity onPress={onPrivacyPolicy}>
                  <Text style={{ ...styles.agree, color: '#5EC422' }}>Privacy Policy</Text>
                </TouchableOpacity>
              </TouchableOpacity> */}

              {/* <View style={styles.rememberBlock}>
                <View style={styles.rememberWrap}>
                  <Image style={{ width: 15, height: 15 }} resizeMode='contain' source={require('@assets/icons/Oval.png')} />
                  <Text style={styles.remember}>Remember me</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RecoverPassword')}
                >
                  <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
              </View> */}


              <Button
                style={{ marginTop: 26 }}
                text='Continue'
                disabled={!privacyPolicy}
                onPress={onSignup}
              />



              <View style={styles.orLineWrap}>
                <View style={styles.orLine} />
                <Text style={styles.or}>or</Text>
                <View style={styles.orLine} />
              </View>

              <View style={styles.buttonsWrap}>
                <Button
                  text='Continue with Twitter'
                  inverter
                  // onPress={() => navigation.navigate('Signup')}
                  onPress={() => AlertAsync('', 'Coming soon')}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0)' }}
                  textStyle={{ color: '#03A9F4' }}
                  color='#03A9F4'
                  leftComponent={<Image style={{ width: 20, height: 16, marginRight: 22 }} resizeMode='contain' source={require('@assets/icons/twitter.png')} />}
                />
              </View>

              <TouchableOpacity
                style={{ marginBottom: 30 }}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.bottomText}>Don’t have an account? <Text style={{ color: '#5FC522' }}>Sign In</Text></Text>
              </TouchableOpacity>

            </View>


          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C2738'
  },
  body: { justifyContent: 'space-between', marginHorizontal: 17, flex: 1, marginTop: 10 },
  bodyBottom: { marginTop: 40, width: '100%' },
  forgot: { color: '#5EC422', fontFamily: 'Avenir', fontWeight: '800', fontSize: 18 },
  or: { color: '#B7B7B7', fontFamily: 'Avenir', fontWeight: '400', fontSize: 16 },
  image: { width: 56, height: 84, marginTop: 42 },
  agree: { color: '#CBCBCB', fontSize: 13, fontWeight: '400', },
  agreeWrap: { marginTop: 21, flexDirection: 'row', alignItems: 'center' },
  signup: { marginTop: 35, marginBottom: 50 },
  checkboxIcon: { width: 15, height: 15 },

  logo: {
    width: 234,
    height: 51
  },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 32, color: '#FFFFFF', marginTop: 60 },
  rememberBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 19 },
  rememberWrap: { flexDirection: 'row', alignItems: 'center' },
  remember: { color: '#CBCBCB', fontSize: 16, fontWeight: '400', marginLeft: 7 },
  orLineWrap: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 },
  orLine: { backgroundColor: '#B7B7B7', height: 1, width: '40%' },
  buttonsWrap: { marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  bottomText: { fontWeight: '800', fontSize: 14, color: '#fff', textAlign: 'center' },

  buttonWrap: { flexDirection: 'row', alignItems: 'center' },
  leftButtonText: { fontSize: 12, fontWeight: '800', lineHeight: 24, color: '#FFF', paddingLeft: 8.9 },
})