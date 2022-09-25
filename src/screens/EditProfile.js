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
import { Header, Text, Button, SuccessfullyReceivedPointsModal, StatusBar, Input, ConfirmDeleteProfileModal, UploadPhotoModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import { logout } from '@redux/actions/userActions'
import AlertAsync from 'react-native-alert-async'
import helper from '@services/helper'
import { CommonActions } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { setUserAction } from '@redux/actions/userActions'
import { check, PERMISSIONS, RESULTS, request, openSettings, checkNotifications } from 'react-native-permissions'
const isIos = Platform.OS === 'ios' ? true : false

export default function EditProfile({ route, navigation }) {
  const dispatch = useDispatch()
  const [visibleConfirmDeleteProfileModal, setVisibleConfirmDeleteProfileModal] = useState(false)
  const [visibleUploadPhotoModal, setVisibleUploadPhotoModal] = useState(false)

  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const [visibleSuccessModal, setVisibleSuccessModal] = useState(false)
  const [receivedPoints, setReceivedPoints] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)

  const [uploadAvatar, setUploadAvatar] = useState(null)

  let avatarSource = user?.avatar ? { uri: user?.avatar } : require('@assets/images/no_avatar.png')
  if (uploadAvatar) {
    avatarSource = { uri: uploadAvatar.uri }
  }

  useEffect( () => {
    getProfile()
  }, []);

  const getProfile = async () => {
    try {
      const data = await mainApi.getProfile({
        user_id: user?.userId,
        token,
      })
      setFirstName(data?.first_name)
      setLastName(data?.last_name)
    } catch (e) {
      console.log(e.message)
    }
  }

  const onDeleteProfile = async () => {
    try {
      setVisibleConfirmDeleteProfileModal(false)
      await helper.sleep(300)
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.removeAccount({
        user_id: user?.userId,
        token,
      })
      dispatch(loaderAction({ isLoading: false }))
      if (res.state === 'success') {
        await AlertAsync('Your profile has been successfully deleted!')
        dispatch(logout())
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
        navigation.dispatch(resetAction);
      } else {
        await AlertAsync('Error', res?.reason || 'Something went wrond')
      }

    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
      console.log(e.message)
    }
  }

  const onGallery = async () => {
    try {
      const options = {
        title: 'Image Picker',
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        quality: 0.5,
      };
      setVisibleUploadPhotoModal(false)
      await helper.sleep(400)
      const result = await launchImageLibrary(options)
      console.log('result', result)
      setUploadAvatar(result.assets[0])

    } catch (e) {
      console.log(e.message)
    }
  }

  const onCamera = async () => {
    const permission = isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    request(permission).then(async (result) => {
      try {
        const options = {
          title: 'Image Picker',
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          quality: 0.5,
        };
        setVisibleUploadPhotoModal(false)
        await helper.sleep(400)
        const result = await launchCamera(options)
        console.log('result', result)
        setUploadAvatar(result.assets[0])

      } catch (e) {
        console.log(e.message)
      }
    });

  }


  const onSave = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.updateAccount({
        user_id: user?.userId,
        token,
        first_name: firstName,
        last_name: lastName,
        file: uploadAvatar
      })
      dispatch(loaderAction({ isLoading: false }))
      console.log('resres', res)
      if (res?.id) {
        dispatch(setUserAction({ ...user, ...res }))
        navigation.goBack()
      } else {
        AlertAsync(res.message || 'Something went wrond')
      }
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
      console.log(e.message)
    }
  }

  const onDeletePhoto = async () => {
    setUploadAvatar(null)
  }



  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Edit Profile'}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
        goBack={navigation.goBack}
      />

      <SuccessfullyReceivedPointsModal
        isVisible={visibleSuccessModal}
        day={{ points: receivedPoints }}
        onClose={() => setVisibleSuccessModal(false)}
      />

      <ConfirmDeleteProfileModal
        isVisible={visibleConfirmDeleteProfileModal}
        onOk={onDeleteProfile}
        onClose={() => setVisibleConfirmDeleteProfileModal(false)}
      />

      <UploadPhotoModal
        isVisible={visibleUploadPhotoModal}
        onDeletePhoto={onDeletePhoto}
        onClose={() => setVisibleUploadPhotoModal(false)}
        onGallery={onGallery}
        onCamera={onCamera}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.content}>

            <TouchableOpacity
              onPress={() => setVisibleUploadPhotoModal(true)}
              style={styles.editImageWrap}
            >
              <Image style={styles.image} resizeMode='cover' source={avatarSource} />
              <View style={styles.editButton}>
                <View style={styles.editButtonWrap}>
                  <Image style={styles.editIcon} resizeMode='contain' source={require('@assets/icons/upload.png')} />
                  <Text style={styles.editText}>Edit Profile Photo</Text>
                </View>
              </View>
            </TouchableOpacity>


            <Input
              field='First name'
              onChangeText={text => setFirstName(text)}
              value={firstName}
              autoCapitalize="none"
              style={{ marginBottom: 24 }}
            />

            <Input
              field='Last name'
              onChangeText={text => setLastName(text)}
              value={lastName}
              autoCapitalize="none"
              style={{ marginBottom: 24 }}
            />

            {/* <Input
              field='Email'
              onChangeText={text => setEmail(text)}
              value={email}
              autoCapitalize="none"
              style={{ marginBottom: 24 }}
            /> */}


            <Button
              style={{ marginTop: 30 }}
              text='Save Changes'
              onPress={onSave}
            />

            <Button
              style={{ marginTop: 15, marginBottom: 20, backgroundColor: '#fff', borderColor: '#fff' }}
              textStyle={{ color: '#D91F26' }}
              text='Delete Profile'
              onPress={() => setVisibleConfirmDeleteProfileModal(true)}
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
  image: { width: 112, height: 112, borderRadius: 56 },
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
  editButton: { justifyContent: 'center', alignItems: 'center', marginLeft: 28 },
  editButtonWrap: { flexDirection: 'row', alignItems: 'center' },
  editIcon: { width: 16, height: 14 },
  editText: { color: '#F2A71D', fontWeight: '700', fontSize: 15, marginLeft: 11 },
  editImageWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginTop: 25, marginBottom: 34 },
})