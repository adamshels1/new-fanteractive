import React, { useState, useEffect } from 'react'
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
import { RNCamera } from 'react-native-camera';
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setRewardsAction } from '@redux/actions/mainActions'

export default function EmailVerification({ navigation }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const [email, setEmail] = useState('')

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Email Verification'
        goBack={navigation.goBack}
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>
            <View style={styles.bodyTop}>
              <Text style={styles.bodyTitle}>
                Email Verification
              </Text>
              <Image style={styles.image}
                resizeMode='contain'
                source={require('@assets/images/email3.png')}
              />
              <Text style={styles.desc}>
                Enter a valid email address that will be used for tracking your reward points.
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
                text='Confirm'
                onPress={() => navigation.navigate('ConfirmEmail')}
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
  bodyBottom: { marginTop: 70, width: '100%' },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 24, color: '#121212' },
  desc: { marginTop: 30, fontFamily: 'Avenir', fontWeight: '400', color: '#7A7A7A', fontSize: 16, textAlign: 'center', lineHeight: 27 },
  image: { width: 81, height: 81, marginTop: 40 },
  confirmButton: { marginTop: 27, marginBottom: 50 },
  sendAgainText: { color: '#F2A71D', fontFamily: 'Avenir', fontWeight: '600', fontSize: 14 },
  sendAgain: { alignItems: 'center', marginTop: 40 },
})