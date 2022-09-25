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
import { Header, RestaurantListItem, Text } from '@components'
import { mainApi } from '@api';

export default function Restaurants({ navigation }) {
  const [restaurants, setRestaurants] = useState([])
  useEffect(()=>{
    const getData = async () => {
      const restaurants = await mainApi.getRestaurants();
      setRestaurants(restaurants);
    }
    getData()
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Participating Restaurants'
        showMenu
        navigation={navigation}
      />

      <FlatList
        style={{ marginTop: 11 }}
        data={restaurants}
        keyExtractor={(item, index) => 'restaurant-' + item.id}
        renderItem={({ item }) => <RestaurantListItem
          {...item}
          onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}
        />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  body: { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 17, flex: 1 },
  bodyTop: { marginTop: 46, alignItems: 'center' },
  bodyBottom: { marginTop: 70, width: '100%' },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 24, color: '#121212' },
  desc: { marginTop: 30, fontFamily: 'Avenir', fontWeight: '400', color: '#7A7A7A', fontSize: 16, textAlign: 'center', lineHeight: 27 },
  image: { width: 81, height: 81, marginTop: 40 },
  confirmButton: { marginTop: 27, marginBottom: 50 },
  sendAgainText: { color: '#F2A71D', fontFamily: 'Avenir', fontWeight: '600', fontSize: 14 },
  sendAgain: { alignItems: 'center', marginTop: 40 },
})