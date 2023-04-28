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
import { Header, StatusBar, Text, BlockTitle, ListItem, AvarageItem, Button, AddReportButton, SelectTeamModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import moment from 'moment';
import helper from '../services/helper';


export default function GameSummary({ route, navigation }) {

  const item = route?.params?.item
  const token = useSelector(state => state.userReducer.token)
  const [game, setGame] = useState([])
  const [localStatsOveral, setLocalStatsOveral] = useState([])
  const [localStatsOveralPlayer, setLocalStatsOveralPlayer] = useState([])

  const [visitorStatsOveral, setVisitorStatsOveral] = useState([])
  const [visitorStatsOveralPlayer, setVisitorStatsOveralPlayer] = useState([])

  const [teamRoster, setTeamRoster] = useState([])

  const [reports, setReports] = useState([])
  const [activeTab, setActiveTab] = useState('summary')
  const [visibleSelectTeamModal, setVisibleSelectTeamModal] = useState(false)


  const getLocalStatsOveral = async () => {
    try {
      const res = await mainApi.getGameStatsOveral(token, {
        gameId: item.game.id, //342, 
        teamId: item?.game?.local_team?.id //47, 
      })

      const resPlayer = await mainApi.getGameStatsOveralPlayer(token, {
        gameId: item.game.id, //342, 
        teamId: item?.game?.local_team?.id //47,
      })

      console.log('item', item)
      console.log('localStatsOveral', res?.data?.data)
      console.log('localStatsOveralPlayer', resPlayer?.data?.data)
      setLocalStatsOveralPlayer(resPlayer?.data?.data)
      setLocalStatsOveral(res?.data?.data)
    } catch (e) {
      console.log(e)
    }
  }


  const getVisitorStatsOveral = async () => {
    try {
      const res = await mainApi.getGameStatsOveral(token, {
        gameId: item.game.id, //342, 
        teamId: item?.game?.visitor_team?.id //47, 
      })

      const resPlayer = await mainApi.getGameStatsOveralPlayer(token, {
        gameId: item.game.id, //342, 
        teamId: item?.game?.visitor_team?.id // 47,
      })

      console.log('item', item)
      console.log('visitorStatsOveral', res?.data?.data)
      console.log('visitorStatsOveralPlayer', resPlayer?.data?.data)
      setVisitorStatsOveralPlayer(resPlayer?.data?.data)
      setVisitorStatsOveral(res?.data?.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getGame()
    getLocalStatsOveral()
    getVisitorStatsOveral()
    getGameReports()
  }, []);

  const getGame = async () => {
    try {
      const res = await mainApi.getGame(item.game.id)
      console.log('item', item)
      setGame(res?.data?.data)
    } catch (e) {
      console.log(e)
    }
  }


  const getGameReports = async () => {
    try {
      console.log('item', item)
      const res = await mainApi.getGameReports(item.game.id)
      console.log('resres', res.data.data)
      setReports(res.data.data)
    } catch (e) {
      console.log('e', e)
    }
  }


  const renderReports = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <FlatList
          data={reports}
          keyExtractor={(item, index) => 'report-' + index}
          renderItem={({ item }) => (
            <ListItem
              value={helper.fixAlphabetical(item?.avg)}
              amount={item?.fanager?.full_name}
              title={`${item?.fanager?.tier_label} • ${moment(item?.reated_at).format('DD MMM YYYY')}`}
              icon={{
                uri: item?.fanager?.thumbnail?.url
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

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: item?.game?.local_team?.thumbnail?.url }} style={{ width: 42, height: 42 }} />
          <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 20, marginLeft: 12, top: 2 }}>
            {item?.game?.local_team?.name}
          </Text>
        </View>

        {localStatsOveral?.map(i => {
          return (
            <AvarageItem
              style={{ marginTop: 14 }}
              title={i?.title}
              value={helper.fixAlphabetical(i?.avg)}
              range={parseFloat(i?.avg).toFixed(1).replace('.', '')}
            />
          )
        })}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <Text>MVP</Text>
          <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
            {localStatsOveralPlayer.map(i => {
              return (
                <Image
                  style={{ width: 38, height: 38, borderRadius: 19, marginRight: 12 }}
                  source={{ uri: i?.thumbnail?.url }}
                />
              )
            })}

          </View>
        </View>





        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 22 }}>
          <Image source={{ uri: item?.game?.visitor_team?.thumbnail?.url }} style={{ width: 46, height: 46 }} />

          <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 20, marginLeft: 12, top: 3 }}>
            {item?.game?.visitor_team?.name}
          </Text>
        </View>



        {visitorStatsOveral?.map(i => {
          return (
            <AvarageItem
              style={{ marginTop: 14 }}
              title={i?.title}
              value={helper.fixAlphabetical(i?.avg)}
              range={parseFloat(i?.avg).toFixed(1).replace('.', '')}
            />
          )
        })}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <Text>MVP</Text>
          <View style={{ flexDirection: 'row', paddingLeft: 15 }}>
            {visitorStatsOveralPlayer.map(i => {
              return (
                <Image
                  style={{ width: 38, height: 38, borderRadius: 19, marginRight: 12 }}
                  source={{ uri: i?.thumbnail?.url }}
                />
              )
            })}

          </View>
        </View>


        {/* <View style={{
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
            <Text style={{ fontFamily: 'Oswald', fontWeight: '700', fontSize: 12, color: '#FFFFFF' }}>Avarage Stats total</Text>
          </View>

          <View style={{ width: '100%', height: 62, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: '400', fontSize: 42, color: '#000000' }}>9.2</Text>
          </View>
        </View>


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 34, marginBottom: 26 }}>
          <Image source={require('@assets/icons/arrow-left.png')} style={{ width: 6.72, height: 11.26 }} />
          <Text style={{ fontFamily: 'Oswald', fontweight: '700', fontSize: 16, textTransform: 'uppercase', color: '#00293B' }}>SHOW: <Text style={{ color: '#5FC422' }}>average stats</Text></Text>
          <Image source={require('@assets/icons/arrow-right.png')} style={{ width: 6.72, height: 11.26 }} />
        </View>

        <View>
          <View style={styles.textWrap}>
            <Text style={styles.optionTitle}>Team Grade</Text>
            <Text style={styles.optionValue}>9.0</Text>
          </View>
          <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
            <View style={{ ...styles.grayLine, width: '10%' }} />
          </ImageBackground>
        </View>


        <View>
          <View style={styles.textWrap}>
            <Text style={styles.optionTitle}>Offense Grade</Text>
            <Text style={styles.optionValue}>4.0</Text>
          </View>
          <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
            <View style={{ ...styles.grayLine, width: '60%' }} />
          </ImageBackground>
        </View>

        <View>
          <View style={styles.textWrap}>
            <Text style={styles.optionTitle}>Defense Grade</Text>
            <Text style={styles.optionValue}>7.0</Text>
          </View>
          <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
            <View style={{ ...styles.grayLine, width: '30%' }} />
          </ImageBackground>
        </View>

        <View>
          <View style={styles.textWrap}>
            <Text style={styles.optionTitle}>Special Teams</Text>
            <Text style={styles.optionValue}>10.0</Text>
          </View>
          <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
            <View style={{ ...styles.grayLine, width: '0%' }} />
          </ImageBackground>
        </View>

        <View>
          <View style={styles.textWrap}>
            <Text style={styles.optionTitle}>Coaching</Text>
            <Text style={styles.optionValue}>2.0</Text>
          </View>
          <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
            <View style={{ ...styles.grayLine, width: '80%' }} />
          </ImageBackground>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <Text>MVP</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 38, height: 38, borderRadius: 19, marginRight: 12 }}
              source={require('@assets/icons/avatar_3.png')}
            />
            <Image
              style={{ width: 38, height: 38, borderRadius: 19, }}
              source={require('@assets/icons/avatar_3.png')}
            />

          </View>
        </View>


        {[
          { title: '3rd Down Efficiency', value: '24' },
          { title: '4th down efficiency', value: '5-11, 45%' },
          { title: 'Red-Zone Efficiency', value: '2-3, 67%' },
          { title: 'Goal-To-Go Efficiency', value: '3-4, 75%' },
          { title: 'Total Net Yards', value: '3-4, 75%' },
          { title: 'Net Rushing Yards', value: '376' },
          { title: 'Net Passing Yards', value: '180' },
          { title: 'Return Yards', value: '196' },
          { title: 'Field Goals', value: '64' }
        ].map(i => {
          return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
              <Text style={{ fontWeight: '900', fontSize: 16, color: '#00293B' }}>
                {i.title}
              </Text>
              <Text style={{ fontWeight: '400', fontSize: 16, color: '#00293B' }}>
                {i.value}
              </Text>
            </View>
          )
        })} */}

        <View style={{ height: 100 }} />

      </View>
    )
  }


  const onTeamAddReport = team => {
    setVisibleSelectTeamModal(false)
    navigation.navigate('GameAddReport', { item, team })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        // title={title}
        navigation={navigation}
        goBack={navigation.goBack}
      />

      <SelectTeamModal
        isVisible={visibleSelectTeamModal}
        local_team={item?.game?.local_team}
        visitor_team={item?.game?.visitor_team}
        onSelect={onTeamAddReport}
        onClose={() => setVisibleSelectTeamModal(false)}
      />

      {token && (
        <AddReportButton
          onPress={setVisibleSelectTeamModal}
        />
      )}


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
                {moment(item?.game?.started).format('MMM DD, YYYY hh:mm A')}
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
  grayLine: { backgroundColor: '#F4F4FB', height: 6, },

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
})