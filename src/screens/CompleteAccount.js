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
  ImageBackground
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Input, StatusBar, Text, CountriesModal } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setTokenAction, setUserAction } from '@redux/actions/userActions'
import LookupModal from 'react-native-lookup-modal'
import ImagePicker from 'react-native-image-crop-picker';

export default function CompleteAccount({ navigation }) {
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [postcode, setPostcode] = useState('')

  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countriesVisible, setCountriesVisible] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const token = useSelector(state => state.userReducer.token)



  useEffect(() => {
    getCountries()
  }, []);

  const getCountries = async () => {
    try {
      const res = await mainApi.getCountries(token)
      const countries = Object.entries(res.data).map(i => {
        return {
          code: i[0],
          name: i[1]
        }
      })
      console.log(countries)
      setCountries(countries)
    } catch (e) {
      console.log('e', e)
    }
  }

  const onCountinue = async () => {
    console.log({
      fullName,
      phone,
      postcode,
      state,
      city,
      street,
      selectedCountry
    })
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.singUpMainInformation(token, {
        fullName,
        phone,
        postcode,
        state,
        city,
        street,
        selectedCountry
      });
      if (avatarFile) {
        await mainApi.uploadAvatar(token, { file: avatarFile })
      }
      dispatch(loaderAction({ isLoading: false }))
      if (res.status === 200) {
        navigation.navigate('CompleteAccount_2')
      } else {
        AlertAsync(res.reason || 'Something went wrond')
      }
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
    }
  }

  const onSelectCountry = item => {
    setSelectedCountry(item)
    setCountriesVisible(false)
  }

  const uploadAvatar = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropperCircleOverlay: true,
        cropping: true
      }).then(image => {
        setAvatarFile(image);
        console.log(image);
      })
    } catch (e) {
      console.log(e)
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

      <CountriesModal
        isVisible={countriesVisible}
        onClose={() => setCountriesVisible(false)}
        onSelect={onSelectCountry}
        countries={countries}
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={styles.body}>
            <Text style={styles.desc}>
              Thank you for Signing Up
            </Text>
            <Text style={styles.bodyTitle}>
              Comlete your Account
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 }}>
              <View style={styles.stepWrap}>
                <Image style={styles.stepIcon} source={require('@assets/icons/oval-green.png')} />
                <Text style={styles.stepText}>Main Information</Text>
              </View>

              <View style={styles.stepWrap}>
                <Image style={styles.stepIcon} source={require('@assets/icons/oval-green.png')} />
                <Text style={styles.stepText}>Introduce Yourself</Text>
              </View>

              <View style={styles.stepWrap}>
                <Image style={styles.stepIcon} source={require('@assets/icons/oval-white.png')} />
                <Text style={styles.stepText}>Complete</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.setProfileWrap} onPress={uploadAvatar}>
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={avatarFile?.path ? { uri: avatarFile.path } : require('@assets/icons/user.png')}
              />
              <Text style={styles.setProfileText}>Set Profile Image</Text>
            </TouchableOpacity>

            <View style={styles.bodyBottom}>
              <Input
                placeholder='Full Name'
                onChangeText={fullName => setFullName(fullName)}
                value={fullName}
                autoCapitalize="none"
                style={{ marginBottom: 10 }}
              />

              <Input
                placeholder='Phone Number'
                onChangeText={phone => setPhone(phone)}
                value={phone}
                autoCapitalize="none"
                style={{ marginBottom: 10 }}
                phone
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={() => setCountriesVisible(true)}
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 30, width: '47%', marginTop: 20, borderBottomWidth: 2, borderColor: '#5EC422', }}
                >
                  <Text style={{ fontWeight: '400', fontSize: 16, color: '#CBCBCB' }}>
                    {selectedCountry ? selectedCountry?.name : 'Country'}
                  </Text>

                  {/* <LookupModal
                    contentStyle={styles.lookumContentStyle}
                    selectButtonTextStyle={{ fontWeight: '400', fontSize: 16, color: '#CBCBCB', lineHeight: 20, height: 25, width: 150 }}
                    data={countries}
                    // value={city}
                    // onSelect={onCity}
                    displayKey={"name"}
                    selectText='Please select'
                    itemStyle={styles.lookumItemStyle}
                    itemTextStyle={styles.lookumItemTextStyle}
                  /> */}
                  <Image style={{ width: 18, height: 10, marginRight: 10 }} source={require('@assets/icons/arrow-right.png')} />
                </TouchableOpacity>





                <Input
                  onChangeText={postcode => setPostcode(postcode)}
                  value={postcode}
                  autoCapitalize="none"
                  wrapStyle={{ marginBottom: 10, width: '47%', }}
                  placeholder='Zip / Postal Code'
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Input
                  onChangeText={state => setState(state)}
                  value={state}
                  autoCapitalize="none"
                  wrapStyle={{ marginBottom: 10, width: '47%', }}
                  placeholder='State'
                />
                <Input
                  onChangeText={city => setCity(city)}
                  value={city}
                  autoCapitalize="none"
                  wrapStyle={{ marginBottom: 10, width: '47%', }}
                  placeholder='City'
                />
              </View>

              <Input
                onChangeText={street => setStreet(street)}
                value={street}
                autoCapitalize="none"
                style={{ marginBottom: 10 }}
                placeholder='Address'
              />


              <Button
                style={{ marginTop: 26, marginBottom: 30 }}
                text='Continue'
                onPress={onCountinue}
              />


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
  forgot: { color: '#5EC422', fontFamily: 'Avenir', fontWeight: '800', fontSize: 18 },
  or: { color: '#B7B7B7', fontFamily: 'Avenir', fontWeight: '400', fontSize: 16 },
  image: { width: 56, height: 84, marginTop: 42 },
  agree: { color: '#CBCBCB', fontSize: 14, fontWeight: '400', },
  agreeWrap: { marginTop: 21, flexDirection: 'row', alignItems: 'center' },
  signup: { marginTop: 35, marginBottom: 50 },
  checkboxIcon: { width: 15, height: 15 },

  logo: {
    width: 234,
    height: 51
  },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 32, color: '#FFFFFF' },
  rememberBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 19 },
  rememberWrap: { flexDirection: 'row', alignItems: 'center' },
  remember: { color: '#CBCBCB', fontSize: 16, fontWeight: '400', marginLeft: 7 },
  orLineWrap: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 15 },
  orLine: { backgroundColor: '#B7B7B7', height: 1, width: '40%' },
  buttonsWrap: { marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  bottomText: { fontWeight: '800', fontSize: 14, color: '#fff', textAlign: 'center' },

  desc: { marginTop: 41, fontFamily: 'Avenir', fontWeight: '800', color: '#FFFFFF', fontSize: 18, lineHeight: 27 },
  stepWrap: { alignItems: 'center', width: 82 },
  stepText: { fontFamily: 'Avenir', fontWeight: '800', color: '#FFFFFF', marginTop: 11, fontSize: 10 },
  stepIcon: { width: 21.67, height: 21.67 },
  setProfileWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 70 },
  setProfileText: { fontWeight: '800', fontSize: 12, color: '#5FC521', marginLeft: 12 },

  lookumItemStyle: { borderBottomWidth: 1, borderBottomColor: '#DCDCDC', height: 49, justifyContent: 'center' },
  lookumItemTextStyle: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14 },
  lookumContentStyle: { height: '80%', borderRadius: 12 },
  cityButtonText: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 14, color: '#747272' },
})