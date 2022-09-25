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
  Animated,
  ImageBackground
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import SMSVerifyCode from 'react-native-sms-verifycode'
import { Header, Button, Input, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { setTokenAction, setUserAction } from '@redux/actions/userActions'
import helper from '@services/helper'


export default function ConfirmEmail({ route, navigation }) {
  const dispatch = useDispatch()
  const [canSendCode, setCanSendCode] = useState(false)
  const { email = '', token = '', username = '' } = route.params;

  const onInputCompleted = async (verificationCode) => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.verificationEmailCode(token, { verificationCode });
      console.log('resresresres', res)
      dispatch(loaderAction({ isLoading: false }))
      if (res.status === 200) {
        dispatch(setTokenAction(token))
        // dispatch(setUserAction({ userId, email, token, firstName, lastName }))
        navigation.navigate('CompleteAccount')
      } else {
        AlertAsync(res.message || 'Something went wrond')
      }
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }

  const onCompleteTimer = () => {
    setCanSendCode(true)
  }

  const onSendCodeAgain = async () => {
    try {

      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.resendVerificationEmailCode(token, { email });
      console.log('resresres', res)
      dispatch(loaderAction({ isLoading: false }))
      if (res.status === 200) {
        setCanSendCode(false)
      } else {
        AlertAsync(res.message || 'Something went wrond')
      }
    } catch (e) {
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
        title='Confirm Email Adreess'
        goBack={navigation.goBack}
      /> */}


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>
            <View style={styles.bodyTop}>
              <Text style={styles.bodyTitle}>
                Verification link sent!
              </Text>
              <Text style={styles.desc}>
                We’we sent you five-digit confirmation code to email <Text style={{ color: '#5EC422' }}>
                  {email}
                </Text>
                {`\n`}
                Please enter it in form below

              </Text>
            </View>

            <View style={styles.bodyBottom}>
              <View style={{ width: 200 }}>
                <SMSVerifyCode
                  // ref={ref => (this.verifycode = ref)}
                  onInputCompleted={onInputCompleted}
                  verifyCodeLength={5}
                  containerPaddingVertical={4}
                  containerPaddingHorizontal={30}
                  containerPaddingRight={60}
                  focusedCodeViewBorderColor="#5EC422"
                  codeViewBorderColor="#FFF"
                  codeViewStyle={{ borderWidth: 0, borderBottomWidth: 2, width: 45 }}
                  codeStyle={{ color: '#FFF', fontFamily: 'Avenir', fontWeight: '900', fontSize: 32 }}
                  containerBackgroundColor={'rgba(0,0,0,0)'}
                  codeFontSize={32}
                  autoFocus
                  onInputCompleted={onInputCompleted}
                />
              </View>


              <Text style={{ ...styles.desc, textAlign: 'center' }}>
                Didn’t get a confirmation email?{`\n`}
                Check your spam folder or
              </Text>

              <TouchableOpacity
                style={styles.sendAgain}
                onPress={onSendCodeAgain}
                disabled={!canSendCode}
              >
                {!canSendCode ? (
                  <CountdownCircleTimer
                    isPlaying
                    duration={60}
                    size={30}
                    strokeWidth={2}
                    onComplete={onCompleteTimer}
                    colors={[
                      ['#5EC422', 0.4],
                      ['#5EC422', 0.4],
                    ]}
                  >
                    {({ remainingTime, animatedColor }) => (
                      <Animated.Text style={{ color: animatedColor }}>
                        {remainingTime}
                      </Animated.Text>
                    )}
                  </CountdownCircleTimer>
                ) : <Image style={{ width: 21.67, height: 21.67 }} source={require('@assets/icons/resend.png')} />}





                <Text style={{ ...styles.sendAgainText, opacity: canSendCode ? 1 : 0.3 }}>
                  Resend
                </Text>
              </TouchableOpacity>

              {/* <Button
                style={styles.confirmButton}
                text='Confirm'
                onPress={() => navigation.navigate('VerificationSuccessful')}
              /> */}
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
  body: { justifyContent: 'space-between', marginHorizontal: 17, flex: 1, marginTop: 56 },
  bodyTop: { marginTop: '7%' },
  bodyBottom: { marginTop: '7%', width: '100%' },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 32, color: '#FFFFFF', marginTop: 60 },
  desc: { marginTop: '7%', fontFamily: 'Avenir', fontWeight: '800', color: '#FFFFFF', fontSize: 18, lineHeight: 27 },
  image: { width: 81, height: 81, marginTop: 40 },
  confirmButton: { marginTop: '7%', marginBottom: 50 },
  sendAgainText: { color: '#5EC422', fontFamily: 'Avenir', fontWeight: '800', fontSize: 18, marginLeft: 10 },
  sendAgain: { alignItems: 'center', marginTop: '7%', flexDirection: 'row', justifyContent: 'center', height: 30, marginBottom: 40 },
})