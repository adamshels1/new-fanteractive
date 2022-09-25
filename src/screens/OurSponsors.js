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
  FlatList,
  SectionList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, ExploreListItem, LoginModal, TopTabs, ParticipatingListItem, StatusBar, Text, SponsorListItem } from '@components'
import { mainApi } from '@api'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { loaderAction } from '@redux/actions/loaderActions'
import moment from 'moment'
import _ from 'lodash'
// import analytics from '@react-native-firebase/analytics'

export default function OurSponsors(props) {
  const dispatch = useDispatch()
  const [sponsors, setSponsors] = useState([])
  const eventData = useSelector(state => state.mainReducer.event)


  useEffect(() => {
    getSponsors()
  }, []);

  const getSponsors = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.getSponsors({ eventId: eventData.id })
      setSponsors(data)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }


  const groupByType = [
    {
      title: 'Platinum',
      data: sponsors.filter(i => i.rating.label === 'Platinum')
    },
    {
      title: 'Gold',
      data: sponsors.filter(i => i.rating.label === 'Gold')
    },
    {
      title: 'Silver',
      data: sponsors.filter(i => i.rating.label === 'Silver')
    },
  ]

  const onSponsor = async sponsor => {
    try {
      if (sponsor?.rating?.label === 'Silver') {
        Linking.openURL(sponsor?.website)
        return
      }
      props.navigation.navigate('Sponsor', { sponsor })
      // await analytics().logEvent('Sponsor_BTN_See_More', {
      //   id: sponsor.id,
      //   title: sponsor.title
      // })
    } catch (e) {

    }
  }


  const renderSectionHeader = ({ section: { title, data } }) => {
    if (!data?.length) return null
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.platinum}>
          {title}
        </Text>
        {/* <AirbnbRating
        defaultRating={3}
        count={3}
        isDisabled
        showRating={false}
        size={14}
        selectedColor='#8EBCF2'
      /> */}
      </View>
    )
  }


  return (
    <View style={styles.container}>

      <StatusBar barStyle='dark-content' />
      <Header
        title={eventData?.title}
        showMenu
        goBack={props.navigation.goBack}
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('BecomeSponsor')}
        style={{ alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)', paddingBottom: 10 }}
      >
        <View style={styles.becomeButton}>
          <Image source={require('@assets/icons/deal.png')} style={{ width: 18, height: 18 }} />
          <Text style={styles.becom}>Become a Sponsor</Text>
          <Image source={require('@assets/icons/plus.png')} style={{ width: 18, height: 18 }} />
        </View>
      </TouchableOpacity>

      {groupByType && (
        <SectionList
          sections={groupByType}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: 17 }}>
              <SponsorListItem
                {...item}
                type={item?.rating?.label}
                onPress={() => onSponsor(item)}
              />
            </View>
          )}
          renderSectionHeader={renderSectionHeader}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  optionWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 21 },
  optionText: { fontFamily: 'Avenir', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 7 },

  title: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 15, color: '#121212', marginBottom: 7 },

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

  becomeButton: {
    width: 194,
    height: 28,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  becom: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 12, color: '#121212', paddingHorizontal: 6 },
  platinum: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 16, color: '#121212', marginLeft: 14 },
  sponsorLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  sponsorName: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 18, color: '#121212', marginBottom: 4 },
  sponsorType: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 13, color: '#8EBCF2' },
  text: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14, color: '#121212' },

  sponsor: { backgroundColor: '#fff', marginTop: 12, borderRadius: 15, borderColor: '#95C6FF', borderWidth: 1 },
  sponsorImage: { width: '100%', height: 204, borderTopRightRadius: 15, borderTopLeftRadius: 15 },
  sponsorHeader: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 18 },
  arrowGray: { width: 6, height: 10, position: 'absolute', right: 19, top: 38 },
  line: { backgroundColor: '#E2E2E2', height: 1 },
  sponsorFooter: { marginTop: 2, padding: 12 },
  sectionHeader: { flexDirection: 'row', paddingLeft: 16, backgroundColor: '#F4F4F4', height: 40, alignItems: 'center', paddingTop: 0 }
})