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
import { setEventAction } from '@redux/actions/mainActions'
import moment from 'moment'

export default function Restaurants(props) {
  const dispatch = useDispatch()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    getEvent()
  }, []);

  const getEvent = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const event = await mainApi.getEvent(props.route.params.event.id)
      setEvent(event)
      dispatch(setEventAction(event))
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
    }
  }


  const logoSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_image.png');

  return (
    <View style={styles.container}>

      <StatusBar barStyle='dark-content' />
      <Header
        title={event?.title}
        goBack={props.navigation.goBack}
        navigation={props.navigation}
        showMenu
        showCrownIcon
        showNotificationsIcon
      />
      <ScrollView>
        <View>
          {event?.intro_image && (
            <Image source={{ uri: event?.intro_image }} style={styles.image31} />
          )}
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity >
                <Image
                  style={styles.image}
                  source={logoSource}
                />
              </TouchableOpacity>
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.title} numberOfLines={1}>
                  {event?.title}
                </Text>

                <View style={{ flexDirection: 'column' }}>
                  {event?.address && (
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/place/' + event?.location)} style={styles.optionWrap}>
                      <Image source={require('@assets/icons/maps.png')} style={styles.mapsIcon} />
                      <Text style={styles.optionText} numberOfLines={1}>
                        {event?.address}
                      </Text>
                    </TouchableOpacity>
                  )}



                  <View style={styles.optionWrap}>
                    <Image source={require('@assets/icons/agenda.png')} style={styles.agendaIcon} />
                    <Text style={styles.optionText} numberOfLines={1}>
                      {moment(event?.date_start).format('DD MMMM')} - {moment(event?.date_end).format('DD MMMM')}
                    </Text>
                  </View>


                </View>

              </View>
            </View>

          </View>


          <View style={{ paddingVertical: 12, paddingHorizontal: 18 }}>
            <Text style={styles.title}>
              {event?.content_title}
            </Text>
            <Text style={styles.text}>
              {event?.content}
            </Text>
          </View>


        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('EventRestaurantsStackScreen', {
          screen: 'EventRestaurants',
          params: props.route.params,
        })}
      >
        <Text style={styles.buttonText}>Show Restaurants </Text>
        <Image source={require('@assets/icons/arrow.png')} style={styles.visitIcon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7, marginRight: 21 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10, maxWidth: '90%' },
  cardHeader: { flexDirection: 'row', paddingTop: 16, paddingBottom: 14, justifyContent: 'space-between', marginHorizontal: 17, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 17, color: '#121212', width: 270 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 14, color: '#121212' },
  textCount: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 13, color: '#848484' },
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
  buttonText: { fontFamily: 'Montserrat', fontWeight: '700', fontSize: 15, color: '#F2A71D' },
  visitIcon: { width: 6, height: 9.62, marginLeft: 9 },
})