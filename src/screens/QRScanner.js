import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Text, LoginModal, StatusBar, Loader, Button } from '@components'
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner'
import { mainApi } from '@api'
import Geolocation from '@react-native-community/geolocation'
import AlertAsync from 'react-native-alert-async'
import { loaderAction } from '@redux/actions/loaderActions'
import { setRewardsAction } from '@redux/actions/mainActions'
import helper from '@services/helper'
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function EmailVerification({ navigation }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const [isFocus, setIsFoucs] = useState(false)
  const [coords, setCoords] = useState({})
  const [isloggedin, setLoggedin] = useState([false])
  const [visibleLogin, setVisibleLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisibleTryAgain, setVisibleTryAgain] = useState(false)
  useEffect(() => {
    setLoggedin(token)
  });

  const getGeolocation = () => {
    Geolocation.getCurrentPosition(async (position) => {
      const { coords } = position;
      const { longitude, latitude } = coords;
      setCoords({
        longitude,
        latitude,
      });
    },
      async (error) => {
        await AlertAsync('To get a location, you need permission, provide from in the settings');
        // Linking.openSettings();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  const onScannerQR = async e => {
    try {
      const url = e?.data ? e.data : null;
      if (url) {
        setIsLoading(true)
        const { longitude, latitude } = coords;
        const data = await mainApi.addQRScan({
          user_id: user?.userId,
          token,
          url,
          lng: longitude,
          lat: latitude
        })
        if (data?.user) {
          AlertAsync('Successful scan of the QR code', 'You are awarded points')
        } else {
          AlertAsync(data.reason || 'Something went wrond')
        }
        setIsLoading(false)
        setVisibleTryAgain(true)

      } else {
        AlertAsync('invalid qr code')
      }
    } catch (e) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!token) {
      // navigation.navigate('Login')
      setVisibleLogin(true)
    }
    getGeolocation()
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsFoucs(true)
    });

    const subscribe = navigation.addListener('blur', () => {
      setIsFoucs(false)
    });
  }, [navigation]);

  const onLogin = () => {
    setVisibleLogin(false)
    navigation.navigate('Login')
  }

  const onEmail = () => {
    setVisibleLogin(false)
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='QR Code Scanner'
        // goBack={navigation.goBack}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
      />

      <Loader visible={isLoading} />

      <LoginModal
        isVisible={visibleLogin}
        onClose={() => setVisibleLogin(false)}
        onLogin={onLogin}
        onEmail={onEmail}
        renderHeader={() => <Image source={require('@assets/icons/QRcode.png')} style={styles.qrIcon} />}
        text={`Please login to your \naccount to scan the QR code`}
      />

      <View style={{ flex: 1, backgroundColor: '#000' }}>
        {/* <View style={{ height: '25%', backgroundColor: '#000' }}></View> */}
        {(isFocus && isloggedin && !isLoading && !isVisibleTryAgain) && (
          <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Image source={require('@assets/images/qr_bg.png')} style={styles.bgScanner} />
            <QRCodeScanner
              style={{ flex: 1 }}
              onRead={onScannerQR}
              reactivate={true}
              reactivateTimeout={7000}
              flashMode={RNCamera.Constants.FlashMode.auto}
            // showMarker={true}
            />
          </View>
        )}

        {isVisibleTryAgain && (
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Button text='Try again' onPress={() => setVisibleTryAgain(false)} style={{ width: '70%' }} />
          </View>
        )}


        <View style={styles.textWrap}>
          <Text style={styles.textBottom}>Scan the QR code at the restaurant </Text>
          {/* <TouchableOpacity onPress={() => onScannerQR({ data: 'test' })}>
            <Text style={{color: '#fff'}}>onScannerQR</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>

  );
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
  bgScanner: { width: '100%', height: '100%', position: 'absolute', zIndex: 1 },
  qrIcon: { width: 97, height: 97, marginTop: 39 },
  textWrap: { height: '20%', backgroundColor: '#000', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '5%' },
  textBottom: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 18, color: '#FFFFFF' },
})