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
  FlatList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, RewardListItem, RedeemRewardModal, RedemptionSuccessfulModal, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'
import helper from '@services/helper'
import AlertAsync from 'react-native-alert-async'


export default function Rewards(props) {
  const dispatch = useDispatch()
  const [rewards, setRewards] = useState(null)
  const [totalPoints, setTotalPoints] = useState(null)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)

  useEffect(() => {
    getData(true)
  }, []);

  const getData = async (showLoader) => {
    try {
      if (showLoader) {
        dispatch(loaderAction({ isLoading: true }))
      }

      const data = await mainApi.getMyRewards({
        user_id: user?.userId,
        token,
      })
      setRewards(data?.rewards)
      setTotalPoints(data?.user?.total_points)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='My Rewards'
        showMenu
        goBack={props.navigation.goBack}
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />


      <View style={styles.cardHeader}>
        <Text style={styles.availablePoints}>Available points to redeem</Text>
        <Text style={styles.availablePoints}>
          <Text style={styles.points}>{totalPoints}</Text> points
        </Text>
      </View>


      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={rewards}
        keyExtractor={(item, index) => 'my-reward-' + index}
        renderItem={({ item }) => {
          return <RewardListItem
            {...item}
          />
        }}
        ListFooterComponent={<View style={{ height: 50 }} />}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  list: { marginTop: 6, paddingHorizontal: 17, marginTop: 13 },
  cardHeader: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.22,

    elevation: 3,
  },
  availablePoints: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#121212' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' }
})