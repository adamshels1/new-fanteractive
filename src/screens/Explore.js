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
import { Header, ExploreListItem, LoginModal, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'
import { setFeeds } from '@redux/actions/mainActions'

export default function Restaurants({ navigation }) {
  const dispatch = useDispatch()
  const [visibleLogin, setVisibleLogin] = useState(false)
  const [page, setPage] = useState(1)
  const feeds = useSelector(state => state.mainReducer.feeds)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)


  useEffect(() => {
    getFeeds()
  }, []);

  const getFeeds = async () => {
    try {
      // dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.getFeeds({
        page: 1,
        user_id: user?.userId,
        token,
      })
      dispatch(setFeeds(data?.articles))
      setPage(2)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const getFeedsNextPage = async () => {
    try {
      const data = await mainApi.getFeeds({
        page,
        user_id: user?.userId,
        token,
      })
      if (data?.articles.length) {
        dispatch(setFeeds([...feeds, ...data?.articles]))
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
        title='Explore ATL'
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
      />

      <LoginModal
        isVisible={visibleLogin}
        onClose={() => setVisibleLogin(false)}
      />

      <FlatList
        style={{ marginTop: 11, backgroundColor: '#E2E2E2' }}
        data={feeds}
        keyExtractor={(item, index) => 'explore-' + index}
        renderItem={({ item }) => <ExploreListItem
          {...item}
          onPress={() => navigation.navigate('ExploreCard', { feed: item })}
        />}
        onEndReached={getFeedsNextPage}
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
  body: { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 17, flex: 1 },
  bodyTop: { marginTop: 46, alignItems: 'center' },
  bodyBottom: { marginTop: 70, width: '100%' },
  bodyTitle: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 24, color: '#121212' },
  desc: { marginTop: 30, fontFamily: 'Montserrat', fontWeight: '400', color: '#7A7A7A', fontSize: 16, textAlign: 'center', lineHeight: 27 },
  image: { width: 81, height: 81, marginTop: 40 },
  confirmButton: { marginTop: 27, marginBottom: 50 },
  sendAgainText: { color: '#F2A71D', fontFamily: 'Montserrat', fontWeight: '600', fontSize: 14 },
  sendAgain: { alignItems: 'center', marginTop: 40 },
})