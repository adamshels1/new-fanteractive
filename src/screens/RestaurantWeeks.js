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
import { Header, Text, StatusBar } from '@components'
import { mainApi } from '@api'
// import YoutubePlayer from "react-native-youtube-iframe"
import helper from '@services/helper'
// import messaging from '@react-native-firebase/messaging';
// import notifee from '@notifee/react-native';
import { setUnreadNotificationsCountAction } from '@redux/actions/mainActions'
import { server } from '@constants'

export default function Restaurants(props) {
  const dispatch = useDispatch()
  const [restaurant, setRestaurant] = useState([])
  useEffect(()=>{
    const getData = async () => {
      const restaurant = await mainApi.getRestaurantWeeks();
      setRestaurant(restaurant);
    }
    getData()
  }, []);


  // useEffect(() => {
  //   onNotification()
  // }, []);

  useEffect(() => {
    getNotifications()
  }, []);

  const getNotifications = async () => {
    try {
      const data = await mainApi.getNotifications({
        user_id: user?.userId,
        token,
        page: 1
      })
      dispatch(setUnreadNotificationsCountAction(data?.unread))
    } catch (e) {
      console.log(e.message)
    }
  }


  // const onNotification = async () => {
  //   //при нажатии на нотификацию когда приложение закрыто
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app for open from background state:',
  //       remoteMessage.notification,
  //     );

  //     // if (this.props.route.name !== 'Contacts') {
  //     //   navigation.navigate('Contacts');
  //     // }
  //   });


  //   //когда приложение открыто и получаем пуш
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('remoteNotification', remoteMessage)
  //     const channelId = await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default Channel',
  //     });
  //     // Display a notification
  //     await notifee.displayNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       android: {
  //         channelId,
  //         smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       },
  //     });
  //   });




    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
  }


  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" />
      <Header
        title={restaurant?.title}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />


      <ScrollView>

        <View style={styles.cardHader}>
          <Image source={{ uri: restaurant?.intro_image }} style={styles.image31} />
          <View style={styles.cardHeaderOvarlay} />
          <Text style={styles.textTitle}>
            {restaurant?.content_title}
          </Text>

          <Image source={{ uri: restaurant?.logo }} style={styles.logo} />
        </View>


        <View style={styles.cardBody}>

          <TouchableOpacity onPress={() => Linking.openURL(restaurant?.site_url?.url)} style={styles.optionWrap}>
            <Image source={require('@assets/icons/web.png')} style={styles.agendaIcon} />
            <Text style={styles.optionText} numberOfLines={1}>
              {restaurant?.site_url?.title}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity onPress={() => Linking.openURL(restaurant?.phones[0]?.url)} style={styles.optionWrap}>
              <Image source={require('@assets/icons/phone.png')} style={{ width: 10, height: 10 }} />
              <Text style={styles.optionText} numberOfLines={1}>
                {restaurant?.phones && restaurant?.phones[0]?.title}
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/place/' + address)} style={styles.optionWrap}>
              <Image source={require('@assets/icons/maps.png')} style={{ width: 10, height: 13 }} />
              <Text style={styles.optionText}>+1 404 347 9595</Text>
            </TouchableOpacity> */}


          </View>


        </View>




        <View style={{ paddingVertical: 12, paddingHorizontal: 18 }}>
          <Text style={styles.text}>
            {restaurant.content}
          </Text>
        </View>


        {/* <View style={styles.video}>
          <YoutubePlayer
            videoId={helper.getYoutubeVideoId(restaurant?.outro_video)}
            play={false}
            height={201}
            width={'100%'}
          />
        </View> */}





      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('EventsStackScreen')}
      >
        <View style={styles.buttonContent}>
          <Image source={require('@assets/icons/map2.png')} style={{ width: 17, height: 17, marginRight: 9 }} />
          <Text style={styles.buttonText}>Discover Restaurant Weeks</Text>
          <Image source={require('@assets/icons/arrow.png')} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => props.navigation.navigate('ExploreStackScreen')}
      >
        <View style={styles.buttonContent}>
          <Image source={require('@assets/icons/feed.png')} style={{ width: 16, height: 16, marginRight: 9 }} />
          <Text style={styles.buttonText}>Explore Atlanta</Text>
          <Image source={require('@assets/icons/arrow.png')} style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7, marginRight: 27 },
  optionText: { fontFamily: 'Avenir', fontSize: 15, color: '#626262', fontWeight: '400', marginLeft: 10, textDecorationLine: 'underline' },
  cardHeader: { width: '100%', flexDirection: 'row', paddingTop: 16, paddingBottom: 14, justifyContent: 'space-between', paddingHorizontal: 17 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 18, color: '#121212' },
  text: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 15, color: '#121212', lineHeight: 22.5 },
  textCount: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 13, color: '#848484' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 },
  moreIcon: { width: 4, height: 22 },
  mapsIcon: { width: 10, height: 13 },
  agendaIcon: { width: 12, height: 12 },
  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 },

  button: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 60,
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.22,

    elevation: 3,
  },
  button2: {
    borderTopWidth: 1,
    borderColor: '#E2E2E2',
    height: 60,
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { fontFamily: 'Avenir', fontWeight: '700', fontSize: 15, color: '#F2A71D' },

  textTitle: { fontWeight: '600', fontSize: 20, color: '#FFFFFF', zIndex: 1, position: 'absolute', textAlign: 'center', top: 30, width: '80%', textTransform: 'uppercase' },
  image31: { width: '100%', height: 150, position: 'absolute' },
  cardHader: { width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' },
  cardHeaderOvarlay: { width: '100%', height: 150, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', zIndex: 1 },
  logo: { width: 95, height: 95, zIndex: 1, top: 75 },
  cardBody: { paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 24, marginTop: 55 },
  video: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 18, marginBottom: 40 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', width: '70%' },
  arrowIcon: { width: 6, height: 10, marginLeft: 9 },
})