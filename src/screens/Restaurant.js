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
import { Header, Button, Text, StatusBar } from '@components'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'
import AlertAsync from 'react-native-alert-async'
// import analytics from '@react-native-firebase/analytics'


export default function Restaurant(props) {

  const dispatch = useDispatch()
  const [restaurant, setRestaurant] = useState(null)
  const isLoading = useSelector(state => state.loaderReducer.isLoading)

  useEffect(() => {
    getRestaurant()
  }, []);

  const getRestaurant = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      console.log(props.route.params)
      const restaurant = await mainApi.getRestaurant(props.route.params.restaurant.id)
      console.log('restaurant', restaurant)
      setRestaurant(restaurant)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const logoSource = restaurant?.logo ? { uri: restaurant?.logo } : require('@assets/images/no_logo.png');

  const onWebsite = async () => {
    try {
      if (!restaurant?.website) return
      Linking.openURL(restaurant?.website)
      // await analytics().logEvent('Restaurant_Website_call', {
      //   website: restaurant?.website,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }


  const onPhone = async () => {
    try {
      if (!restaurant?.phone_number) return
      Linking.openURL(restaurant?.phone_number?.url)
      // await analytics().logEvent('Restaurant_Phone_call', {
      //   phone_number: restaurant?.phone_number?.title,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }

  const onAddress = async () => {
    try {
      if (!restaurant?.address) return
      Linking.openURL('https://www.google.com/maps/place/' + restaurant?.address)
      // await analytics().logEvent('Restaurant_Maps_call', {
      //   map_link: 'https://www.google.com/maps/place/' + restaurant?.address,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }

  const renderContent = (restaurant) => {
    if (restaurant) return (
      <View>
        {restaurant?.address ? (
          <TouchableOpacity onPress={onAddress} style={styles.optionWrap}>
            <Image source={require('@assets/icons/maps.png')} style={styles.mapsIcon} />
            <Text style={styles.optionText} numberOfLines={1}>
              {restaurant?.address}
            </Text>
          </TouchableOpacity>
        ) : null}

        {restaurant?.website ? (
          <TouchableOpacity onPress={onWebsite} style={styles.optionWrap}>
            <Image source={require('@assets/icons/web.png')} style={{ width: 11.84, height: 11.53 }} />
            <Text style={styles.optionText} numberOfLines={1}>
              {restaurant?.website}
            </Text>
          </TouchableOpacity>
        ) : null}

        {restaurant?.phone_number ? (
          <TouchableOpacity onPress={onPhone} style={styles.optionWrap}>
            <Image source={require('@assets/icons/phone.png')} style={{ width: 10, height: 10 }} />
            <Text style={styles.optionText} numberOfLines={1}>
              {restaurant?.phone_number?.title}
            </Text>
          </TouchableOpacity>
        ) : null}


        <View style={{ marginTop: 17 }}>
          <Text style={styles.text}>
            {restaurant?.content}
          </Text>
        </View>

        <Button
          style={{ marginTop: 23 }}
          text='Featured Specials'
          onPress={() => (restaurant?.menu_link?.url || restaurant?.menu_link) ? Linking.openURL(restaurant?.menu_link?.url || restaurant?.menu_link) : AlertAsync('Cooming soon')}
          textStyle={{ fontWeight: '700' }}
        />


        <View style={{ marginTop: 29, flexDirection: 'row', justifyContent: 'space-between' }}>
          {restaurant?.phone_number?.url ? (
            <Button
              text='Call'
              inverter
              onPress={onPhone}
              style={{ width: '48%' }}
              textStyle={{ color: '#121212' }}
            />
          ) : null}

          {restaurant?.website ? (
            <Button
              text='Website'
              inverter
              onPress={onWebsite}
              style={{ width: '48%' }}
            />
          ) : null}

        </View>
        <View style={{ height: 200 }} />
      </View>
    )

    if (!isLoading) return (
      <View>
        <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('@assets/icons/coming-soon.png')} style={{ width: 164, height: 164 }} />

        </View>
        <Button
          text='Back to app'
          inverter
          onPress={() => navigation.navigate('Login')}
          textStyle={{ color: '#121212' }}
        />
      </View>
    )

    return null
  }

  return (
    <View>

      <StatusBar barStyle='dark-content' />
      <Header
        title='Restaurant Information'
        goBack={props.navigation.goBack}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />


      <ScrollView
        style={{ backgroundColor: '#fff', height: '100%' }}
      >


        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Image
                style={styles.image}
                source={logoSource}
                resizeMode='contain'
              />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center' }}>
              <Text style={styles.title}>
                {restaurant?.title}
              </Text>
              <Text style={styles.subTitle}>
                {restaurant?.short_description}
              </Text>



              <View style={{ flexDirection: 'row' }}>
                {restaurant?.mealtimes && restaurant.mealtimes.map((i, key) => {
                  return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.tag}>
                      {i}
                    </Text>
                    {(restaurant?.mealtimes?.length !== key + 1) && (
                      <View style={styles.tagIcon} />
                    )}
                  </View>
                })}
              </View>
            </View>
          </View>


          {renderContent(restaurant)}

        </View>



      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({


  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10, width: 230 },
  container: { width: '100%', paddingTop: 16, paddingBottom: 16, paddingHorizontal: 17, backgroundColor: '#fff' },
  image: { width: 68, height: 68, marginRight: 15 },
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

  title: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 18, color: '#121212', maxWidth: '100%' },
  subTitle: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 12, color: '#121212', marginTop: 4 },
  tag: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 12, color: '#626262', marginTop: 4 },
  tagIcon: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#F2A71D', marginHorizontal: 8 },
})