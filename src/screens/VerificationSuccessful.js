import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Input, Text, StatusBar } from '@components'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Verification'
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>
            <View style={styles.bodyTop}>
              <Text style={styles.bodyTitle}>
                Verification Successful
              </Text>
              <Image style={styles.image}
                resizeMode='contain'
                source={require('@assets/images/email4.png')}
              />
              <Text style={styles.desc}>
                Your mail has been successfully{`\n`} confirmed
              </Text>
            </View>

            <View style={styles.bodyBottom}>

              <Button
                style={styles.confirmButton}
                text='Restaurant Weeks'
                onPress={() => {
                  navigation.navigate('RestaurantWeeks')

                  // navigation.reset({
                  //   index: 0,
                  //   routes: [{ name: 'QRScannerStackScreen' }],
                  // });
                }}
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
  bodyTitle: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 24, color: '#121212' },
  desc: { marginTop: 30, fontFamily: 'Montserrat', fontWeight: '400', color: '#7A7A7A', fontSize: 16, textAlign: 'center', lineHeight: 27 },
  image: { width: 81, height: 81, marginTop: 40 },
  confirmButton: { marginTop: 27, marginBottom: 50 },
  sendAgainText: { color: '#F2A71D', fontFamily: 'Montserrat', fontWeight: '600', fontSize: 14 },
  sendAgain: { alignItems: 'center', marginTop: 40 },
})