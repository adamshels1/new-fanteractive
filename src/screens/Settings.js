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
  FlatList,
  Platform,
  AppState
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, ListItem, SwitchListItem, StatusBar, Text } from '@components'
import { mainApi } from '@api';
import { colors } from '@constants';
import { logout } from '@redux/actions/userActions'
// import messaging from '@react-native-firebase/messaging'
import { check, PERMISSIONS, RESULTS, request, openSettings, checkNotifications } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation'
const isIos = Platform.OS === 'ios' ? true : false;


export default function EditPermissions({ navigation }) {
  const dispatch = useDispatch()
  const [locationPermission, setLocationPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [notificationsPermission, setNotificationsPermission] = useState(false);
  const token = useSelector(state => state.userReducer.token)

  useEffect(()=>{
    const getData = async () => {
      checkLocationPermission()
      checkCameraPermission()
      // checkNotificationsPermission()
      const appStateListener = AppState.addEventListener(
        'change',
        nextAppState => {
          if (nextAppState === 'active') {
            checkLocationPermission()
            checkCameraPermission()
            // checkNotificationsPermission()
          }
        },
      );
      return () => {
        appStateListener?.remove();
      };
    }
    getData()
  }, []);

  const checkLocationPermission = (goOpenSettings = false) => {
    if (isIos) {
      Geolocation.getCurrentPosition(async (position) => {
        console.log(position)
        const { coords } = position;
        const { longitude, latitude } = coords;
        if (longitude) {
          setLocationPermission(true)
        }
      },
        async (error) => {
          // await AlertAsync('To get a location, you need permission, provide from in the settings');
          // Linking.openSettings();
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    } else {
      //THIS IS NOT WORK ON IOS
      const permission = isIos ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      check(permission)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              console.log('The permission has not been requested / is denied but requestable');
              break;
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:
              setLocationPermission(true)
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              if (goOpenSettings) {
                openSettings()
              }
              console.log('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {
          // …
        });
    }
  }

  const checkCameraPermission = (goOpenSettings) => {
    const permission = isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            setCameraPermission(true)
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            if (goOpenSettings) {
              openSettings()
            }
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  const checkNotificationsPermission = async (goOpenSettings) => {

    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      setNotificationsPermission(true)
      return true;
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
      setNotificationsPermission(true)
      return true;
    } else {
      console.log('User has notification permissions disabled');
      setNotificationsPermission(false)
      if (goOpenSettings) {
        openSettings()
      }
      return false;
    }
  }


  const switchLocationPermission = () => {
    if (isIos) {
      if (locationPermission) {
        openSettings()
        // setLocationPermission(false)
      } else {
        Geolocation.requestAuthorization().then((result => checkLocationPermission))
      }
    } else {
      //THIS IS NOT WORK ON IOS
      const permission = isIos ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      if (locationPermission) {
        openSettings()
        // setLocationPermission(false)
      } else {
        request(permission).then((result) => {
          console.log('result', result)
          checkLocationPermission(true)
        });
      }
    }
  }

  const switchCameraPermission = () => {
    const permission = isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    if (cameraPermission) {
      openSettings()
      // setCameraPermission(false)
    } else {
      request(permission).then((result) => {
        console.log('result', result)
        checkCameraPermission(true)
      });
    }
  }

  const switchNotificationsPermission = () => {
    if (notificationsPermission) {
      openSettings()
    } else {
      // checkNotificationsPermission(true)
    }
  }


  const onLogout = () => {
    dispatch(logout())
  }

  const rightComponent = () => {
    return <TouchableOpacity onPress={onLogout} style={{ height: 45, justifyContent: 'center' }}>
      <Text style={{ fontWeight: '400', fontFamily: 'Gotham Pro', fontSize: 14, color: colors.YELLOW, paddingRight: 17, top: 3 }}>Log out</Text>
    </TouchableOpacity>
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Settings'
        navigation={navigation}
        rightComponent={rightComponent}
        showMenu
        showCrownIcon
        showNotificationsIcon
      />


      <View style={{ backgroundColor: '#FFF', paddingTop: 10, paddingHorizontal: 17, justifyContent: 'space-between', flex: 1 }}>

        <ScrollView>
          <SwitchListItem

            leftComponent={<Image source={require('@assets/icons/entypo_camera.png')} style={{ width: 18, height: 14, marginRight: 13 }} />}
            title='Access to the camera'
            onChange={switchCameraPermission}
            active={cameraPermission}
          />
          <SwitchListItem
            leftComponent={<Image source={require('@assets/icons/location.png')} style={{ width: 15, height: 19, marginRight: 15 }} />}
            title='Geo Location (GPS)'
            onChange={switchLocationPermission}
            active={locationPermission}
          />
          <SwitchListItem
            leftComponent={<Image source={require('@assets/icons/Notifications.png')} style={{ width: 18, height: 17, marginRight: 13 }} />}
            title='Notifications'
            onChange={switchNotificationsPermission}
            active={notificationsPermission}
          />
          {token && (
            <ListItem
              leftComponent={<Image source={require('@assets/icons/pass.png')} style={{ width: 15, height: 18, marginRight: 15 }} />}
              title='Change password'
              onPress={() => navigation.navigate('ChangePassword')}
            />
          )}

          <ListItem
            leftComponent={<Image source={require('@assets/icons/information-gray.png')} style={{ width: 16, height: 16, marginRight: 15 }} />}
            title='About'
            onPress={() => navigation.navigate('PageAbout', { title: 'About+Mobile+App+RWA', showBack: true })}
          />

          <ListItem
            leftComponent={<Image source={require('@assets/icons/help-gray.png')} style={{ width: 16, height: 16, marginRight: 15 }} />}
            title='Help'
            onPress={() => navigation.navigate('PageHelp', { title: 'Help+%26+Tutorial', showBack: true })}
          />

          <ListItem
            leftComponent={<Image source={require('@assets/icons/faq-gray.png')} style={{ width: 16, height: 16, marginRight: 15 }} />}
            title='FAQ'
            onPress={() => navigation.navigate('FAQ')}
          />

        </ScrollView>



        <Text style={styles.version}>Build 23; Code Push v21.</Text>
      </View>



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
  bodyTitle: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 24, color: '#121212' },
  desc: { marginTop: 30, fontWeight: '400', fontFamily: 'Avenir', color: '#7A7A7A', fontSize: 16, textAlign: 'center', lineHeight: 27 },
  image: { width: 81, height: 81, marginTop: 40 },
  confirmButton: { marginTop: 27, marginBottom: 50 },
  sendAgainText: { color: '#F2A71D', fontWeight: '600', fontFamily: 'Avenir', fontSize: 14 },
  sendAgain: { alignItems: 'center', marginTop: 40 },
  version: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 11, color: '#A1A1A1', paddingBottom: 30 },
})