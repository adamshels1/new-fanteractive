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
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={title}
        navigation={navigation}
        goBack={navigation.goBack}
      />
      <ScrollView>
        <View
          style={{ height: 353, width: '100%' }}
        >
          <Image
            style={{ height: 353, width: '100%' }}
            source={{ uri: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt6ba33b35a143d067/60effe93f101cd22d91c320e/3d2b8d0b5a8ed594a2bf5c324547b22c7dfbebb2.jpg' }}
          />

          <View style={{ position: 'absolute', zIndex: 1, top: 14, left: 15, flexDirection: 'row' }}>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2, backgroundColor: '#5FC521', borderRadius: 2, marginRight: 10 }}>
              <Text style={{ fontWeight: '900', fontSize: 12, color: '#FFF', textTransform: 'uppercase' }}>FOOTBALL</Text>
            </View>

          </View>

          <View style={{ maxHeight: 216, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingRight: 14, paddingTop: 15, paddingBottom: 17 }}>
            <Text style={{ fontWeight: '800', fontSize: 28, color: '#FFF', lineHeight: 38.25 }} numberOfLines={3}>
              Ibrahimovic double defeats Cagliari as Milan restore three-point lead at the top
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 19 }}>
              <Image source={require('@assets/icons/clock.png')} style={{ width: 16, height: 16 }} />
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF', marginLeft: 5 }}>9 May 2020</Text>
              <Image source={require('@assets/icons/message.png')} style={{ width: 16, height: 17, marginLeft: 13 }} />
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF', marginLeft: 7 }}>23</Text>
            </View>

          </View>
        </View>


        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 21, paddingTop: 18 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: 14, color: '#7D86A9', marginRight: 7 }}>By</Text>
              <Image source={require('@assets/icons/avatar_2.png')} style={{ width: 22, height: 22, borderRadius: 11 }} />
              <Text style={{ fontWeight: '900', fontSize: 14, color: '#00293B', marginLeft: 7 }}>
                Josie Hernandez
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: 14, color: '#7D86A9', marginRight: 7 }}>Share:</Text>
              <Image source={require('@assets/icons/facebook_2.png')} style={{ width: 20, height: 20, borderRadius: 18.5, marginRight: 10 }} />
              <Image source={require('@assets/icons/twitter.png')} style={{ width: 20, height: 16 }} />
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: '#00293B', opacity: 0.19, marginTop: 20, marginLeft: 18 }} />
        </View>


        <Text style={{ fontFamily: 'Avenir', fontWeight: '800', color: '#00293B', fontSize: 24, marginTop: 14, marginLeft: 21, marginRight: 21 }}>
          Zlatan Ibrahimovic scored twice on his first Serie A start since returning from injury to help Milan restore their three-point lead at the top with a 2-0 win at Cagliari.
        </Text>

        <Text style={{ fontFamily: 'Avenir', fontWeight: '400', color: '#000000', fontSize: 16, marginTop: 14, marginLeft: 21, marginRight: 21 }}>
          The 39-year-old forward has been absent since picking up a thigh injury in Milan’s win at Napoli on 22 November. He returned as a substitute against Torino in the Coppa Italia last week, but was fit enough to start in Sardinia and wasted no time in getting back among the goals.

          Ibrahimovic won a penalty in the seventh minute after latching on to Brahim Díaz’s through ball and going down under Charalampos Lykogiannis’ challenge. The evergreen Swede converted the spot kick to earn an early lead for Milan, who were missing Hakan Calhanoglu and Theo Hernández after positive Covid-19 tests.

          Davide Calabria went close with two efforts from distance in the first half, drawing a fine save from Alessio Cragno before hitting the post with his second attempt. Ibrahimovic doubled Milan’s lead in the second half after running on to Calabria’s pass. The striker was initially flagged offside, but the VAR overturned the decision and awarded the goal.

          Ibrahimovic’s double takes his Serie A goal tally to 12 for the season from just seven starts. It is little wonder that Milan are reportedly prepared to extend his contract beyond his 40th birthday in October. Victory moves Milan three points clear of Internazionale, who had pulled level on points with their 2-0 win over Juventus on Sunday.
        </Text>

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