import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import { WebView } from 'react-native-webview';

export default function About({ route, navigation }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState({})
  // useEffect(async () => {

  // }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        dispatch(loaderAction({ isLoading: true }))
        const page = await mainApi.getPage({ title: route?.params?.title });
        setPage(page);
        dispatch(loaderAction({ isLoading: false }))
      } catch (e) {
        dispatch(loaderAction({ isLoading: false }))
      }
    });

    return unsubscribe;
  }, [navigation]);

  const { title = '', content = '' } = page;
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={title}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
        goBack={route?.params?.showBack && navigation.goBack}
      />
      <View style={{ paddingVertical: 26, paddingHorizontal: 17, flex: 1 }}>

        <WebView
          style={{ width: '100%' }}
          originWhitelist={['*']}
          source={{
            html: `${content} 
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
            <style>
            body {
              font-family: Montserrat;
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

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})