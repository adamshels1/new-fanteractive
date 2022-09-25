import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, AvarageItem } from '@components'
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
          style={{ height: 315, width: '100%' }}
        >
          <Image
            style={{ height: 315, width: '100%' }}
            source={{ uri: 'https://besthqwallpapers.com/Uploads/2-3-2019/82386/thumb2-red-bull-arena-4k-mls-empty-stadium-soccer.jpg' }}
          />
          <View style={{ height: 95, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
            <View>
              <Text style={{ fontWeight: '700', fontSize: 32, color: '#FFF' }}>Red Bull Arena</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@assets/icons/ball.png')} style={{ width: 16, height: 16 }} />
                <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 12, color: '#FFF', marginLeft: 5, textTransform: 'uppercase' }}>soccer • Harrison, NJ, USA</Text>
              </View>
            </View>
            <View style={{ height: 140, top: -80 }}>
              <Image source={require('@assets/images/337-3379384_logo-tottenham-hotspurs-tottenham-hotspurs-hd-png-download.png')} style={{ width: 42, height: 42, borderRadius: 21 }} />
              <Image source={require('@assets/images/icons8-england.png')} style={{ width: 42, height: 42, borderRadius: 21, marginTop: 9 }} />
              <Text style={{ fontFamily: 'Oswald', fontSize: 32, fontWeight: '700', marginTop: 7, color: '#FFFFFF' }}>9.2</Text>
            </View>
          </View>
        </View>



        <View style={{ paddingHorizontal: 14 }}>

          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>About Reviewer</Text>
            </TouchableOpacity>
          </View>



          <View style={{
            width: '100%',
            marginBottom: 5,
            padding: 8,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 60, height: 60, borderRadius: 30, borderRadius: 30, marginRight: 14 }}
                source={require('@assets/icons/avatar_2.png')}
              />

              <View>
                <Text style={{ fontWeight: '900', fontSize: 16, color: '#00293B', width: 200 }} numberOfLines={1}>
                  Josie Hernandez
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5.5 }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('@assets/icons/icon_1.png')} style={{ width: 15, height: 8, marginRight: 7.28 }} />
                    <Text style={{ fontWeight: '500', fontSize: 13, color: '#00293B', width: 200 }} numberOfLines={1}>
                      Senior Fanalyst
                    </Text>
                  </View>

                </View>
              </View>
            </View>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B', paddingTop: 7 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            </Text>
          </View>





          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Event Detail</Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 21 }}>
            <Text style={{ fontWeight: '500', fontSize: 12, color: '#8F9FB3', fontFamily: 'Oswald' }} numberOfLines={1}>
              Visit Date
            </Text>

            <Text style={{ fontWeight: '900', fontSize: 16, color: '#00293B' }} numberOfLines={1}>
              Sep 14, 2019
            </Text>


            <Text style={{ fontWeight: '500', fontSize: 12, color: '#8F9FB3', fontFamily: 'Oswald', marginTop: 10 }} numberOfLines={1}>
              SPORT
            </Text>

            <Text style={{ fontWeight: '900', fontSize: 16, color: '#00293B' }} numberOfLines={1}>
              Football
            </Text>


            <Image source={require('@assets/icons/callendar_bg.png')} style={{ width: 101, height: 104, position: 'absolute', right: 0, top: 17, zIndex: -1 }} />
            <Image source={require('@assets/icons/add_event.png')} style={{ width: 49, height: 49, position: 'absolute', right: 0, top: 7, zIndex: 1 }} />

          </View>




          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Authors Images</Text>
            </TouchableOpacity>
          </View>


          <FlatList
            horizontal
            data={[1, 1, 1]}
            renderItem={({ item, index }) => {
              return <Image
                style={{ height: 79, width: 140, marginRight: 15, marginTop: 18 }}
                source={{ uri: 'https://besthqwallpapers.com/Uploads/2-3-2019/82386/thumb2-red-bull-arena-4k-mls-empty-stadium-soccer.jpg' }}
              />
            }}
          />

          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Ratings survey</Text>
            </TouchableOpacity>
          </View>

          <AvarageItem
            style={{ marginTop: 14 }}
            title='Outside appearance'
            value='8.0'
            range='80'
          />

          <View style={styles.block}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B' }}>
              Strength allows him to break most arm tackles and fight for every inch, however, if he gets stronger he could be a terror on every play.
            </Text>
          </View>

          <AvarageItem
            style={{ marginTop: 14 }}
            title='Interior first impressions'
            value='5.2'
            range='52'
          />

          <AvarageItem
            title='Interior first impressions'
            value='6.7'
            range='67'
          />

          <AvarageItem
            title='Amenities/special features'
            value='2.1'
            range='21'
          />

          <AvarageItem
            title='Food & beverage'
            value='5.2'
            range='52'
          />

          <View style={styles.block}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B' }}>
              Harris has excellent hands, but his run after the catch is underwhelming, and he mainly runs bubble screens and out routes.
            </Text>
          </View>

          <View style={{ height: 50 }} />

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
  sliderTitle: { fontWeight: '800', color: '#2B2B2B', fontSize: 18, marginTop: 10 },
  sliderOptions: { flexDirection: 'row', alignItems: 'center' },
  sliderValue: { marginLeft: 26, fontFamily: 'Oswald', fontWeight: '700', fontSize: 18, color: '#2B2B2B' },
  sliderIcon: { width: 29, height: 28, marginLeft: 23 },
  block: {
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
  textWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  optionTitle: { fontWeight: '500', fontSize: 14, paddingBottom: 8, paddingLeft: 3 },
  optionValue: { fontWeight: '700', fontSize: 18 },
  gradientLine: { width: '100%', height: 6, borderRadius: 3, alignItems: 'flex-end', marginBottom: 16 },
  grayLine: { backgroundColor: '#F4F4FB', height: 6, },

  filterItem: { flexDirection: 'row', alignItems: 'center' },
  filterText: { fontWeight: '900', fontSize: 12, color: '#00293B' },
  filterIcon: { width: 7.53, height: 4.34, top: 1, marginLeft: 3.24 },
  filtersWrap: { height: 30, width: '100%', backgroundColor: '#EDF1F9', borderRadius: 3, marginTop: 29, paddingHorizontal: 11, flexDirection: 'row', justifyContent: 'space-between' },
})