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
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button, AvarageItem, AverageBlock, Input, Input2, StatsOverviewItem, MultiSelectModal, SelectPlayerModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import AlertAsync from 'react-native-alert-async';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import helper from '@services/helper';


export default function PlayerSummary({ route, navigation }) {
  const dispatch = useDispatch()
  const item = route?.params?.item
  const refCarousel = useRef();
  const refCarousel2 = useRef();
  const [summary, setSummary] = useState([])
  const [summaryMeta, setSummaryMeta] = useState([])
  const [reports, setReports] = useState([])
  const [activeTab, setActiveTab] = useState('summary')
  const [avarageType, setAvarageType] = useState('avg')
  const avarageTypes = ['avg', 'median', 'percentile_75', 'percentile_90']

  const token = useSelector(state => state.userReducer.token)
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  const [sports, setSports] = useState([])
  const [visibleSportsModal, setVisibleSportsModal] = useState(false)
  const [eventName, setEventName] = useState('')
  const [comment, setComment] = useState('')
  const selectedSport = sports?.find(i => i.selected)
  const [characteristics, setCharacteristics] = useState([])
  const [images, setImages] = useState([])

  const [visibleSelectPlayerModal, setVisibleSelectPlayerModal] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    getActivityStadium()
    getStadiumReports()
    getSports()
    getStadiumCharacteristics()
  }, []);

  const getStadiumCharacteristics = async () => {
    try {
      const res = await mainApi.getStadiumCharacteristics(token)
      console.log('getStadiumCharacteristics', res.data.data)
      setCharacteristics(res.data.data)
    } catch (e) {
      console.log('e', e)
    }
  }

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
      console.log('reports', res.data.data)
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


  const onGallery = async () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        multiple: true
      }).then(image => {
        // setAvatarFile(image);
        console.log(image);
        setImages(image)
      })
    } catch (e) {
      console.log(e)
    }
  }


  const getSports = async () => {
    try {
      const res = await mainApi.getSports(token)
      console.log(res.data.data)
      setSports(res.data.data)
    } catch (e) {
      console.log('e', e)
    }
  }



  const onSelectSport = item => {
    console.log('item', item)
    setSports(sports.map(i => {
      return {
        ...i,
        selected: item.id === i.id ? !i.selected : false
      }
    }))
  }

  const onConfirmDate = date => {
    setDate(new Date(date))
    console.log('data', date)
  }

  const dateFormat = moment(date).format('DD MMMM YYYY')


  const addStadiumRating = async () => {
    try {
      const data = {
        stadiumId: item.id,
        comment,
        eventName,
        date,
        sportId: selectedSport?.id,
        images,
        characteristics: characteristics.map(i => {
          return {
            id: i.id,
            value: i.value ? helper.formatAvarageNumber(i.value) : null,
            comment: i.comment ? i.comment : null
          }
        })
      };
      console.log('data', data)
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.addStadiumRating(token, {
        stadiumId: item.id,
        comment,
        eventName,
        date,
        sportId: selectedSport?.id,
        images,
        characteristics
      })
      console.log('res', res)
      if (res.status === 200) {
        // navigation.navigate('StadiumSummary', { activeTab: 'reports' })
        navigation.goBack()
      } else {
        AlertAsync('Something went wrong')
      }
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
      console.log('e', e)
    }
  }

  const renderStep2 = () => {
    return (
      <View>

        <Text style={{ fontFamily: 'Avenir', fontWeight: '800', color: '#00293B', fontSize: 24, textAlign: 'center', marginTop: 33 }}>
          Step2: Rate Venue
        </Text>



        <View style={{ paddingHorizontal: 26, marginTop: 45 }}>

          {characteristics.map((i, index) => {
            return (
              <StatsOverviewItem
                key={i.id}
                field={i?.title}
                toggleVisivleComment={id => {
                  setCharacteristics(characteristics.map(item => {
                    if (item.id === id) {
                      item.comment = null
                    }
                    return item;
                  }))
                }}
                onChangeComment={(comment) => {
                  setCharacteristics(characteristics.map(item => {
                    if (item.id === i.id) {
                      item.comment = comment
                    }
                    return item;
                  }))
                }}
                comment={i?.comment}
                value={i?.value}
                onValuesChange={(values) => {
                  setCharacteristics(characteristics.map(item => {
                    if (item.id === i.id) {
                      item.value = values[0]
                    }
                    return item;
                  }))
                }}
                {...i}
              />
            )
          })}




          <Button
            text='Fanalyze'
            style={{ width: '100%', marginTop: 36 }}
            onPress={addStadiumRating}
          />
          <Button
            text='BACK'
            style={{ width: '100%', marginTop: 17 }}
            inverter
            onPress={() => setStep(1)}
          />

          <View style={{ height: 100 }} />


        </View>


      </View>
    )
  }


  const renderStep1 = () => {
    return (
      <View style={{ padding: 15, paddingTop: 31 }}>
        <Text style={{ fontWeight: '900', fontSize: 24, color: '#00293B', textAlign: 'center', marginTop: 31 }}>
          Step 1 of 3: Summary{`\n`}Grades
        </Text>


        <StatsOverviewItem
          field={'Overall Team Grade'}
          // comment={i?.comment}
          value={'B'}
        />

        <StatsOverviewItem
          field={'Overall Offense Grade'}
          // comment={i?.comment}
          value={'F+'}
        />

        <StatsOverviewItem
          field={'Overall Defense Grade'}
          // comment={i?.comment}
          value={'C'}
        />



        <SelectPlayerModal
          title='Select Sport'
          isVisible={visibleSelectPlayerModal}
          onClose={() => setVisibleSelectPlayerModal(false)}
          // onSelect={onSelectSport}
          data={[1, 1, 1, 1]}
          showSearch
        />

        <TouchableOpacity
          onPress={() => setVisibleSelectPlayerModal(true)}
          style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D9DBE9', height: 78, marginTop: 34, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >

          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Image
              style={{ height: 24, width: 24, marginRight: 14 }}
              source={require('@assets/icons/star-icon.png')}
            />

            <View>
              <Text style={{ fontWeight: '900', fontSize: 12, letterSpacing: 0.4, color: '#A0A3BD' }}>My Player of the Game</Text>
              <Text style={{ fontWeight: '500', fontSize: 18, color: '#081735' }}>Not Specified</Text>
            </View>
          </View>


          <Image
            style={{ height: 24, width: 14, marginRight: 14 }}
            source={require('@assets/icons/arrow-green-big.png')}
          />

        </TouchableOpacity>



        <View style={styles.block}>
          <Text style={styles.writeFieldTitle}>Write Your Comment</Text>
          <TextInput
            style={styles.writeInput} multiline
          // value={props?.comment}
          // onChangeText={props.onChangeComment}
          />
        </View>



        <Button
          text='Save and Continue'
          style={{ marginBottom: 100 }}
          onPress={() => setStep(2)}
        />



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

      <MultiSelectModal
        title='Select Sport'
        isVisible={visibleSportsModal}
        onClose={() => setVisibleSportsModal(false)}
        onSelect={onSelectSport}
        data={sports}
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
              {item?.game?.season?.name}
              {/* <Text style={{ fontWeight: '300' }}>(2020/21)</Text> */}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 22 }}>
              {/* <Image source={require('@assets/icons/star_2.png')} style={{ width: 42, height: 42 }} /> */}
              <Image source={{ uri: item?.game?.visitor_team?.thumbnail?.url }} style={{ width: 46, height: 46 }} />

              <Text style={{ fontFamily: 'Oswald', fontWeight: '800', fontSize: 28, color: '#FFF', marginLeft: 12, top: 3 }}>
                {item?.game?.visitor_team?.name}
              </Text>
            </View>

            <Text style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: 65, color: '#FFF', marginTop: 10 }}>
              {item?.game?.visitor_score} : {item?.game?.local_score}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: item?.game?.local_team?.thumbnail?.url }} style={{ width: 42, height: 42 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '800', fontSize: 26, color: '#FFF', marginLeft: 12, top: 2 }}>
                {item?.game?.local_team?.name}
              </Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('@assets/icons/type.png')} style={{ width: 12, height: 12 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 14, color: '#FFF', marginLeft: 7 }}>
                {item?.game?.sport?.name}
              </Text>
            </View>

            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('@assets/icons/place_icon.png')} style={{ width: 10, height: 13 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 14, color: '#FFF', marginLeft: 7 }}>Signal Iduna Park</Text>
            </View> */}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('@assets/icons/calendar_2.png')} style={{ width: 11, height: 12 }} />
              <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 14, color: '#FFF', marginLeft: 7 }}>
                {/* May 16, 2020   12:30 PM ET */}
                {moment(item.started).format('MMM DD, YYYY hh:mm A')}
              </Text>
            </View>

          </View>
        </View>





        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}





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

  wrapTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
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