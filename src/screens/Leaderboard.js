import { mainApi } from '@api'
import { Header, LeaderboardListItem, StatusBar, Text } from '@components'
import { loaderAction } from '@redux/actions/loaderActions'
import React, { useEffect, useState } from 'react'
import {
  FlatList, SafeAreaView, StyleSheet,
  View
} from 'react-native'
import LookupModal from 'react-native-lookup-modal'
import { useDispatch, useSelector } from 'react-redux'
import helper from '@services/helper'


export default function Leaderboard(props) {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [types, setTypes] = useState([])
  const [type, setType] = useState('All')
  const [points, setPoints] = useState(null)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)

  useEffect(() => {
    getData('total_points')
  }, []);

  const getData = async (type = 'total_points') => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.getLeaderboard({
        user_id: user?.userId,
        token,
        type
      })
      setUsers(data?.users)
      setTypes(data?.types)
      setPoints(data?.user?.points?.total)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const onType = async (data) => {
    setType(data)
    await helper.sleep(400)
    getData(data.value)
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Leaderboard'
        showMenu
        goBack={props.navigation.goBack}
        navigation={props.navigation}
        showCrownIcon
        showNotificationsIcon
      />

      <View style={styles.cardHeader}>
        <View style={styles.availableWrap}>
          <Text style={styles.availablePoints}>Available points to redeem</Text>
          <Text style={styles.availablePoints}>
            <Text style={styles.points}>{points}</Text> points
          </Text>
        </View>


        <View style={styles.input}>
          <View style={styles.wrapFiedl}>
            <Text style={styles.textFiedl}>
              By Event
            </Text>
          </View>
          <LookupModal
            contentStyle={styles.lookumContentStyle}
            selectButtonTextStyle={styles.cityButtonText}
            // selectButtonStyle={{}}
            data={types}
            value={type}
            onSelect={onType}
            displayKey={"label"}
            itemStyle={styles.lookumItemStyle}
            itemTextStyle={styles.lookumItemTextStyle}
          />

        </View>

      </View>


      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={(item, index) => 'user-' + item.id}
        renderItem={({ item }) => {
          return <LeaderboardListItem
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
    paddingTop: 16,

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
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' },
  input: { width: '100%', height: 55, borderRadius: 5, borderWidth: 1, paddingHorizontal: 15, fontSize: 14, borderColor: '#B7B7B7', marginBottom: 13, justifyContent: 'center', marginTop: 14 },
  wrapFiedl: { position: 'absolute', top: -9, left: 18, backgroundColor: '#FFF', zIndex: 9, paddingHorizontal: 5 },
  textFiedl: { fontWeight: '400', fontFamily: 'Montserrat', fontSize: 14, color: '#7A7A7A' },
  availableWrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  lookumItemStyle: { borderBottomWidth: 1, borderBottomColor: '#DCDCDC', height: 49, justifyContent: 'center' },
  lookumItemTextStyle: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 14 },
  lookumContentStyle: { height: '80%', borderRadius: 12 }
})