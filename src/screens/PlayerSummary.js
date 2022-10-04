import React, { useState, useEffect, useRef } from 'react'
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
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button, AvarageItem } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';


export default function About({ route, navigation }) {
  // const dispatch = useDispatch()
  const item = route?.params?.item
  const refCarousel = useRef();
  const refCarousel2 = useRef();
  const [summary, setSummary] = useState([])
  const [summaryMeta, setSummaryMeta] = useState([])
  const [avarageType, setAvarageType] = useState('avg')
  const avarageTypes = ['avg', 'median', 'percentile_75', 'percentile_90']

  console.log('item', item)

  useEffect(() => {
    getActivityPlayes()
  }, []);

  const getActivityPlayes = async () => {
    try {
      const res = await mainApi.getPlayerSummary(item.player_id)
      setSummary(res.data.data)
      let summaryMeta = []
      Object.keys(res.data.meta).forEach((key) => {
        summaryMeta.push({
          key,
          value: res.data.meta[key]
        })
      });
      setSummaryMeta(summaryMeta)
    } catch (e) {
      console.log('e', e)
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        navigation={navigation}
        goBack={navigation.goBack}
      />
      <ScrollView>
        <View
          style={{ height: 387, width: '100%' }}
        >
          <Image
            style={{ height: 387, width: '100%' }}
            source={{ uri: item?.thumbnail?.url }}
          />
          <View style={{ height: 113, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
            <View>
              <Text style={{ fontWeight: '700', fontSize: 32, color: '#FFF', width: 290 }} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF' }}>
                {item?.sport?.name} • {item?.position?.abbr}
              </Text>
            </View>
            <View style={{ height: 140, top: -80 }}>
              <Image source={{ uri: item?.team?.thumbnail?.url }} style={{ width: 42, height: 42, borderRadius: 21 }} />
              <Image source={{ uri: item?.national_team?.thumbnail?.url }} style={{ width: 42, height: 42, marginTop: 9 }} />
              <Text style={{ fontFamily: 'Oswald', fontSize: 32, fontWeight: '700', marginTop: 7, color: '#FFFFFF', textAlign: 'center' }}>
                {summaryMeta?.find(i => i.key === 'average')?.value}
              </Text>
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
          <TouchableOpacity >
            <Text style={{ color: '#5EC422', fontFamily: 'Oswald', fontWeight: '700', fontSize: 20, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Summary</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('PlayerDetail')}>
            <Text style={{ color: '#7D86A9', fontFamily: 'Oswald', fontWeight: '700', fontSize: 20, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Detail Reports</Text>
          </TouchableOpacity>
        </View>



        <View style={{ paddingHorizontal: 20 }}>






          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            <TouchableOpacity
              onPress={() => {
                refCarousel2.current?.scrollTo({ count: -1, animated: true });
              }}
            >
              <Image source={require('@assets/icons/cicle-arrow-left.png')} style={{ width: 26, height: 26 }} />
            </TouchableOpacity>



            <Carousel
              loop
              width={220}
              height={98}
              ref={refCarousel2}
              data={summaryMeta}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => setAvarageType(avarageTypes[index])}
              renderItem={({ item, index }) => (
                <View
                  key={'c' + index}
                  style={{
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.22,
                    elevation: 3,
                    width: 220,
                    height: 98,
                    backgroundColor: '#fff',
                    borderRadius: 7
                  }}>
                  <View style={{ width: '100%', height: 35, backgroundColor: '#00293B', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 7, borderTopLeftRadius: 7 }}>
                    <Text style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: 12, color: '#FFFFFF' }}>
                      {item.key}
                    </Text>
                  </View>

                  <View style={{ width: '100%', height: 62, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: '400', fontSize: 42, color: '#000000' }}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              )}
            />


            <TouchableOpacity
              onPress={() => {
                refCarousel2.current?.scrollTo({ count: -1, animated: true });
              }}
            >
              <Image source={require('@assets/icons/cicle-arrow-right.png')} style={{ width: 26, height: 26 }} />
            </TouchableOpacity>


          </View>








          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 34, marginBottom: 26 }}>

            <TouchableOpacity
              onPress={() => {
                refCarousel.current?.scrollTo({ count: -1, animated: true });
              }}
            >
              <Image source={require('@assets/icons/arrow-left.png')} style={{ width: 6.72, height: 11.26 }} />
            </TouchableOpacity>

            <Carousel
              loop
              width={180}
              height={18}
              ref={refCarousel}
              data={avarageTypes}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => setAvarageType(avarageTypes[index])}
              renderItem={({ index }) => (
                <Text key={'a-' + index} style={{ fontFamily: 'Oswald', fontweight: '700', fontSize: 16, textTransform: 'uppercase', color: '#00293B' }}>SHOW: <Text style={{ color: '#5FC422' }}>average stats</Text></Text>
              )}
            />

            <TouchableOpacity
              onPress={() => {
                refCarousel.current?.scrollTo({ count: 1, animated: true });
              }}
            >
              <Image source={require('@assets/icons/arrow-right.png')} style={{ width: 6.72, height: 11.26 }} />
            </TouchableOpacity>
          </View>


          {summary?.map(i => {
            const value = parseFloat(i[avarageType])?.toFixed(1)
            return (
              <AvarageItem
                title={i?.title}
                value={value}
                range={value?.replace('.', '')}
              />
            )
          })}





          <Button
            leftComponent={<Image source={require('@assets/icons/shape.png')} style={{ width: 26, height: 29, marginRight: 8 }} />}
            text='Issue A New Scouting Report'
            style={{ width: '100%', marginTop: 36, marginBottom: 20 }}
            textStyle={{ fontFamily: 'Oswald' }}
            onPress={() => navigation.navigate('PlayerEdit')}
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