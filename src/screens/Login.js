import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  ImageBackground
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Input, Text, StatusBar } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setTokenAction, setUserAction } from '@redux/actions/userActions'
import helper from '@services/helper'
// import messaging from '@react-native-firebase/messaging'
// import { LoginManager, Settings, AccessToken, AuthenticationToken } from "react-native-fbsdk-next"

export default function Login({ navigation }) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('shels_a') //penob45180 / dev: shels_a //penob45180
  const [password, setPassword] = useState('test1234') //test1234 //test1234
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [remember, setRemember] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const checkboxIcon = privacyPolicy ? require('@assets/icons/checkbox-active.png') : require('@assets/icons/checkbox.png');
  const onPrivacyPolicy = () => Linking.openURL('https://www.restaurantweeksofatlanta.com/privacy-policy/')
  const onTermAndConditions = () => Linking.openURL('https://www.restaurantweeksofatlanta.com/terms-conditions/')

  const checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      // console.log('User has notification permissions enabled.');
      return true;
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      // console.log('User has provisional notification permissions.');
      return true;
    } else {
      // console.log('User has notification permissions disabled');
      return false;
    }
  }

  const saveFcmToken = async (user_id, token) => {
    if (await checkApplicationPermission()) {
      const fcmToken = await messaging().getToken();
      console.log('fcmToken', fcmToken)
      const res = await mainApi.saveFcmToken({
        user_id,
        token,
        fbtoken: fcmToken
      });
    }
  }


  const login = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.login({ username, password });
      dispatch(loaderAction({ isLoading: false }))
      console.log('resresres', res)
      const token = res?.data?.access_token
      if (token) {

        const resUser = await mainApi.getUser(token);
        const user = resUser?.data?.data
        if (user) {
          console.log('user', user)
          dispatch(setUserAction(user))
        }
        setUsername('')
        setPassword('')
        dispatch(setTokenAction(token))
        navigation.navigate('HomeTabs')

        // const user = res.response;
        // if (user.user_email_confirmation === 'Confirmed') {
        //   dispatch(setTokenAction(user.token))
        //   saveFcmToken(user.id, user.token)
        //   // navigation.goBack()
        //   navigation.navigate('RestaurantWeeks')
        //   dispatch(setUserAction({ userId: user.id, ...user }))
        //   setUsername('')
        //   setPassword('')
        // } else {
        //   navigation.navigate('ConfirmEmail', { userId: user.user_id, ...user })
        // }
      } else {
        AlertAsync(res.reason || 'Something went wrond')
      }
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }

  const onFacebook = async () => {
    // Settings.setAppID('323038986555320')
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async (result) => {
        console.log('result', result)
        if (Platform.OS === 'ios') {
          const result = await AuthenticationToken.getAuthenticationTokenIOS();
          console.log(result?.authenticationToken);
          const resFacebookAuth = await mainApi.setFacebookToken(result?.authenticationToken)
          const user = resFacebookAuth.user;
          if (user) {
            dispatch(setTokenAction(user.token))
            // saveFcmToken(user.id, user.token)
            // navigation.goBack()
            navigation.navigate('RestaurantWeeks')
            dispatch(setUserAction({ userId: user.id, ...user }))
          } else {
            await AlertAsync('Error', resFacebookAuth?.reason || 'Something went wrond')
          }
        } else {
          const result = await AccessToken.getCurrentAccessToken();
          console.log(result?.accessToken);
        }

        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );


  }

  return (
    <ImageBackground
      style={styles.container}
      source={require('@assets/images/bg_screen.jpg')}
    >
      <StatusBar barStyle='dark-content' translucent backgroundColor={'#0C2738'} />
      {/* <Header
        title='Login'
        // goBack={() => navigation.navigate('RestaurantsStackScreen')}
        // goBack={navigation.goBack}
        navigation={navigation}
        showMenu
      /> */}


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>
            <Image style={styles.logo} resizeMode='contain' source={require('@assets/images/logo.png')} />
            <Text style={styles.bodyTitle}>
              Sign In to Your Account
            </Text>

            <View style={styles.bodyBottom}>
              <Input
                field='Username'
                onChangeText={username => setUsername(username)}
                value={username}
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
                maxLength={50}
              />

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

              <View style={styles.rememberBlock}>
                <TouchableOpacity onPress={() => setRemember(!remember)} style={styles.rememberWrap}>
                  <Image style={{ width: 15, height: 15 }} resizeMode='contain' source={remember ? require('@assets/icons/oval-green.png') : require('@assets/icons/Oval.png')} />
                  <Text style={styles.remember}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('RecoverPassword')}
                >
                  <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>


              <Button
                style={{ marginTop: 26 }}
                text='Continue'
                // disabled={!privacyPolicy}
                onPress={login}
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
                  onPress={() => AlertAsync('Coming soon')}
                  style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0)' }}
                  textStyle={{ color: '#03A9F4' }}
                  color='#03A9F4'
                  leftComponent={<Image style={{ width: 20, height: 16, marginRight: 22 }} resizeMode='contain' source={require('@assets/icons/twitter.png')} />}
                />
              </View>

              <TouchableOpacity
                style={{ marginBottom: 30 }}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.bottomText}>Don’t have an account? <Text style={{ color: '#5FC522' }}>Sign Up</Text></Text>
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
  body: { justifyContent: 'space-between', marginHorizontal: 17, flex: 1, marginTop: 56 },
  bodyBottom: { marginTop: 40, width: '100%' },
  forgot: { color: '#5EC422', fontFamily: 'Avenir', fontWeight: '800', fontSize: 16 },
  or: { color: '#B7B7B7', fontFamily: 'Avenir', fontWeight: '400', fontSize: 16 },
  image: { width: 56, height: 84, marginTop: 42 },
  agree: { color: '#CBCBCB', fontSize: 14, fontWeight: '400', },
  agreeWrap: { marginTop: 21, flexDirection: 'row', alignItems: 'center' },
  signup: { marginTop: 35, marginBottom: 50 },
  checkboxIcon: { width: 18, height: 18 },

  logo: {
    width: 234,
    height: 51
  },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 32, color: '#FFFFFF', marginTop: 60 },
  rememberBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 19 },
  rememberWrap: { flexDirection: 'row', alignItems: 'center' },
  remember: { color: '#CBCBCB', fontSize: 15, fontWeight: '400', marginLeft: 7 },
  orLineWrap: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 },
  orLine: { backgroundColor: '#B7B7B7', height: 1, width: '40%' },
  buttonsWrap: { marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  bottomText: { fontWeight: '800', fontSize: 14, color: '#fff', textAlign: 'center' },
})