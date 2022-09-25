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
import { Header, ExploreListItem, LoginModal, TopTabs, PointListItem, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'
import moment from 'moment'


const Empty = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ width: 217, height: 201, marginTop: 75 }} resizeMode='contain' source={require('@assets/images/rew.png')} />
      <Text style={{ fontWeight: '400', fontSize: 24, color: '#121212', marginTop: 21, textAlign: 'center', width: 276 }}>You have no Rewards Points yet</Text>
    </View>
  )
}

export default function EventPoints(props) {
  const dispatch = useDispatch()
  const [points, setPoints] = useState([])
  const [types, setTypes] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [totalPoints, setTotalPoints] = useState(null)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const event = useSelector(state => state.mainReducer.event)

  useEffect( () => {
    getData(true)
  }, []);

  const getData = async (type) => {
    try {
      dispatch(loaderAction({ isLoading: true }))

      const data = await mainApi.getEventHistoryPoints({
        user_id: user?.userId,
        token,
        event_id: event.id,
        type
      })
      setPoints(data?.entries)
      setTypes(data?.types)
      setTotalPoints(data?.user?.total_points)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const tabs = types && types.map((type, key) => {
    return {
      text: type.label,
      onPress: async () => {
        setActiveTab(key)
        await getData(type.value)
      }
    }
  })

  const logoSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_image.png');

  const eventCity = event?.cities ? event?.cities[0]?.city_name : event?.city

  console.log('points', points)

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='QR Code points'
        goBack={props.navigation.goBack}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />



      {/* <TopTabs
        activeTab={activeTab}
        tabs={tabs}
      /> */}

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
                  {eventCity}
                </Text>
              </View>


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


      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={points && points}
        keyExtractor={(item, index) => 'point-' + index}
        renderItem={({ item }) => {
          return <PointListItem {...item} />
        }}
        ListFooterComponent={<View style={{ height: 50 }} />}
        ListEmptyComponent={<Empty />}
      />



      <TouchableOpacity onPress={() => props.navigation.navigate('HistoryPoints')} style={styles.button}>
        <Text style={styles.buttonText}>View all Rewards </Text>
      </TouchableOpacity>
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
  title: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 15, color: '#121212', marginBottom: 7, width: '90%' },
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
  list: { marginTop: 6, paddingHorizontal: 17, marginTop: 13 },
})