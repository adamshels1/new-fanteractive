import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import moment from 'moment';
import AutoHeightWebView from 'react-native-autoheight-webview'
import Share from 'react-native-share'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { server } from '@constants'

export default function About({ route, navigation }) {
  // const dispatch = useDispatch()
  const [page, setPage] = useState({})
  // useEffect(async () => {
  //   try {
  //     dispatch(loaderAction({ isLoading: true }))
  //     const page = await mainApi.getPage({ id: 1065 });
  //     setPage(page);
  //     dispatch(loaderAction({ isLoading: false }))
  //   } catch (e) {
  //     dispatch(loaderAction({ isLoading: false }))
  //   }
  // }, []);
  const { title = '', content = '' } = page;
  const item = route?.params?.item
  console.log('item', item)


  const onShare = async (socialType = Share.Social.FACEBOOK) => {
    try {
      const shareOptions = {
        title: item?.title,
        message: item?.summary,
        url: `${server.BASE_URL}arcticle/${item?.slug}`,
        social: socialType,
      };

      const shareResponse = await Share.shareSingle(shareOptions);
    } catch (e) {
      console.log('e', e)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        // title={title}
        navigation={navigation}
        goBack={navigation.goBack}
      />
      <ScrollView>
        <View
          style={{ height: 353, width: '100%' }}
        >
          <Image
            style={{ height: 353, width: '100%', backgroundColor: 'gray' }}
            source={{ uri: item?.thumbnail?.url }}
          />

          <View style={{ position: 'absolute', zIndex: 1, top: 14, left: 15, flexDirection: 'row' }}>

            {item?.sports?.map(i => {
              return (
                <View key={i.id} style={{ paddingHorizontal: 5, paddingVertical: 2, backgroundColor: '#5FC521', borderRadius: 2, marginRight: 10 }}>
                  <Text style={{ fontWeight: '900', fontSize: 12, color: '#FFF', textTransform: 'uppercase' }}>
                    {i?.name}
                  </Text>
                </View>
              )
            })}


          </View>

          <View style={{ maxHeight: 216, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingRight: 14, paddingTop: 15, paddingBottom: 17 }}>
            <Text style={{ fontWeight: '800', fontSize: 28, color: '#FFF', lineHeight: 38.25 }} numberOfLines={3}>
              {item?.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 19 }}>
              <Image source={require('@assets/icons/clock.png')} style={{ width: 16, height: 16 }} />
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF', marginLeft: 5 }}>
                {moment(item?.published).format('DD MMM, YYYY')}
              </Text>
              <Image source={require('@assets/icons/message.png')} style={{ width: 16, height: 17, marginLeft: 13 }} />
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF', marginLeft: 7 }}>23</Text>
            </View>

          </View>
        </View>


        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 21, paddingTop: 18 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: 14, color: '#7D86A9', marginRight: 7 }}>By</Text>
              <Image source={{ uri: item?.author?.thumbnail?.url }} style={{ width: 22, height: 22, borderRadius: 11 }} />
              <Text style={{ fontWeight: '900', fontSize: 14, color: '#00293B', marginLeft: 7 }}>
                {item?.author?.full_name}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: 14, color: '#7D86A9', marginRight: 7 }}>Share:</Text>

              <TouchableOpacity onPress={() => onShare(Share.Social.FACEBOOK)}>
                <Image source={require('@assets/icons/facebook_2.png')} style={{ width: 20, height: 20, borderRadius: 18.5, marginRight: 10 }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onShare(Share.Social.TWITTER)}>
                <Image source={require('@assets/icons/twitter.png')} style={{ width: 20, height: 16 }} />
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ height: 1, backgroundColor: '#00293B', opacity: 0.19, marginTop: 20, marginLeft: 18 }} />
        </View>


        <Text style={{ fontFamily: 'Avenir', fontWeight: '800', color: '#00293B', fontSize: 24, marginTop: 14, marginLeft: 21, marginRight: 21 }}>
          {item?.summary}
        </Text>


        <AutoHeightWebView
          style={{ width: '90%', marginTop: 14, marginLeft: 21, marginRight: 21 }}
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
            html: `${item?.content} 
                      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                      <link href='https://fonts.googleapis.com/css?family=Avenir' rel='stylesheet'>
                      <style>
                      body {
                        font-family: Avenir;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 23px;
                        letter-spacing: 0px;
                        text-align: left;
                        color: #000000;
                      }
                      iframe {
                        width: 100%;
                        height: 75vw;
                      }
                      </style>
                    `
          }}
        />

        <View style={{ height: 100 }}></View>


      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  sliderTitle: { fontWeight: '800', color: '#2B2B2B', fontSize: 18, marginTop: 10 },
  sliderOptions: { flexDirection: 'row', alignItems: 'center' },
  sliderValue: { marginLeft: 26, fontFamily: 'Oswald', fontWeight: '700', fontSize: 18, color: '#2B2B2B' },
  sliderIcon: { width: 29, height: 28, marginLeft: 23 },
  block: {
    height: 118,
    width: '100%',
    marginTop: 17,
    marginBottom: 10,
    padding: 13,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.22,

    elevation: 3,
  },
  writeFieldTitle: { fontWeight: '800', fontSize: 12, color: '#00293B', position: 'absolute', backgroundColor: '#fff', top: 5, left: 25, zIndex: 1 },
  writeInput: { borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.32)', borderRadius: 4, height: 86, padding: 11, paddingTop: 11, fontWeight: '400', fontSize: 16, color: '#00293B' },
})