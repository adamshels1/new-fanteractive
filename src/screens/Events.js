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
  FlatList,
  RefreshControl
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, ExploreListItem, LoginModal, EventListItem, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import { inlineStyles } from 'react-native-svg'
import LookupModal from 'react-native-lookup-modal'
import _ from 'lodash'
import helper from '@services/helper'
import { loaderAction } from '@redux/actions/loaderActions'

export default function Restaurants(props) {
  const dispatch = useDispatch()
  const [cities, setCities] = useState([])
  const [city, setCity] = useState(null)
  const [date, setDate] = useState(null)
  const [dates, setDates] = useState([])
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [currentIndexDate, setCurrentIndexDate] = useState(0)
  const refDates = useRef(null);

  useEffect(()=>{
    const getData = async () => {
      await getEvents()
  
      const cities = await mainApi.getCities()
      setCities(cities)
  
      const dates = await mainApi.getDates()
      setDates(dates)
  
    }
    getData()
  }, []);

  const getEvents = async (params = {}) => {
    try {
      setPage(1)
      dispatch(loaderAction({ isLoading: true }))
      const events = await mainApi.getEvents(params)
      setEvents(Array.isArray(events?.posts) && events.posts)
      setPage(2)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const getEventsNextPage = async () => {
    try {
      let params = {
        page
      }
      if (date) {
        params.date = date
      }
      if (city?.id) {
        params.city_id = city?.id
      }
      const events = await mainApi.getEvents(params)
      if (events?.posts?.length) {
        setEvents([...events, ...events.posts])
        setPage(page + 1)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const onCity = async (city) => {
    await helper.sleep(300)
    setCity(city)
    let params = {
      page: 1,
      city_id: city?.id
    };
    if (date) {
      params.date = date
    }
    await getEvents(params)
  }

  const onDate = async (date) => {
    setDate(date)
    let params = {
      page: 1,
      date
    };
    if (city?.id) {
      params.city_id = city?.id
    }
    await getEvents(params)
  }

  const renderItem = ({ item }) => {
    const borderColor = item?.date === date ? '#F2A71D' : 'rgba(0,0,0,0)'
    return (
      <TouchableOpacity
        style={[styles.wrapDate, { borderColor }]}
        onPress={() => onDate(item.date)}
      >
        <Text style={styles.dateText}>
          {item?.label}
        </Text>
      </TouchableOpacity>
    )
  }


  // const months = dates?.months && _.map(dates?.months, (v, k) => ({ k, v }))
  const months = dates?.months?.length ? dates?.months : []

  const _onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
    try {
      console.log("Visible items are", viewableItems.length && viewableItems[2]?.index);
      const index = viewableItems.length && viewableItems[2]?.index;
      setCurrentIndexDate(index)
    } catch (e) {
      console.log(e.message)
    }
  }, [])

  onArrowMonths = direction => {
    try {
      if (direction === 'right') {
        refDates.current.scrollToIndex({ index: months.length > currentIndexDate ? currentIndexDate + 1 : currentIndexDate })
      } else {
        refDates.current.scrollToIndex({ index: (currentIndexDate - 4) < 0 ? 0 : (currentIndexDate - 4) })
      }
    } catch (e) {

    }
  }

  const headerComponent = () => {
    return (
      <View>

        <View style={styles.cardHader}>
          <Image source={require('@assets/images/image_31.png')} style={styles.image31} />
          <View style={styles.cardHeaderOvarlay} />

          <Image source={require('@assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.textTitle}>
            Restaurant Weeks {`\n`}of Atlanta
          </Text>

        </View>
        <TouchableOpacity style={styles.cityWrap}>


          <View style={styles.input}>
            <View style={styles.wrapFiedl}>
              <Text style={styles.textFiedl}>
                City
              </Text>
            </View>
            <LookupModal
              contentStyle={styles.lookumContentStyle}
              selectButtonTextStyle={styles.cityButtonText}
              data={cities}
              value={city}
              onSelect={onCity}
              displayKey={"name"}
              selectText='Please select'
              itemStyle={styles.lookumItemStyle}
              itemTextStyle={styles.lookumItemTextStyle}
            />

          </View>
        </TouchableOpacity>


        <View style={styles.search}>

          <TouchableOpacity
            style={styles.arrowWrap}
            onPress={() => onArrowMonths('left')}
          >
            <Image source={require('@assets/icons/arrow-l.png')} style={styles.arrowIcon} />
          </TouchableOpacity>

          <FlatList
            ref={refDates}
            onViewableItemsChanged={_onViewableItemsChanged}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ marginTop: 11 }}
            data={months}
            keyExtractor={(item, index) => 'date-' + index}
            renderItem={renderItem}
          />


          <TouchableOpacity
            onPress={() => onArrowMonths('right')}
            style={styles.arrowWrap}
          >
            <Image source={require('@assets/icons/arrow-r.png')} style={styles.arrowIcon} />
          </TouchableOpacity>

        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='All Events'
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />

      {headerComponent()}

      <FlatList
        style={styles.cardBody}
        showsVerticalScrollIndicator={false}
        data={events}
        keyExtractor={(item, index) => 'event-' + index}
        renderItem={({ item }) => {
          return <EventListItem
            {...item}
            onPress={() => props.navigation.navigate('EventTabs', {
              screen: 'Event',
              params: { event: item },
            })}
          />
        }}
        onEndReached={getEventsNextPage}
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

  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7, marginRight: 27 },
  optionText: { fontFamily: 'Avenir', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10 },
  cardHeader: { width: '100%', flexDirection: 'row', paddingTop: 16, paddingBottom: 14, justifyContent: 'space-between', paddingHorizontal: 17 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 18, color: '#121212' },
  text: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14, color: '#121212' },
  textCount: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 13, color: '#848484' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 },
  moreIcon: { width: 4, height: 22 },
  mapsIcon: { width: 10, height: 13 },
  agendaIcon: { width: 12, height: 12 },
  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 },

  cityWrap: {
    paddingTop: 28,
    paddingHorizontal: 17,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 82,
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.22,

    elevation: 3,
  },
  buttonText: { fontFamily: 'Avenir', fontWeight: '700', fontSize: 15, color: '#F2A71D' },

  textTitle: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 14, color: '#FFFFFF', zIndex: 1, textAlign: 'center', marginTop: 30 },
  image31: { width: '100%', height: 150, position: 'absolute' },
  cardHader: { width: '100%', height: 150, alignItems: 'center' },
  cardHeaderOvarlay: { width: '100%', height: 150, backgroundColor: 'rgba(0,0,0,0.6)', position: 'absolute', zIndex: 1 },
  logo: { width: 59, height: 59, zIndex: 1, top: 22 },
  video: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 18 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', width: '70%' },
  arrowIcon: { width: 6, height: 10, marginLeft: 9 },

  input: { width: '100%', height: 55, borderRadius: 5, borderWidth: 1, paddingHorizontal: 15, fontSize: 14, borderColor: '#B7B7B7', marginBottom: 24, justifyContent: 'center' },
  wrapFiedl: { position: 'absolute', top: -9, left: 18, backgroundColor: '#FFF', zIndex: 9, paddingHorizontal: 5 },
  textFiedl: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 14, color: '#7A7A7A' },

  cardBody: { marginTop: 11, backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 17, minHeight: 200 },
  cityButtonText: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 14, color: '#747272' },
  arrowWrap: { width: 20, height: 30, justifyContent: 'center', alignItems: 'center' },
  arrowIcon: { width: 6, height: 10 },
  wrapDate: { marginHorizontal: 20, borderBottomWidth: 1, borderColor: '#F2A71D', paddingBottom: 7 },
  dateText: { color: '#121212', fontFamily: 'Avenir', fontWeight: '400', },
  search: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', paddingHorizontal: 12, marginTop: 22 },

  lookumItemStyle: { borderBottomWidth: 1, borderBottomColor: '#DCDCDC', height: 49, justifyContent: 'center' },
  lookumItemTextStyle: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14 },
  lookumContentStyle: { height: '80%', borderRadius: 12 }
})