import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Text, StatusBar, } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setTokenAction, setUserAction } from '@redux/actions/userActions'

export default function Login({ navigation }) {


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Rewards'
        goBack={() => navigation.navigate('RestaurantsStackScreen')}
        navigation={navigation}
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>

            <View style={{ marginTop: 29, alignItems: 'center' }}>
              <Text style={styles.title2}>
                Rewards not available
              </Text>
              <Image style={styles.image2} resizeMode='contain' source={require('@assets/images/rew2.png')} />
            </View>



            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={styles.title}>
                Log in to get rewards page
              </Text>
            </View>

            <Text style={styles.text}>
              Welcome to the Restaurant Week Award Points Program.
              {`\n\n`}
              Participating in the multitude of restaurant Week events and collecting points through your participation enables you to be included in numerous drawings for free gifts and to receive special offers and discounts from our sponsors.
              {`\n\n`}
              However, to participate, you must first register your app and Log-in to open this feature.
              {`\n\n`}
              We look forward to seeing you start collecting points and winning awards soon!
              {`\n`}
            </Text>

            <TouchableOpacity>
              <Text style={styles.visitWeb}>Visit website</Text>
            </TouchableOpacity>


            <View style={styles.bodyBottom}>


              <Button
                text='Log in'
              // onPress={login}
              />

              <View style={styles.orWrap}>
                <View style={{ backgroundColor: '#B7B7B7', height: 1, width: '30%' }} />
                <Text style={styles.or}>Or sign up with</Text>
                <View style={{ backgroundColor: '#B7B7B7', height: 1, width: '30%' }} />
              </View>

              <View style={{ marginTop: 19, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Button
                  text='Facebook'
                  inverter
                  // onPress={() => navigation.navigate('Login')}
                  color='#1377FB'
                  style={{ width: '48%' }}
                  leftComponent={<Image style={{ width: 18, height: 18, marginRight: 8 }} resizeMode='contain' source={require('@assets/icons/facebook.png')} />}
                />
                <Button
                  text='Email'
                  inverter
                  // onPress={() => navigation.navigate('Login')}
                  style={{ width: '48%' }}
                  leftComponent={<Image style={{ width: 18, height: 18, marginRight: 8 }} resizeMode='contain' source={require('@assets/icons/email.png')} />}
                />
              </View>

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
  body: { justifyContent: 'space-between', marginHorizontal: 17, flex: 1 },
  bodyTop: { marginTop: 46, alignItems: 'center' },
  bodyBottom: { marginTop: 34, width: '100%' },
  bodyTitle: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 24, color: '#121212' },
  image: { width: 56, height: 84, marginTop: 42 },
  forgot: { color: '#378BED', fontFamily: 'Montserrat', fontWeight: '600', fontSize: 14 },
  orWrap: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 19 },
  or: { color: '#B7B7B7', fontFamily: 'Montserrat', fontWeight: '600', fontSize: 14 },
  forgotWrap: { alignItems: 'center', marginTop: 10 },
  agree: { color: '#7A7A7A', fontFamily: 'Montserrat', fontWeight: '600', fontSize: 12, marginLeft: 8 },
  agreeWrap: { marginTop: 21, flexDirection: 'row', alignItems: 'center' },
  signup: { marginTop: 35, marginBottom: 50 },
  checkboxIcon: { width: 18, height: 18 },


  image: { width: 60, height: 60, marginBottom: 15 },
  title: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24 },
  title2: { fontFamily: 'Montserrat', color: '#F2A71D', fontWeight: '400', fontSize: 16 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
  visitWeb: { fontFamily: 'Montserrat', color: '#378BED', fontWeight: '600', fontSize: 15 },
  image2: { width: 217, height: 201, marginTop: 8 },
})