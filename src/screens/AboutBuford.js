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

export default function About({ route, navigation }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState({})
  useEffect(()=>{
    const getData = async () => {
      try {
        dispatch(loaderAction({ isLoading: true }))
        const page = await mainApi.getPage({ id: 1067 });
        setPage(page);
        dispatch(loaderAction({ isLoading: false }))
      } catch (e) {
        dispatch(loaderAction({ isLoading: false }))
      }
    }
    getData()
  }, []);
  const { title = '', content = '' } = page;
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={title}
        goBack={navigation.goBack}
      />
      <ScrollView>
        <View style={{ paddingVertical: 26, paddingHorizontal: 17 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24 }}>
              {title}
            </Text>
            <Image style={{ width: 22, height: 25 }} resizeMode='contain' source={require('@assets/icons/chat.png')} />
          </View>

          <Text style={{ fontFamily: 'Montserrat', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 }}>
            {content}
          </Text>

        </View>
      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})