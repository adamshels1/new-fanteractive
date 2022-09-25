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
          style={{ height: 376, width: '100%' }}
        >
          <Image
            style={{ height: 376, width: '100%' }}
            source={require('@assets/images/game_bg.png')}
          />
          <View style={{ height: 376, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15, alignItems: 'center', paddingRight: 20 }}>

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



        <View style={{
          top: -32,
          height: 64, borderRadius: 32, backgroundColor: '#FFFF', width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.3,
          shadowRadius: 3.22,
          elevation: 3,
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('GameSummary')}>
            <Text style={{ color: '#7D86A9', fontFamily: 'Oswald', fontWeight: '700', fontSize: 20, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Summary</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{ color: '#5EC422', fontFamily: 'Oswald', fontWeight: '700', fontSize: 20, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Detail Reports</Text>
          </TouchableOpacity>
        </View>



        <View style={{ paddingHorizontal: 20 }}>

          <FlatList
            data={[1, 1, 1, 1, 1]}
            renderItem={() =>
              <ListItem
                value='2.3'
                amount='Josie Hernandez'
                title='Fanalyst •'
                icon={{ uri: 'https://images.thestar.com/cRSu4APBLry9mJ9ZFnuAjfZkEx4=/1280x1024/smart/filters:cb(1508214149486)/https://www.thestar.com/content/dam/thestar/sports/amateur/2014/12/23/innocent_competitive_cyclist_cant_shake_doping_record/web_photo_jack_burke.jpg' }}
                onPress={() => navigation.navigate('GameReport')}
              />
            }
            ListFooterComponent={<View style={{ height: 100 }} />}
          />



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
  textWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  optionTitle: { fontWeight: '500', fontSize: 14, paddingBottom: 8, paddingLeft: 3 },
  optionValue: { fontWeight: '700', fontSize: 18 },
  gradientLine: { width: '100%', height: 6, borderRadius: 3, alignItems: 'flex-end', marginBottom: 16 },
  grayLine: { backgroundColor: '#F4F4FB', height: 6, }
})