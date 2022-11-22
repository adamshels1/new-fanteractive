import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, Button, FilterModal, Input2, CountriesModal, StatesModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import { logout } from '@redux/actions/userActions'
import { CommonActions } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker'
import AlertAsync from 'react-native-alert-async'
import helper from '@services/helper'

export default function MyStadiumReport({ route, navigation }) {
  const dispatch = useDispatch()
  const [visibleFilterModal, setVisibleFilterModal] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)


  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countriesVisible, setCountriesVisible] = useState(false)
  const [avatarFile, setAvatarFile] = useState({
    path: user?.thumbnail?.url
  })

  const [statesVisible, setStatesVisible] = useState(false)
  const [state, setState] = useState(user?.state)
  const [states, setStates] = useState([])

  const [postcode, setPostcode] = useState(user?.post_code)
  const [city, setCity] = useState(user?.city)
  const [street, setStreet] = useState(user?.address)
  const [deleteThumbnail, setDeleteThumbnail] = useState(false)
  const [username, setUsername] = useState(user?.username)
  const [fullName, setFullName] = useState(user?.full_name)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number)

  useEffect(() => {
    getCountries()
    getStates({ code: 'USA' })
  }, []);

  const getCountries = async () => {
    try {
      const res = await mainApi.getCountries(token)
      let countries = Object.entries(res.data).map(i => {
        return {
          code: i[0],
          name: i[1]
        }
      })
      countries = [countries.find(i => i.code === 'USA'), ...countries.filter(i => i.code !== 'USA')]
      console.log(countries)
      setCountries(countries)
    } catch (e) {
      console.log('e', e)
    }
  }


  const onLogout = () => {
    dispatch(logout())
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
    navigation.dispatch(resetAction);
  }


  const uploadAvatar = () => {
    try {
      setDeleteThumbnail(false)
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

  const getStates = async (country) => {
    if (country?.code === 'USA') {
      const res = await mainApi.getStates(1)
      console.log(res.data.data)
      setStates(res.data.data)
    } else {
      setStates([])
    }
  }

  const onSelectCountry = async item => {
    try {
      setSelectedCountry(item)
      setCountriesVisible(false)
      getStates(item)
    } catch (e) {
      console.log('e', e)
    }
  }

  const onSelectState = async item => {
    setState(item)
    setStatesVisible(false)
    console.log('item', item)
  }


  const onSave = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.editUser(token, {
        city,
        country: selectedCountry?.code,
        delete_thumbnail: deleteThumbnail,
        postcode,
        state: state?.code,
        street,
      });
      if (avatarFile?.mime) {
        await mainApi.uploadAvatar(token, { file: avatarFile })
      }
      dispatch(loaderAction({ isLoading: false }))
      props.navigation.goBack()
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }


  const onRemoveAvatar = () => {
    setAvatarFile(null)
    setDeleteThumbnail(true)
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        goBack={navigation.goBack}
        showFilter
        navigation={navigation}
        onFilter={() => setVisibleFilterModal(true)}
      />

      <FilterModal
        isVisible={visibleFilterModal}
        onClose={() => setVisibleFilterModal(false)}
      />

      <CountriesModal
        isVisible={countriesVisible}
        onClose={() => setCountriesVisible(false)}
        onSelect={onSelectCountry}
        countries={countries}
      />

      <StatesModal
        isVisible={statesVisible}
        onClose={() => setStatesVisible(false)}
        onSelect={onSelectState}
        countries={states}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={{ paddingVertical: 27, paddingHorizontal: 20, flex: 1 }}>


            <Text style={{ fontSize: 22, fontWeight: '500', color: '#00293B' }}>
              Basic info
            </Text>

            <View style={{ marginTop: 19 }}>
              <Text style={{ fontSize: 12, fontWeight: '900', color: '#00293B' }}>
                Avatar
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 14 }}>

                <Image
                  style={{ width: 67, height: 67, borderRadius: 33.5 }}
                  source={avatarFile?.path ? { uri: avatarFile.path } : require('@assets/icons/user.png')}
                />

                <Button
                  style={{ width: 88, height: 40, borderRadius: 3, marginLeft: 16 }}
                  textStyle={{ fontSize: 16, textTransform: 'none' }}
                  text='Upload'
                  onPress={uploadAvatar}
                />

                <Button
                  style={{ width: 88, height: 40, borderRadius: 3, marginLeft: 9 }}
                  textStyle={{ fontSize: 16, color: '#D0021B', textTransform: 'none' }}
                  text='Remove'
                  inverter
                  color='#D0021B'
                  onPress={onRemoveAvatar}
                />

              </View>


              <Input2
                field='Username'
                onChangeText={setUsername}
                value={username}
              />

              <Input2
                field='Full Name'
                onChangeText={setFullName}
                value={fullName}
              />

              <Text style={{
                color: '#00293B', fontSize: 22, marginTop: 36, fontWeight: '500'
              }}>
                Contact Info
              </Text>

              <Input2
                field='Phone Number'
                phone
                onChangeText={setPhoneNumber}
                value={phoneNumber}
              />


              {/* <Input2
                field='Email'
              // onChangeText={text => setEventName(text)}
              // value={eventName}
              /> */}


              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setCountriesVisible(true)}
              >
                <View style={styles.inputButtonField}>
                  <Text style={styles.inputButtonFieldText}>
                    Country
                  </Text>
                </View>
                <Text style={styles.inputButtonText}>
                  {selectedCountry ? selectedCountry?.name : 'Country'}
                </Text>
                <Image source={require('@assets/icons/right.png')} resizeMode='center' style={{ width: 12.14, height: 17.7 }} />
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setStatesVisible(true)}
              >
                <View style={styles.inputButtonField}>
                  <Text style={styles.inputButtonFieldText}>
                    State
                  </Text>
                </View>
                <Text style={styles.inputButtonText}>
                  {state ? state?.name : 'State'}
                </Text>
                <Image source={require('@assets/icons/right.png')} resizeMode='center' style={{ width: 12.14, height: 17.7 }} />
              </TouchableOpacity>


              <Input2
                field='Zip / Postal Code'
                onChangeText={setPostcode}
                value={postcode}
                keyboardType="numeric"
                maxLength={5}
              />

              <Input2
                field='City'
                onChangeText={city}
                value={setCity}
              />

              <Input2
                field='Address'
                onChangeText={setStreet}
                value={street}
              />


              <Button
                text='Save Changes'
                style={{ marginTop: 17, marginBottom: 100 }}
                textStyle={{ fontFamily: 'Oswald' }}
                onPress={onSave}
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
  filterItem: { flexDirection: 'row', alignItems: 'center' },
  filterText: { fontWeight: '900', fontSize: 12, color: '#00293B' },
  filterIcon: { width: 7.53, height: 4.34, top: 1, marginLeft: 3.24 },
  filtersWrap: { height: 30, width: '100%', backgroundColor: '#EDF1F9', borderRadius: 3, paddingHorizontal: 11, flexDirection: 'row', justifyContent: 'space-between' },

  inputButton: { width: '100%', height: 50, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.32)', borderRadius: 4, marginTop: 23, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, flexDirection: 'row' },
  inputButtonField: { left: 16, top: -9, backgroundColor: '#fff', zIndex: 2, position: 'absolute' },
  inputButtonFieldText: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 12, color: '#00293B', paddingHorizontal: 5 },
  inputButtonText: { fontSize: 16, fontFamily: 'Avenir', color: '#00293B', fontWeight: '400' },
})