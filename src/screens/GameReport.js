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
          style={{ height: 356, width: '100%' }}
        >
          <Image
            style={{ height: 356, width: '100%' }}
            source={require('@assets/images/game_bg.png')}
          />
          <View style={{ height: 356, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15, alignItems: 'center', paddingRight: 20 }}>

            <Text style={{ fontWeight: '900', fontSize: 14, color: '#FFF', textAlign: 'center', marginTop: 15 }}>
              League: National Football League <Text style={{ fontWeight: '300' }}>(2020/21)</Text>
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 22 }}>
              <Image source={require('@assets/icons/star_2.png')} style={{ width: 42, height: 42 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '800', fontSize: 28, color: '#FFF', marginLeft: 12, top: 3 }}>
                Dallas Cowboys (H)
              </Text>
            </View>

            <Text style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: 65, color: '#FFF', marginTop: 10 }}>
              3 : 16
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('@assets/icons/icon_3.png')} style={{ width: 46, height: 46 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '800', fontSize: 26, color: '#FFF', marginLeft: 12, top: 2 }}>
                Pittsburgh Steelers (A)
              </Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('@assets/icons/type.png')} style={{ width: 12, height: 12 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 14, color: '#FFF', marginLeft: 7 }}>Football</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('@assets/icons/place_icon.png')} style={{ width: 10, height: 13 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 14, color: '#FFF', marginLeft: 7 }}>Signal Iduna Park</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('@assets/icons/calendar_2.png')} style={{ width: 11, height: 12 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 14, color: '#FFF', marginLeft: 7 }}>May 16, 2020   12:30 PM ET</Text>
            </View>

          </View>
        </View>



        <View style={{ paddingHorizontal: 14 }}>

          <Text style={{ fontWeight: '800', fontSize: 24, color: '#000000', textTransform: 'uppercase', textAlign: 'center', marginTop: 19, }} >
            POST GAME REPORT CARD FOR Dallas Cowboys
          </Text>

          <View style={{ height: 40, borderWidth: 1, borderColor: '#5FC521', borderRadius: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 11 }}>
            <Image source={require('@assets/icons/icon_3.png')} style={{ width: 24, height: 24 }} />
            <Text style={{ fontWeight: '800', fontSize: 14, color: '#5FC521', marginLeft: 14, top: 2 }}>
              Switch to Pittsburgh Steelers
            </Text>
          </View>

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
              <Text style={styles.filterText}>Summary Grades</Text>
            </TouchableOpacity>
          </View>

          <AvarageItem
            style={{ marginTop: 14 }}
            title='Overall Team Grade'
            value='A+'
            range='80'
          />

          <View style={styles.block}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B' }}>
              Kyler Murray kept the offense unpredictable with his ability to run. He also has become better at progressing
            </Text>
          </View>

          <AvarageItem
            style={{ marginTop: 14 }}
            title='Overall Offense Grade'
            value='C+'
            range='52'
          />

          <View style={styles.block}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B' }}>
              There were injuries in the RB room and Kenyan Drake was not as effective as
            </Text>
          </View>

          <AvarageItem
            style={{ marginTop: 14 }}
            title='Overall Defense Grade'
            value='No grade'
            range='0'
          />

          <AvarageItem
            title='Overall Special Teams'
            value='6.7'
            range='67'
          />

          <View style={styles.block}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B' }}>
              The offensive line was not great. If Kyler Murray was not a mobile QB there would have been a lot more sacks. Josh Jones their rookie OT did not play much.
            </Text>
          </View>

          <AvarageItem
            style={{ marginTop: 14 }}
            title='Overall Coaching'
            value='2.1'
            range='21'
          />

          <Text style={{ fontWeight: '500', fontSize: 14, paddingBottom: 8, paddingLeft: 3, marginTop: 14 }}>
            My Player of the Game
          </Text>

          <View style={{
            width: '100%',
            marginBottom: 5,
            padding: 8,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 56, height: 56, borderRadius: 27, marginRight: 12 }}
                source={require('@assets/icons/avatar_3.png')}
              />

              <View>
                <Text style={{ fontWeight: '900', fontSize: 16, color: '#00293B', width: 200 }} numberOfLines={1}>
                  Chris Flowers
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '500', fontSize: 12, color: '#00293B', width: 200 }} numberOfLines={1}>
                    Football Offensive Tackle
                  </Text>
                </View>

              </View>
            </View>
          </View>

          <Text style={{ fontWeight: '500', fontSize: 14, paddingLeft: 3, marginTop: 14 }}>
            Other Game Notes
          </Text>


          <View style={styles.block}>
            <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B', }}>
              Barcelona 6–1 Paris Saint-Germain, also known as La Remontada ("The Comeback"),[3][4] was the result of the second leg of a UEFA Champions League tie which occurred on 8 March 2017 at the Camp Nou in Barcelona.
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