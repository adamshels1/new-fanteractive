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
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button, AvarageItem, AverageBlock, AddReportButton } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import moment from 'moment';


export default function StadiumSummary({ route, navigation }) {
  // const dispatch = useDispatch()
  const item = route?.params?.item
  const refCarousel = useRef();
  const refCarousel2 = useRef();
  const [summary, setSummary] = useState([])
  const [summaryMeta, setSummaryMeta] = useState([])
  const [reports, setReports] = useState([])
  const [activeTab, setActiveTab] = useState('summary')
  const [avarageType, setAvarageType] = useState('avg')
  const avarageTypes = ['avg', 'median', 'percentile_75', 'percentile_90']

  useEffect(() => {
    getActivityStadium()
    getStadiumReports()
  }, []);

  const getActivityStadium = async () => {
    try {
      const res = await mainApi.getStadiumSummary(item.id)
      console.log('res.data.data', res.data.data)
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

  const getStadiumReports = async () => {
    try {
      const res = await mainApi.getStadiumReports(item.id)
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
              value={parseFloat(item?.avg).toFixed(2)}
              amount={item?.event?.user?.full_name}
              title={`${item?.event?.sport?.name} • ${moment(item?.posted).format('DD MMM YYYY')}`}
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
            width={300}
            height={110}
            ref={refCarousel2}
            data={summaryMeta}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => setAvarageType(avarageTypes[index])}
            renderItem={({ item, index }) => (
              <AverageBlock
                key={'ab-' + index}
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
              <View key={'a-' + index} style={styles.avarageShowWrap}>
                <Text style={styles.avarageShowText}>SHOW: <Text style={{ color: '#5FC422' }}>{avarageTypes[index]} stats</Text></Text>
              </View>
            )}
          />

          <TouchableOpacity
            onPress={() => {
              refCarousel.current?.scrollTo({ count: -1, animated: true });
            }}
          >
            <Image source={require('@assets/icons/arrow-right.png')} style={styles.arrowIcon2} />
          </TouchableOpacity>
        </View>


        {summary?.map((i, key) => {
          const value = parseFloat(i[avarageType])?.toFixed(1)
          return (
            <AvarageItem
              key={'s-' + key}
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

      <AddReportButton
        onPress={() => navigation.navigate('StadiumAddReport', {item})}
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
            <View>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@assets/icons/ball.png')} style={{ width: 16, height: 16 }} />
                <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 12, color: '#FFF', marginLeft: 5, textTransform: 'uppercase' }}>
                  {item.city}, {item.country}
                </Text>
              </View>
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
  nameWrap: { height: 113, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 },
  name: { fontWeight: '700', fontSize: 32, color: '#FFF', width: 290 },
  options: { fontWeight: '500', fontSize: 12, color: '#FFF' },
  logo1: { width: 42, height: 42, borderRadius: 21 },
  logo2: { width: 42, height: 42, marginTop: 9 },
  avarageValue: { fontFamily: 'Oswald', fontSize: 32, fontWeight: '700', marginTop: 7, color: '#FFFFFF', textAlign: 'center' },
  image: { height: 315, width: '100%' },
  bodyHeader: { height: 315, width: '100%' },
  wrapCarousel2: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  arrowIcon: { width: 26, height: 26 },
  carousel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 34, marginBottom: 26 },
  avarageShowWrap: { width: 280, height: 20, alignItems: 'center' },
  avarageShowText: { fontFamily: 'Oswald', fontweight: '700', fontSize: 16, textTransform: 'uppercase', color: '#00293B' },
  arrowIcon2: { width: 6.72, height: 11.26 },
})