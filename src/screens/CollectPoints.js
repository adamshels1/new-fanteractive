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
import { Header, ExploreListItem, LoginModal, Day, Button, SuccessfullyReceivedPointsModal, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import helper from '@services/helper'
import AlertAsync from 'react-native-alert-async'
// import analytics from '@react-native-firebase/analytics'
import { setUserAction } from '@redux/actions/userActions'

export default function CollectPoints(props) {
  const dispatch = useDispatch()
  const [days, setDays] = useState(null)
  const [comeBackIn, setComeBackIn] = useState(null)
  const [visibleGetPoinsButton, setVisibleGetPointsButton] = useState(false)
  const [visibleSuccessModal, setVisibleSuccessModal] = useState(false)
  const [resClaimDailyPoints, setResClaimDailyPoints] = useState(null)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)

  const activeDay = days && days.find(i => i.status === 'active')

  useEffect(() => {
    getData(true)
  }, []);

  const getData = async (showLoader) => {
    try {
      if (showLoader) {
        dispatch(loaderAction({ isLoading: true }))
      }

      const data = await mainApi.getDailyPoints({
        user_id: user?.userId,
        token,
      })
      if (data?.days) {
        setDays(data?.days?.sort((a, b) => a.id - b.id))
      }
      setComeBackIn(data?.come_back_in)
      if (data?.come_back_in?.seconds === 0) {
        setVisibleGetPointsButton(true)
      }
      dispatch(setUserAction({ ...user, ...data.user }))
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const onCompleteTimer = () => {
    setVisibleGetPointsButton(true)
    getData()
  }

  const countdownChildren = ({ remainingTime, animatedColor }) => {
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60)
    const seconds = remainingTime % 60

    return (
      <Animated.Text style={{ color: animatedColor, fontSize: 25, textAlign: 'center', fontWeight: '700' }}>

        <Text style={styles.countText}>Get Points in{`\n`}</Text>
        {hours}:{minutes}:{seconds}

      </Animated.Text>
    )
  }

  const claimDailyPoints = async () => {
    try {
      const activeDay = days.find(i => i.status === 'active')
      if (!activeDay) {
        return AlertAsync('No active day')
      }
      dispatch(loaderAction({ isLoading: true }))

      const data = await mainApi.acceptDailyPoints({
        user_id: user?.userId,
        token,
        id: activeDay?.id
      })
      dispatch(loaderAction({ isLoading: false }))
      // await analytics().logEvent('Daily_Claim_Bttn_Pressed', {
      //   success: data?.day ? 'true' : 'false',
      // })
      if (data?.day) {
        setResClaimDailyPoints(data?.day)
        setVisibleSuccessModal(true)
        setVisibleGetPointsButton(false)
        await getData()
      } else {
        await AlertAsync('Error', data?.reason || 'Something went wrond')
      }
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const renderFooterComponent = () => (
    <View style={styles.listFooter}>
      {visibleGetPoinsButton ? (
        <Button
          text={`Claim +${activeDay?.points} Daily Points!`}
          onPress={claimDailyPoints}
        />
      ) :
        comeBackIn?.seconds ? (
          <CountdownCircleTimer
            isPlaying
            duration={comeBackIn.seconds}
            size={130}
            strokeWidth={4}
            onComplete={onCompleteTimer}
            colors={[
              ['#F2A71D', 0.4],
              ['#F2A33A', 0.4],
            ]}
          >
            {countdownChildren}
          </CountdownCircleTimer>
        ) : null

      }
    </View>
  )

  const renderHeaderComponent = () => (
    <View style={styles.listHeader}>
      <Image source={require('@assets/images/im.png')} style={styles.image} />
      <Text style={styles.pointsBalance}>Points balance</Text>
      <Text style={styles.balance}>
        {user?.points?.total}
      </Text>
    </View>
  )


  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='dark-content' />
        <Header
          title={'Collect Daily Points'}
          goBack={props.navigation.goBack}
          navigation={props.navigation}
          showMenu
          showCrownIcon
          showNotificationsIcon
        />

        <SuccessfullyReceivedPointsModal
          isVisible={visibleSuccessModal}
          day={resClaimDailyPoints}
          onClose={() => setVisibleSuccessModal(false)}
        />

        <View style={styles.content}>

          <FlatList
            ListHeaderComponent={renderHeaderComponent()}

            numColumns={4}
            showsVerticalScrollIndicator={false}
            data={days}
            keyExtractor={(item, index) => 'day-' + index}
            renderItem={({ item }) => {
              return <Day
                {...item}
              />
            }}
            ListFooterComponent={renderFooterComponent()}
          />

        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <View style={styles.pointsWrap}>
          <View>
            <Text style={styles.pointsLabel}>Event points:</Text>
            <Text style={styles.pointsValue}>{user?.points?.event} points</Text>
          </View>
          <View>
            <Text style={styles.pointsLabel}>Daily points:</Text>
            <Text style={styles.pointsValue}>{user?.points?.daily} points</Text>
          </View>
          <View>
            <Text style={styles.pointsLabel}>Total:</Text>
            <Text style={styles.pointsValue}>
              <Text style={styles.bold}>{user?.points?.total}</Text> points
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2'
  },
  button: {
    height: 76,
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.22,

    elevation: 3,
  },
  buttonText: { fontFamily: 'Avenir', fontWeight: '700', fontSize: 15, color: '#F2A71D' },

  pointsBalance: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14, color: '#7A7A7A', marginTop: 33 },
  pointsWrap: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 17 },
  pointsLabel: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 11, color: '#7A7A7A', textTransform: 'uppercase', marginBottom: 2 },
  pointsValue: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 16, color: '#121212' },
  balance: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 40, color: '#F2A71D', marginTop: 7 },
  listHeader: { alignItems: 'center', marginBottom: 10 },
  listFooter: { alignItems: 'center', marginBottom: 70, marginTop: 23 },
  image: { width: 100, height: 110, marginTop: 30 },
  content: { backgroundColor: '#fff', margin: 17, alignItems: 'center', marginBottom: 75, borderRadius: 12 },

  countText: { color: '#626262', fontSize: 10, fontWeight: '400' },
  bold: { color: '#F2A71D', fontWeight: '700' }
})