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
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button, AvarageItem, AverageBlock, Input, Input2 } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import moment from 'moment';


export default function PlayerSummary({ route, navigation }) {
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


        <View style={{ padding: 15, paddingTop: 31 }}>
          <Text style={{ fontWeight: '900', fontSize: 24, color: '#00293B', textAlign: 'center', marginTop: 31 }}>
            Step1: Tell us about{`\n`}the event
          </Text>


          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>About Reviewer</Text>
            </TouchableOpacity>
          </View>


          <Input2
            field='Event Name'
          />


          <TouchableOpacity style={styles.inputButton}>
            <View style={styles.inputButtonField}>
              <Text style={styles.inputButtonFieldText}>
                Sport
              </Text>
            </View>
            <Text style={styles.inputButtonText}>
              aaa
            </Text>
            <Image source={require('@assets/icons/right.png')} resizeMode='center' style={{ width: 12.14, height: 17.7 }} />
          </TouchableOpacity>




          <TouchableOpacity style={styles.inputButton}>
            <View style={styles.inputButtonField}>
              <Text style={styles.inputButtonFieldText}>
                Visit date
              </Text>
            </View>
            <Text style={styles.inputButtonText}>
              12 August 2020
            </Text>
            <Image source={require('@assets/icons/calendar2.png')} resizeMode='center' style={{ width: 17.19, height: 17.97 }} />
          </TouchableOpacity>



          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Your Media </Text>
            </TouchableOpacity>
          </View>


          <Text style={{ fontWeight: '900', fontSize: 12, color: '#00293B', padding: 10, textAlign: 'center' }}>
            You can attach images or video from your visit below to have them display together with your ratings!
          </Text>

          <TouchableOpacity style={{ height: 176, width: '100%', borderColor: '#7D86A9', borderWidth: 1, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 6, marginBottom: 21 }}>

            <Image source={require('@assets/icons/upload-gray.png')} style={{ width: 100, height: 66 }} />

            <Text style={{ marginTop: 18, fontWeight: '900', fontSize: 14, color: '#7D86A9' }}>
              Tap here to upload{`\n`}your Photos or Videos
            </Text>

          </TouchableOpacity>



          <Button
            text='Save and Continue'
            style={{ marginBottom: 100 }}
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
  image: { height: 155, width: '100%' },
  bodyHeader: { height: 155, width: '100%' },
  wrapCarousel2: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  arrowIcon: { width: 26, height: 26 },
  carousel: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 34, marginBottom: 26 },
  avarageShowWrap: { width: 280, height: 20, alignItems: 'center' },
  avarageShowText: { fontFamily: 'Oswald', fontweight: '700', fontSize: 16, textTransform: 'uppercase', color: '#00293B' },
  arrowIcon2: { width: 6.72, height: 11.26 },

  filterItem: { flexDirection: 'row', alignItems: 'center' },
  filterText: { fontWeight: '900', fontSize: 12, color: '#00293B' },
  filterIcon: { width: 7.53, height: 4.34, top: 1, marginLeft: 3.24 },
  filtersWrap: { height: 30, width: '100%', backgroundColor: '#EDF1F9', borderRadius: 3, marginTop: 29, paddingHorizontal: 11, flexDirection: 'row', justifyContent: 'space-between' },

  inputButton: { width: '100%', height: 50, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.32)', borderRadius: 4, marginTop: 23, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, flexDirection: 'row' },
  inputButtonField: { left: 16, top: -9, backgroundColor: '#fff', zIndex: 2, position: 'absolute' },
  inputButtonFieldText: { fontFamily: 'Avenir', fontWeight: '900', fontSize: 12, color: '#00293B', paddingHorizontal: 5 },
  inputButtonText: { fontSize: 16, fontFamily: 'Avenir', color: '#00293B', fontWeight: '400' },


})