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
  Dimensions,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button, AvarageItem, AverageBlock } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
const windowWidth = Dimensions.get('window').width;

export default function PlayerSummary({ route, navigation }) {
  // const dispatch = useDispatch()
  const item = route?.params?.item
  const playerId = route?.params?.playerId
  const refCarousel = useRef();
  const refCarousel2 = useRef();
  const [summary, setSummary] = useState([])
  const [summaryMeta, setSummaryMeta] = useState([])
  const [reports, setReports] = useState([])
  const [activeTab, setActiveTab] = useState('summary')
  const [avarageType, setAvarageType] = useState('avg')
  const avarageTypes = ['avg', 'median', 'percentile_75', 'percentile_90']

  useEffect(() => {
    // getPlayer()
    getActivityPlayes()
    getPlayerReports()
  }, []);

  // const getPlayer = async () => {
  //   try {
  //     const res = await mainApi.getPlayer(item.id)
  //     console.log('player', res.data.data)
  //   } catch (e) {
  //     console.log('e', e)
  //   }
  // }


  const getActivityPlayes = async () => {
    try {
      const res = await mainApi.getPlayerSummary(playerId)
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

  const getPlayerReports = async () => {
    try {
      const res = await mainApi.getPlayerReports(playerId)
      console.log('resres', res.data.data)
      setReports(res.data.data)
    } catch (e) {
      console.log('e', e)
    }
  }

  const summaryOptions = {
    average: "Average",
    median: "Median",
    percentile_75: "75 Percentile",
    percentile_90: "95 Percentile",
    total_reviews: "Total Reviews"
  }


  const renderReports = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={reports}
          keyExtractor={(item, index) => 'report-' + index}
          renderItem={({ item }) => (
            <ListItem
              value={parseFloat(item?.avg).toFixed(1)}
              amount={item?.full_name}
              title={`${item?.tier} •`}
              icon={{
                uri: item?.thumbnail?.url
              }}
              disabled
            // onPress={() => navigation.navigate('PlayerReport')}
            />
          )}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      </View>
    )
  }


  const renderSummary = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>


        <View style={styles.wrapCarousel2}>

          <TouchableOpacity
            onPress={() => {
              refCarousel2.current?.scrollTo({ count: 1, animated: true });
            }}
          >
            <Image source={require('@assets/icons/cicle-arrow-left.png')} style={styles.arrowIcon} />
          </TouchableOpacity>



          <Carousel
            loop
            width={windowWidth - 110}
            height={110}
            ref={refCarousel2}
            data={summaryMeta}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => setAvarageType(avarageTypes[index])}
            renderItem={({ item, index }) => (
              <AverageBlock
                title={summaryOptions[item.key]}
                value={item.value}
              />
            )}
          />


          <TouchableOpacity
            onPress={() => {
              refCarousel2.current?.scrollTo({ count: -1, animated: true });
            }}
          >
            <Image source={require('@assets/icons/cicle-arrow-right.png')} style={styles.arrowIcon} />
          </TouchableOpacity>


        </View>








        <View style={styles.carousel}>

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              refCarousel.current?.scrollTo({ count: 1, animated: true });
            }}
          >
            <Image source={require('@assets/icons/arrow-left.png')} style={styles.arrowIcon2} />
          </TouchableOpacity>

          <Carousel
            loop
            width={280}
            height={20}
            ref={refCarousel}
            data={avarageTypes}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => setAvarageType(avarageTypes[index])}
            renderItem={({ index }) => (
              <View style={styles.avarageShowWrap}>
                <Text key={'a-' + index} style={styles.avarageShowText}>SHOW: <Text style={{ color: '#5FC422' }}>{avarageTypes[index]} stats</Text></Text>
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              refCarousel.current?.scrollTo({ count: -1, animated: true });
            }}
          >
            <Image source={require('@assets/icons/arrow-right.png')} style={styles.arrowIcon2} />
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





        {/* <Button
          leftComponent={<Image source={require('@assets/icons/shape.png')} style={{ width: 26, height: 29, marginRight: 8 }} />}
          text='Issue A New Scouting Report'
          style={{ width: '100%', marginTop: 36, marginBottom: 20 }}
          textStyle={{ fontFamily: 'Oswald' }}
          onPress={() => navigation.navigate('PlayerEdit')}
        /> */}

      </View>
    )
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
          style={styles.bodyHeader}
        >
          <Image
            style={styles.image}
            source={{ uri: item?.thumbnail?.url }}
          />
          <View style={styles.nameWrap}>
            <View style={{ width: 42, height: 42 }} />
            <View>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
              <Text style={styles.options}>
                {item?.sport?.name} • {item?.position?.abbr}
              </Text>
            </View>
            <View style={{ height: 140, top: -80 }}>
              <Image source={{ uri: item?.team?.thumbnail?.url }} style={styles.logo1} />
              <Image source={{ uri: item?.national_team?.thumbnail?.url }} style={styles.logo2} />
              <Text style={styles.avarageValue}>
                {summaryMeta?.find(i => i.key === 'average')?.value}
              </Text>
            </View>
          </View>
        </View>



        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('summary')}>
            <Text style={activeTab === 'summary' ? styles.activeTab : styles.tab}>Summary</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab('reports')}>
            <Text style={activeTab === 'reports' ? styles.activeTab : styles.tab}>Detail Reports</Text>
          </TouchableOpacity>
        </View>





        {activeTab === 'summary' && renderSummary()}

        {activeTab === 'reports' && renderReports()}






      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
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
  tab: { color: '#7D86A9', fontFamily: 'Oswald', fontWeight: '700', fontSize: 20, fontFamily: 'Oswald', textTransform: 'uppercase' },
  activeTab: { color: '#5EC422', fontFamily: 'Oswald', fontWeight: '700', fontSize: 20, fontFamily: 'Oswald', textTransform: 'uppercase' },
  tabs: {
    top: -32,
    height: 64, borderRadius: 32, backgroundColor: '#FFFF', width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.22,
    elevation: 3,
  },
  nameWrap: { height: 113, width: '100%', position: 'absolute', bottom: 0, paddingHorizontal: 30, paddingBottom: 22, flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontWeight: '700', fontSize: 32, color: '#FFF', textAlign: 'center', fontFamily: 'Oswald', textTransform: 'uppercase' },
  options: { fontWeight: '500', fontSize: 12, color: '#FFF', textAlign: 'center', textTransform: 'uppercase' },
  logo1: { width: 42, height: 42, borderRadius: 21 },
  logo2: { width: 42, height: 42, marginTop: 9 },
  avarageValue: { fontFamily: 'Oswald', fontSize: 32, fontWeight: '700', marginTop: 7, color: '#FFFFFF', textAlign: 'center' },
  image: { width: 201, height: 201, borderRadius: 100.5, marginTop: -115, backgroundColor: '#161F2D' },
  bodyHeader: { height: 335, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00293B' },
  wrapCarousel2: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  arrowIcon: { width: 26, height: 26 },
  carousel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 34, marginBottom: 26 },
  avarageShowWrap: { width: 280, height: 20, alignItems: 'center' },
  avarageShowText: { fontFamily: 'Oswald', fontweight: '700', fontSize: 16, textTransform: 'uppercase', color: '#00293B' },
  arrowIcon2: { width: 6.72, height: 11.26 },
  arrowButton: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginLeft: -10 },
})