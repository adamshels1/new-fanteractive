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
import { Header, StatusBar, Text, Button, FilterModal, Input2, CountriesModal, MultiSelectModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import { logout } from '@redux/actions/userActions'
import { CommonActions } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker'
import AlertAsync from 'react-native-alert-async'
import helper from '@services/helper'

export default function Interests({ route, navigation }) {
  const dispatch = useDispatch()
  const [visibleFilterModal, setVisibleFilterModal] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  console.log('user', user)


  const [countries, setCountries] = useState([])
  const [countriesVisible, setCountriesVisible] = useState(false)
  const [avatarFile, setAvatarFile] = useState({
    path: user?.thumbnail?.url
  })
  const [state, setState] = useState(user?.state)
  const [postcode, setPostcode] = useState(user?.post_code)
  const [city, setCity] = useState(user?.city)
  const [street, setStreet] = useState(user?.address)
  const [deleteThumbnail, setDeleteThumbnail] = useState(false)
  const [username, setUsername] = useState(user?.username)
  const [fullName, setFullName] = useState(user?.full_name)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number)


  const [teams, setTeams] = useState(user?.favorite_teams.map(i => {
    return {
      ...i,
      selected: true
    }
  }))
  const [visibleTeamsModal, setVisibleTeamsModal] = useState(false)
  const [searchTeamValue, setSearchTeamValue] = useState('')
  const [aboutMe, setAboutMe] = useState(user?.about)

  const [sports, setSports] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [visibleSportsModal, setVisibleSportsModal] = useState(false)

  
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

  const onSelectCountry = item => {
    setSelectedCountry(item)
    setCountriesVisible(false)
  }


  const onRemoveAvatar = () => {
    setAvatarFile(null)
    setDeleteThumbnail(true)
  }



  useEffect(() => {
    getTeams()
    getSports()
  }, []);

  const getTeams = async (searchValue) => {
    try {
      const res = await mainApi.getTeams(token, { searchValue })
      console.log(res.data.data)
      setTeams(res.data.data)
    } catch (e) {
      console.log('e', e)
    }
  }


  const getSports = async () => {
    try {
      const res = await mainApi.getSports(token)
      console.log(res.data.data)
      const sports = res.data.data.map(i => {
        console.log('aaa', user)
        const found = user?.favorite_sports.find(f => f.id === i.id)
        return {
          ...i,
          selected: Boolean(found)
        }
      })
      console.log('sports', sports)
      setSports(sports)
    } catch (e) {
      console.log('e', e)
    }
  }


  const onSave = async () => {

    const sportIds = sports.filter(i => i.selected).map(i => i.id)
    const teamIds = teams.filter(i => i.selected).map(i => i.id)

    console.log({
      sportIds,
      teamIds,
      aboutMe,
    })
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.saveInterests(token, {
        sportIds,
        teamIds,
        aboutMe,
      });
      console.log('resresresres', res)
      dispatch(loaderAction({ isLoading: false }))
      navigation.goBack()
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
    }
  }

  const onSelectSport = item => {
    setSports(sports.map(i => {
      return {
        ...i,
        selected: item.id === i.id ? !i.selected : i.selected
      }
    }))
  }

  const onSelectTeam = item => {
    setTeams(teams.map(i => {
      return {
        ...i,
        selected: item.id === i.id ? !i.selected : i.selected
      }
    }))
  }

  const onChangeSearchText = text => {
    setSearchTeamValue(text)
    getTeams(text)
  }

  console.log('teams', teams)
  let teamsLine = teams.filter(i => i.selected).map(i => i.name)
  teamsLine = teamsLine.length ? teamsLine.join('; ') : null

  let sportsLine = sports.filter(i => i.selected).map(i => i.name)
  sportsLine = sportsLine.length ? sportsLine.join('; ') : null


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


      <MultiSelectModal
        title='Select Sport'
        isVisible={visibleSportsModal}
        onClose={() => setVisibleSportsModal(false)}
        onSelect={onSelectSport}
        data={sports}
      />

      <MultiSelectModal
        title='Select Team'
        isVisible={visibleTeamsModal}
        onClose={() => setVisibleTeamsModal(false)}
        onSelect={onSelectTeam}
        data={teams}
        showSearch={true}
        searchValue={searchTeamValue}
        onChangeSearchText={onChangeSearchText}
      />


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>

          <View style={{ paddingVertical: 27, paddingHorizontal: 20, flex: 1 }}>


            <Text style={{ fontSize: 22, fontWeight: '500', color: '#00293B' }}>
              Knowledge/Interest
            </Text>

            <View style={{ marginTop: 19 }}>


              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setVisibleSportsModal(true)}
              >
                <View style={styles.inputButtonField}>
                  <Text style={styles.inputButtonFieldText}>
                    Your Sport Rating
                  </Text>
                </View>
                <Text style={styles.inputButtonText} numberOfLines={1}>
                  {sportsLine ? sportsLine : 'Select Sports'}
                </Text>
                <Image source={require('@assets/icons/right.png')} resizeMode='contain' style={{ width: 12.14, height: 17.7 }} />
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setVisibleTeamsModal(true)}
              >
                <View style={styles.inputButtonField}>
                  <Text style={styles.inputButtonFieldText}>
                    Favorite Team
                  </Text>
                </View>
                <Text style={styles.inputButtonText} numberOfLines={1}>
                  {teamsLine ? teamsLine : 'Select Teams'}
                </Text>
                <Image source={require('@assets/icons/right.png')} resizeMode='contain' style={{ width: 12.14, height: 17.7 }} />
              </TouchableOpacity>



              <Input2
                field='About You / Your Short Bio '
                onChangeText={setAboutMe}
                value={aboutMe}
                multiline={true}
                style={{ height: 164, textAlignVertical: 'top' }}
                maxLength={180}
                showMaxLength
              />


              <Button
                text='Save Changes'
                style={{ marginTop: 17 }}
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