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
import { Header, Button, Input, StatusBar, Text, MultiSelectModal } from '@components'
import { mainApi } from '@api'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setTokenAction, setUserAction } from '@redux/actions/userActions'
import LookupModal from 'react-native-lookup-modal'
import ImagePicker from 'react-native-image-crop-picker';

export default function Login({ navigation }) {
  const dispatch = useDispatch()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [postcode, setPostcode] = useState('')

  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')

  const [teams, setTeams] = useState([])
  const [visibleTeamsModal, setVisibleTeamsModal] = useState(false)
  const [searchTeamValue, setSearchTeamValue] = useState('')
  const [aboutMe, setAboutMe] = useState('')

  const [sports, setSports] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [visibleSportsModal, setVisibleSportsModal] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const token = useSelector(state => state.userReducer.token)



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
      setSports(res.data.data)
    } catch (e) {
      console.log('e', e)
    }
  }


  const onCountinue = async () => {

    const sportIds = sports.filter(i => i.selected).map(i => i.id)
    const teamIds = teams.filter(i => i.selected).map(i => i.id)

    console.log({
      sportIds,
      teamIds,
      aboutMe,
    })
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.singUpIntroduceYourself(token, {
        sportIds,
        teamIds,
        aboutMe,
      });
      console.log('resresresres', res)
      dispatch(loaderAction({ isLoading: false }))
      if (res.status === 200) {
        navigation.navigate('HomeTabs')
      } else {
        AlertAsync(res.reason || 'Something went wrond')
      }
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
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

  let teamsLine = teams.filter(i => i.selected).map(i => i.name)
  teamsLine = teamsLine.length ? teamsLine.join('; ') : null

  let sportsLine = sports.filter(i => i.selected).map(i => i.name)
  sportsLine = sportsLine.length ? sportsLine.join('; ') : null

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


            <View style={styles.bodyBottom}>


              <View style={styles.selectWrap}>
                <TouchableOpacity
                  onPress={() => setVisibleSportsModal(true)}
                  style={styles.selectButton}
                >
                  <Text style={styles.selectText}>
                    {sportsLine ? sportsLine : 'Your Sport Rating'}
                  </Text>
                  <Image style={styles.selectIcon} source={require('@assets/icons/arrow-right.png')} />
                </TouchableOpacity>
              </View>


              <View style={styles.selectWrap}>
                <TouchableOpacity
                  onPress={() => setVisibleTeamsModal(true)}
                  style={styles.selectButton}
                >
                  <Text style={styles.selectText}>
                    {teamsLine ? teamsLine : 'Favorite Teams'}
                  </Text>
                  <Image style={styles.selectIcon} source={require('@assets/icons/arrow-right.png')} />
                </TouchableOpacity>
              </View>


              <Input
                placeholder='About Me'
                onChangeText={aboutMe => setAboutMe(aboutMe)}
                value={aboutMe}
                autoCapitalize="none"
                style={{ marginBottom: 10, height: 100 }}
                multiline
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

  selectWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  selectButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 30, width: '100%', marginTop: 20, borderBottomWidth: 2, borderColor: '#D6D6D6', },
  selectText: { fontWeight: '400', fontSize: 16, color: '#CBCBCB' },
  selectIcon: { width: 18, height: 10, marginRight: 10 },
})