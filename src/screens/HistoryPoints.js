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
import { Header, ExploreListItem, LoginModal, TopTabs, PointListItem, Text, StatusBar } from '@components'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'

const Empty = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ width: 217, height: 201, marginTop: 75 }} resizeMode='contain' source={require('@assets/images/rew.png')} />
      <Text style={{ fontWeight: '400', fontSize: 24, color: '#121212', marginTop: 21, textAlign: 'center', width: 276 }}>You have no Rewards Points yet</Text>
    </View>
  )
}


export default function Points(props) {
  const dispatch = useDispatch()
  const [points, setPoints] = useState([])
  const [totalPoints, setTotalPoints] = useState(null)
  const [page, setPage] = useState(1)
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

      const data = await mainApi.getHistoryPoints({
        user_id: user?.userId,
        token,
        page: 1
      })
      setPoints(data?.entries)
      setTotalPoints(data?.user?.total_points)
      setPage(2)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const getDataNextPage = async () => {
    try {
      const data = await mainApi.getHistoryPoints({
        user_id: user?.userId,
        token,
        page
      })
      if (data?.entries?.length) {
        setPoints([...points, ...data?.entries])
        setPage(page + 1)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='History of Points'
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
        data={points}
        keyExtractor={(item, index) => 'point-' + index}
        renderItem={({ item }) => {
          return <PointListItem {...item} />
        }}
        ListFooterComponent={<View style={{ height: 50 }} />}
        ListEmptyComponent={<Empty />}
        onEndReached={getDataNextPage}
        onEndReachedThreshold={0.3}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  optionWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 21 },
  optionText: { fontFamily: 'Avenir', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 7 },
  image: { width: 46, height: 46, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 15, color: '#121212', marginBottom: 7 },
  text: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14, color: '#121212' },
  textCount: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 13, color: '#848484' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 },
  moreIcon: { width: 4, height: 22 },
  mapsIcon: { width: 10, height: 13 },
  agendaIcon: { width: 12, height: 12 },
  image31: { width: '100%', height: 201 },
  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 },

  button: {
    height: 60,
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
  visitIcon: { width: 15, height: 15, marginLeft: 9 },

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
  availablePoints: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 16, color: '#121212' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' },
  list: { marginTop: 6, paddingHorizontal: 17, marginTop: 13 }
})