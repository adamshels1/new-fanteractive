import React, { useState, useEffect, useRef } from 'react'
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
import { Header, ExploreListItem, LoginModal, TopTabs, ParticipatingListItem, StatusBar, Text } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import moment from 'moment'

export default function Restaurants(props) {

  const dispatch = useDispatch()
  const [restaurants, setRestaurants] = useState(null)
  const [event, setEvent] = useState(null)
  const [mealtimes, setMealtimes] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [page, setPage] = useState(1)
  const eventData = useSelector(state => state.mainReducer.event)


  useEffect(() => {
    getRestaurants()
  }, []);

  const getRestaurants = async (mealtime) => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      setRestaurants([])
      let params = {
        event: eventData.id,
        page: 1
      }
      if (mealtime && mealtime !== 'All') {
        params.mealtime = mealtime
      }
      const data = await mainApi.getEventRestaurants(params)
      setRestaurants(data.restaurants)
      setEvent(data.event)
      setMealtimes(['All', ...data.mealtimes])
      setPage(2)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const getRestaurantsNextPage = async () => {
    try {
      const mealtime = mealtimes[activeTab]
      let params = {
        event: eventData.id,
        page
      }
      if (mealtime && mealtime !== 'All') {
        params.mealtime = mealtime
      }
      const data = await mainApi.getEventRestaurants(params)
      if (data.restaurants.length) {
        setRestaurants([...data.restaurants])
        setPage(page + 1)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const tabs = mealtimes.map((mealtime, key) => {
    return {
      text: mealtime,
      onPress: async () => {
        setActiveTab(key)
        await getRestaurants(mealtime)
      }
    }
  })

  const logoSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_image.png');

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Participating Restaurants'}
        showMenu
        goBack={props.navigation.goBack}
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />



      <TopTabs
        activeTab={activeTab}
        tabs={tabs}
      />

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

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.optionWrap}>
                <Image source={require('@assets/icons/maps.png')} style={styles.mapsIcon} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {event?.cities && event?.cities[0]?.city_name}
                </Text>
              </View>


              <View style={styles.optionWrap}>
                <Image source={require('@assets/icons/agenda.png')} style={styles.agendaIcon} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {moment(event?.date_from).format('DD MMMM')} - {moment(event?.date_to).format('DD MMMM')}
                </Text>
              </View>


            </View>

          </View>
        </View>

      </View>

      <FlatList
        style={{ marginTop: 6 }}
        showsVerticalScrollIndicator={false}
        data={restaurants}
        keyExtractor={(item, index) => 'restaurants-' + item.id}
        renderItem={({ item }) => {
          return <ParticipatingListItem
            {...item}
            onPress={() => props.navigation.navigate('Restaurant', { restaurant: item })}
          />
        }}
        onEndReached={getRestaurantsNextPage}
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
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 7 },
  image: { width: 46, height: 46, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 15, color: '#121212', marginBottom: 7, width: '100%' },
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
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.22,

    elevation: 3,
  },
})