import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, Text, StatusBar } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
// import Carousel, { Pagination } from 'react-native-snap-carousel'
const SCREEN_WIDTH = Dimensions.get('window').width
// import YoutubePlayer from "react-native-youtube-iframe"
import helper from '@services/helper'
import { setHideWelcomeAction } from '@redux/actions/mainActions'
import { server } from '@constants'



export default function Welcome({ route, navigation }) {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(0)

  const [screens, setScreens] = useState([])
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  // const carouselRef = useRef()

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))

      const data = await mainApi.getWelcomeScreens()
      setScreens(data)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const Screen = item => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...styles.text, marginTop: '5%', width: '90%' }}>
          {item.title}
        </Text>


        {/* {helper.getYoutubeVideoId(item.video) ? (
          <View style={styles.image2}>
            <YoutubePlayer
              videoId={helper.getYoutubeVideoId(item.video)}
              play={false}
              height={264}
              width={'100%'}
            />
          </View>
        ) : <Image style={styles.image1} source={{ uri: item.image }} />} */}

        <Text style={{ ...styles.text, marginTop: 20, width: '90%', color: '#616161', fontWeight: '700' }}>
          {item.header}
        </Text>
        <Text style={{ ...styles.text, fontSize: 20, fontWeight: '400', lineHeight: 30, width: '90%', color: '#616161', marginTop: 3 }}>
          {item.text}
        </Text>
      </View>
    )
  }


  const SCREENS = screens.map(item => <Screen {...item} />)

  const isLastScreen = activeTab === (screens.length - 1)
  // const onNext = () => {
  //   carouselRef?.current?.snapToNext()
  //   if (isLastScreen) {
  //     dispatch(setHideWelcomeAction(true))
  //   } else {
  //     setActiveTab(activeTab + 1)
  //   }
  // }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Restaurant Weeks of Atlanta'}
        navigation={navigation}
      />


      {/* <Carousel
        ref={carouselRef}
        data={SCREENS}
        renderItem={({ item }) => item}
        onSnapToItem={(i) => setActiveTab(i)}
        sliderWidth={SCREEN_WIDTH}
        itemWidth={SCREEN_WIDTH}
        slideStyle={{ width: SCREEN_WIDTH }}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />

      <Pagination
        dotsLength={SCREENS.length}
        dotStyle={{ backgroundColor: '#F2A71D' }}
        // inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        inactiveDotStyle={{ backgroundColor: '#C5C5C5' }}
        activeDotIndex={activeTab}
        containerStyle={{
        }}
      /> */}


      <Button
        style={styles.next}
        textStyle={{ color: '#F2A71D' }}
        text={isLastScreen ? `Let's started` : `Next`}
        inverter
        onPress={onNext}
        rightComponent={<Image style={styles.arrowIcon} source={require('@assets/icons/arrow-r.png')} />}
      />



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  text: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 24, color: '#121212', textAlign: 'center', lineHeight: 29.26 },
  image1: { width: 271, height: 265, marginTop: 26 },
  image2: { width: '100%', height: 264, marginTop: 29 },
  image3: { width: '100%', height: 375, marginTop: 29 },
  arrowIcon: { width: 6, height: 9.62, marginLeft: 14 },
  next: { width: '90%', marginBottom: 30 }
})