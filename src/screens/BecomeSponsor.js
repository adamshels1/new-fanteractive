import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Input, Button, StatusBar, Text } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import AlertAsync from 'react-native-alert-async'

export default function BecomeSponsor({ route, navigation }) {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState(null)
  const [companyName, setCompanyName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)

  const sendBecomeSponsor = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.sendBecomeSponsor({
        user_id: user?.userId,
        token,
        first_name: firstName,
        company_name: companyName,
        phone,
        email,
      })
      dispatch(loaderAction({ isLoading: false }))
      if (data?.state === 'Success') {
        setFirstName('')
        setCompanyName('')
        setEmail('')
        setPhone('')
        AlertAsync('The request has been sent successfully!')
        navigation.goBack()
      } else {
        AlertAsync(data.message || 'Something went wrond')
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
        title={'Sponsor'}
        // goBack={navigation.goBack}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={{ paddingVertical: 26, paddingHorizontal: 17 }}>

            <Image style={styles.image} resizeMode='contain' source={require('@assets/icons/deal.png')} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>
                Are you interested to {`\n`}become a sponsor?
              </Text>
            </View>

            <Text style={styles.text}>
              The Buford Business Alliance has cooked up an incredible recipe for supporting our local restaurant community – Buford Restaurant Week! The only missing ingredient to this inaugural epicurean event is YOU!
              {`\n\n`}
              We are currently seeking sponsors for this weeklong celebration of the culinary arts throughout the Buford community, and we hope you will join us.
              {`\n\n`}
              Not only is it a wonderful way to help this beloved segment of our local economy return to its former glory while benefiting a deserving nonprofit, but it’s a highly visible way to showcase your company’s dedication to community involvement.


            </Text>


            <Input
              field='First name'
              onChangeText={text => setFirstName(text)}
              value={firstName}
              autoCapitalize="none"
              wrapStyle={{ marginTop: 25 }}
              maxLength={100}
            />

            <Input
              field='Company Name'
              onChangeText={text => setCompanyName(text)}
              value={companyName}
              autoCapitalize="none"
              wrapStyle={{ marginTop: 20 }}
              maxLength={100}
            />

            <Input
              field='Email'
              onChangeText={text => setEmail(text)}
              value={email}
              autoCapitalize="none"
              wrapStyle={{ marginTop: 20 }}
              maxLength={100}
            />

            <Input
              field='Phone Number'
              onChangeText={text => setPhone(text)}
              value={phone}
              autoCapitalize="none"
              wrapStyle={{ marginTop: 20 }}
              phone
            />

            <Button
              disabled={!firstName || !companyName || !phone || !email}
              style={{ marginTop: 29 }}
              text='Submit'
              onPress={sendBecomeSponsor}
            />

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
  image: { width: 60, height: 60, marginBottom: 15 },
  title: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
})