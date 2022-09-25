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
  Animated
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, SuccessfullyReceivedPointsModal, Text, StatusBar } from '@components'
import { mainApi } from '@api'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { loaderAction } from '@redux/actions/loaderActions'
import moment from 'moment'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import helper from '@services/helper'
import AlertAsync from 'react-native-alert-async'
// import analytics from '@react-native-firebase/analytics'


export default function Sponsor(props) {

  const dispatch = useDispatch()
  const [sponsor, setSponsor] = useState(null)
  const [visibleGetPoinsButton, setVisibleGetPointsButton] = useState(false)
  const [visibleSuccessModal, setVisibleSuccessModal] = useState(false)
  const [receivedPoints, setReceivedPoints] = useState(null)
  const [sponsorAvailablePoints, setSponsorAvailablePoints] = useState(null)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const claimCountPoints = helper.randomIntFromInterval(sponsor?.available_points?.points_range?.min, sponsor?.available_points?.points_range?.max)

  useEffect(() => {
    getSponsor()
  }, []);

  const getSponsor = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const sponsor = await mainApi.getSponsor({
        id: props.route.params.sponsor.id,
        user_id: user?.userId,
        token,
      })
      setSponsor(sponsor)
      setSponsorAvailablePoints(sponsor.available_points)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const acceptPoints = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.acceptPointsBySponsorView({
        sponsor_id: props.route.params.sponsor.id,
        user_id: user?.userId,
        token,
        points: claimCountPoints
      })
      dispatch(loaderAction({ isLoading: false }))
      // await analytics().logEvent('Sponsor_Scavanger_points', {
      //   success: res?.day ? 'true' : 'false',
      //   points: claimCountPoints
      // })
      if (res.user) {
        setReceivedPoints(claimCountPoints)
        setSponsorAvailablePoints(null)
        setVisibleSuccessModal(true)
      } else {
        AlertAsync(res.reason || 'Something went wrond')
      }
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
    }
  }

  const onCompleteTimer = () => {
    setVisibleGetPointsButton(true)
  }


  const onWebsite = async () => {
    try {
      if (!sponsor?.website) return
      Linking.openURL(sponsor?.website)
      // await analytics().logEvent('Sponsor_Website_call', {
      //   website: sponsor?.website,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }


  const onPhone = async () => {
    try {
      if (!sponsor?.phone?.url) return
      Linking.openURL(sponsor?.phone?.url)
      await analytics().logEvent('Sponsor_Phone_call', {
        phone_number: sponsor?.phone?.title,
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  const onAddress = async () => {
    try {
      if (!sponsor?.address) return
      Linking.openURL('https://www.google.com/maps/place/' + sponsor?.address)
      // await analytics().logEvent('Sponsor_Maps_call', {
      //   map_link: 'https://www.google.com/maps/place/' + sponsor?.address,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }

  const onEmail = async () => {
    try {
      if (!sponsor?.email) return
      Linking.openURL('mailto:' + sponsor?.email)
      await analytics().logEvent('Sponsor_email_call', {
        email: sponsor?.email
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  const logoSource = sponsor?.logo ? { uri: sponsor.logo } : require('@assets/images/no_image.png');

  let color = '#B0B0B0'
  switch (sponsor?.rating?.label) {
    case 'Platinum':
      color = '#95C6FF'
      break;
    case 'Gold':
      color = '#FAB811'
      break;
  }

  return (
    <View style={styles.container}>

      <StatusBar barStyle='dark-content' />
      <Header
        title={'Sponsor Information'}
        goBack={props.navigation.goBack}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />


      <ScrollView style={{ backgroundColor: '#fff' }}>

        <Image source={{ uri: sponsor?.intro_image }} style={styles.sponsorImage} />


        <View style={styles.sponsorHeader}>
          <Image
            style={styles.sponsorLogo}
            source={logoSource}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.sponsorName}>
              {sponsor?.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ ...styles.sponsorType, color }}>
                {sponsor?.rating?.label}
              </Text>
              <AirbnbRating
                defaultRating={sponsor?.rating?.value}
                count={sponsor?.rating?.value}
                isDisabled
                showRating={false}
                size={12}
                selectedColor={color}
              />
            </View>


          </View>
        </View>

        <View style={styles.line} />





        <View style={styles.sponsorFooter}>


          {sponsor?.address ? (
            <TouchableOpacity onPress={onAddress} style={styles.optionWrap}>
              <Image source={require('@assets/icons/maps.png')} style={styles.mapsIcon} />
              <Text style={styles.optionText} numberOfLines={1}>
                {sponsor?.address}
              </Text>
            </TouchableOpacity>
          ) : null}


          {sponsor?.work_time?.from ? (
            <View style={styles.optionWrap}>
              <Image source={require('@assets/icons/time.png')} style={{ width: 12, height: 14 }} />
              <Text style={styles.optionText} numberOfLines={1}>
                {sponsor?.work_time?.from} – {sponsor?.work_time?.to}
              </Text>
            </View>
          ) : null}


          {sponsor?.email ? (
            <TouchableOpacity onPress={onEmail} style={styles.optionWrap}>
              <Image source={require('@assets/icons/agenda.png')} style={{ width: 12, height: 12 }} />
              <Text style={styles.optionText} numberOfLines={1}>
                {sponsor?.email}
              </Text>
            </TouchableOpacity>
          ) : null}


          {sponsor?.website ? (
            <TouchableOpacity onPress={onWebsite} style={styles.optionWrap}>
              <Image source={require('@assets/icons/web.png')} style={{ width: 11.84, height: 11.53 }} />
              <Text style={styles.optionText} numberOfLines={1}>
                {sponsor?.website}
              </Text>
            </TouchableOpacity>
          ) : null}

          {sponsor?.phone ? (
            <TouchableOpacity onPress={onPhone} style={styles.optionWrap}>
              <Image source={require('@assets/icons/phone.png')} style={{ width: 10, height: 10 }} />
              <Text style={styles.optionText} numberOfLines={1}>
                {sponsor?.phone?.title}
              </Text>
            </TouchableOpacity>
          ) : null}




          <View style={[styles.line, { marginBottom: 12 }]} />

          <Text style={styles.text}>
            {sponsor?.content}
          </Text>

          <SuccessfullyReceivedPointsModal
            title='Sponsor Visit Points'
            isVisible={visibleSuccessModal}
            day={{ points: receivedPoints }}
            onClose={() => setVisibleSuccessModal(false)}
          />


          {(sponsorAvailablePoints && sponsorAvailablePoints?.accepted_time && token) && (
            <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
              {visibleGetPoinsButton ? (
                <Button
                  style={{ marginTop: 23 }}
                  text={`Claim ${claimCountPoints} Points Now!`}
                  onPress={acceptPoints}
                  textStyle={{ fontWeight: '700' }}
                />
              ) : (
                <CountdownCircleTimer
                  isPlaying
                  duration={sponsorAvailablePoints?.accepted_time}
                  size={100}
                  strokeWidth={4}
                  onComplete={onCompleteTimer}
                  colors={[
                    ['#F2A71D', 0.4],
                    ['#F2A33A', 0.4],
                  ]}
                >
                  {({ remainingTime, animatedColor }) => (
                    <Animated.Text style={{ color: animatedColor, fontSize: 25, textAlign: 'center', fontWeight: '700' }}>

                      <Text style={styles.countText}>Get Points in{`\n`}</Text>
                      {remainingTime}
                      <Text style={styles.countText}>{`\n`}Seconds</Text>

                    </Animated.Text>
                  )}
                </CountdownCircleTimer>
              )}
            </View>
          )}


        </View>

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  optionWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 21, marginBottom: 12 },
  optionText: { fontFamily: 'Montserrat', fontSize: 15, color: '#626262', fontWeight: '400', marginLeft: 7 },
  title: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 15, color: '#121212', marginBottom: 7 },
  mapsIcon: { width: 10, height: 13 },
  visitIcon: { width: 15, height: 15, marginLeft: 9 },
  sponsorLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  sponsorName: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 18, color: '#121212', marginBottom: 4 },
  sponsorType: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 13, color: '#8EBCF2' },
  text: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 14, color: '#121212' },
  sponsor: { backgroundColor: '#fff', marginTop: 12, borderRadius: 15, borderColor: '#95C6FF', borderWidth: 1 },
  sponsorImage: { width: '100%', height: 204 },
  sponsorHeader: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 18 },
  arrowGray: { width: 6, height: 10, position: 'absolute', right: 19, top: 38 },
  line: { backgroundColor: '#E2E2E2', height: 1 },
  sponsorFooter: { marginTop: 2, padding: 18 },

  countText: { color: '#626262', fontSize: 10, fontWeight: '400' },
})