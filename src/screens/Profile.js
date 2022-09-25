import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Clipboard
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Text, Button, SuccessfullyReceivedPointsModal, StatusBar } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import AlertAsync from 'react-native-alert-async'

export default function Profile({ route, navigation }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const avatarSource = user?.avatar ? { uri: user?.avatar } : require('@assets/images/no_avatar.png');
  const [profile, setProfile] = useState(null)
  const [referralCode, setReferralCode] = useState(null)
  const [visibleSuccessModal, setVisibleSuccessModal] = useState(false)
  const [receivedPoints, setReceivedPoints] = useState(null)


  useEffect(() => {
    getProfile()
  }, []);

  const getProfile = async () => {
    try {
      const data = await mainApi.getProfile({
        user_id: user?.userId,
        token,
      })
      setProfile(data)
    } catch (e) {
      console.log(e.message)
    }
  }

  const acceptReferralCode = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.acceptReferralCode({
        user_id: user?.userId,
        token,
        referral_code: referralCode
      })
      dispatch(loaderAction({ isLoading: false }))
      if (res?.referal_points) {
        setReferralCode('')
        setReceivedPoints(res?.referal_points)
        setVisibleSuccessModal(true)
        await getProfile()
      } else {
        AlertAsync(res.reason || 'Something went wrond')
      }
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
      console.log(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Profile'}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
      />

      <SuccessfullyReceivedPointsModal
        isVisible={visibleSuccessModal}
        day={{ points: receivedPoints }}
        onClose={() => setVisibleSuccessModal(false)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.content}>

            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.editButton}
            >
              <View style={styles.editButtonWrap}>
                <Image style={styles.editIcon} resizeMode='contain' source={require('@assets/icons/draw.png')} />
                <Text style={styles.editText}>Edit</Text>
              </View>
            </TouchableOpacity>

            <Image style={styles.image} resizeMode='contain' source={avatarSource} />
            <Text style={styles.name}>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text style={styles.email}>
              {user?.email}
            </Text>
            <Text style={styles.pointsLabel}>TOTAL POINTS:</Text>
            <Text style={styles.points}>
              {profile?.points?.total}
            </Text>

            <Text style={styles.text2}>
              Share your Referral Code with your friend and each of you will earn 15 points.
            </Text>

            <View style={styles.wrapRefferal}>
              <Text style={styles.field}>Your Referral Code</Text>

              <Text style={styles.inputText}>
                {profile?.referral}
              </Text>

              <TouchableOpacity
                onPress={() => Clipboard.setString(profile?.referral)}
                style={styles.buttonCopy}
              >
                <Text style={styles.buttonText}>Copy</Text>
              </TouchableOpacity>

            </View>



            <Text style={styles.text2}>
              Submit your friend’s code and get more points!
            </Text>

            <View style={styles.wrapRefferal}>
              <Text style={styles.field}>Your Friend’s Referral Code</Text>

              <TextInput
                placeholder='Enter Code Here'
                style={styles.inputText}
                value={referralCode}
                onChangeText={text => setReferralCode(text)}
                maxLength={8}
              />

              <TouchableOpacity
                onPress={acceptReferralCode}
                style={styles.buttonSubmit}>
                <Text style={styles.buttonText}>
                  Submit
                </Text>
              </TouchableOpacity>

            </View>


            <Button
              style={{ marginTop: 30, marginBottom: 20 }}
              text='Go to Rewards Dashboard'
              onPress={() => navigation.navigate('RewardsDashboardStackScreen')}
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
  content: { paddingHorizontal: 17, alignItems: 'center' },
  image: { width: 158, height: 158, borderRadius: 79, marginTop: 18 },
  name: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24, marginTop: 18 },
  email: { fontFamily: 'Montserrat', color: '#7A7A7A', fontWeight: '400', fontSize: 16, marginTop: 7 },
  text2: { fontFamily: 'Montserrat', color: '#7A7A7A', fontWeight: '400', fontSize: 16, marginTop: 31 },
  pointsLabel: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 15, marginTop: 18 },
  points: { fontFamily: 'Montserrat', color: '#F2A71D', fontWeight: '700', fontSize: 34, marginTop: 6 },
  wrapRefferal: { width: 341, height: 55, borderWidth: 1, borderColor: '#B7B7B7', borderRadius: 5, marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  field: { fontWeight: '400', fontSize: 14, color: '#7A7A7A', position: 'absolute', top: -10, left: 15, backgroundColor: '#fff', textAlign: 'center', paddingHorizontal: 3 },
  buttonText: { fontWeight: '700', fontSize: 15, color: '#F2A71D' },
  buttonSubmit: { height: 55, width: 105, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#F2A71D', marginRight: -1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  buttonCopy: { height: 55, width: 105, justifyContent: 'center', alignItems: 'center' },
  inputText: { fontWeight: '400', fontSize: 14, color: '#121212', marginLeft: 18 },
  editButton: { position: 'absolute', right: 13, top: 16, height: 30, width: 70, justifyContent: 'center', alignItems: 'center' },
  editButtonWrap: { flexDirection: 'row', alignItems: 'center' },
  editIcon: { width: 13, height: 13 },
  editText: { color: '#F2A71D', fontWeight: '700', fontSize: 15, marginLeft: 7 },
})