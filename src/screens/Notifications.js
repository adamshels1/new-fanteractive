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
import { Header, NotificationListItem, NotificationModal, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import LookupModal from 'react-native-lookup-modal'
import { loaderAction } from '@redux/actions/loaderActions'
import { setUnreadNotificationsCountAction } from '@redux/actions/mainActions'
// import notifee from '@notifee/react-native'

const Empty = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ width: 217, height: 201, marginTop: 75 }} resizeMode='contain' source={require('@assets/images/rew.png')} />
      <Text style={{ fontWeight: '400', fontSize: 24, color: '#121212', marginTop: 21, textAlign: 'center', width: 276 }}>You don't have any notification yet</Text>
    </View>
  )
}


export default function Notifications(props) {
  const dispatch = useDispatch()
  const [notifications, setNotifications] = useState([])
  const [notification, setNotification] = useState(null)
  const [loadingAction, setLoadingAction] = useState(false)
  const [page, setPage] = useState(1)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)

  // useEffect(() => {
  //   getData()
  // }, []);

  const getData = async () => {
    try {
      // dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.getNotifications({
        user_id: user?.userId,
        token,
        page: 1
      })
      setNotifications(data?.notifications)
      dispatch(setUnreadNotificationsCountAction(data?.unread))
      await notifee.setBadgeCount(data?.unread)
      dispatch(loaderAction({ isLoading: false }))
      setPage(2)
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const getDataNextPage = async () => {
    try {
      const data = await mainApi.getNotifications({
        user_id: user?.userId,
        token,
        page
      })
      if (data?.notifications?.length) {
        setNotifications([...notifications, ...data?.notifications])
        setPage(page + 1)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const onAction = async (notification_id, action) => {
    try {
      setLoadingAction(true)

      const data = await mainApi.notificationAction({
        user_id: user?.userId,
        token,
        notification_id,
        action
      })
      await getData()
      setLoadingAction(false)
      setNotification(null)
    } catch (e) {
      setLoadingAction(false)
      await AlertAsync('Error', 'Something went wrond')
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Notifications'
        showMenu
        showCrownIcon
        navigation={props.navigation}
      />

      <NotificationModal
        isVisible={Boolean(notification)}
        loadingAction={loadingAction}
        onClose={() => setNotification(null)}
        onOk={() => onAction(notification.id, 'read')}
        onDelete={() => onAction(notification.id, 'delete')}
        {...notification}
      />

      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(item, index) => 'notification-' + index}
        renderItem={({ item }) => {
          return <NotificationListItem
            onPress={() => setNotification(item)}
            {...item}
          />
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
    backgroundColor: '#F4F4F4'
  },

  list: { paddingHorizontal: 17, paddingTop: 13 },
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
  availablePoints: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 16, color: '#121212' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' },
  input: { width: '100%', height: 55, borderRadius: 5, borderWidth: 1, paddingHorizontal: 15, fontSize: 14, borderColor: '#B7B7B7', marginBottom: 10, justifyContent: 'center', marginTop: 14 },
  wrapFiedl: { position: 'absolute', top: -9, left: 18, backgroundColor: '#FFF', zIndex: 9, paddingHorizontal: 5 },
  textFiedl: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 14, color: '#7A7A7A' },

})