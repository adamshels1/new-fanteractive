import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Linking
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Input, Button, StatusBar, Text } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
// import YoutubePlayer from "react-native-youtube-iframe"
import helper from '@services/helper'
import { server } from '@constants'
import { WebView } from 'react-native-webview'
import AutoHeightWebView from 'react-native-autoheight-webview'

export default function FAQ({ route, navigation }) {
  const [activeFaq, setActiveFaq] = useState(0)
  const event = useSelector(state => state.mainReducer.event)

  const onFaq = index => {
    if (activeFaq === index) {
      setActiveFaq(null)
    } else {
      setActiveFaq(index)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Event FAQ'}
        goBack={navigation.goBack}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
      />


      <FlatList
        showsVerticalScrollIndicator={false}
        data={event?.faqs ? event?.faqs : []}
        keyExtractor={(item, index) => 'faq-' + index}
        renderItem={({ item, index }) => {
          const arrowIcon = activeFaq === index ? require('@assets/icons/arrow-up.png') : require('@assets/icons/arrow-down.png')
          return (
            <View style={styles.item}>

              <TouchableOpacity
                onPress={() => onFaq(index)}
                style={styles.titleWrap}
              >
                <Text style={styles.title}>
                  {item.question}
                </Text>
                <Image style={styles.arrow} source={arrowIcon} />
              </TouchableOpacity>
              {activeFaq === index && (
                <View>

                  {item?.image && (
                    <Image style={styles.image} resizeMode='contain' source={{ uri: item?.image }} />
                  )}
{/* 
                  {helper.getYoutubeVideoId(item?.video) && (
                    <View style={styles.image}>
                      <YoutubePlayer
                        videoId={helper.getYoutubeVideoId(item.video)}
                        play={false}
                        height={201}
                        width={'100%'}
                      />
                    </View>

                  )} */}

                  {/* <Text style={styles.text}>
                    {item?.answer}
                  </Text> */}
                  <AutoHeightWebView
                    style={{ width: '100%', marginBottom: 15 }}
                    originWhitelist={['*']}
                    onShouldStartLoadWithRequest={event => {
                      console.log('event', event)
                      if (event?.navigationType === 'click' && event?.url) {
                        Linking.openURL(event.url)
                        return false
                      }
                      return true
                    }}
                    source={{
                      html: `${item?.answer} 
                      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                      <link href='https://fonts.googleapis.com/css?family=Avenir' rel='stylesheet'>
                      <style>
                      body {
                        font-family: Avenir;
                        font-size: 15px;
                        font-weight: 400;
                        line-height: 23px;
                        letter-spacing: 0px;
                        text-align: left;
                        color: #121212;
                      }
                      iframe {
                        width: 100%;
                        height: 75vw;
                      }
                      </style>
                    `
                    }}
                  />
                </View>
              )}


            </View>
          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: { width: 341, height: 201, marginBottom: 19 },
  title: { fontFamily: 'Avenir', color: '#121212', fontWeight: '400', fontSize: 18, width: '96%' },
  text: { fontFamily: 'Avenir', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingBottom: 19 },
  titleWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 19, paddingTop: 23 },
  item: { marginHorizontal: 18, borderColor: '#E2E2E2', borderBottomWidth: 1 },
  arrow: { width: 10, height: 6 },
})