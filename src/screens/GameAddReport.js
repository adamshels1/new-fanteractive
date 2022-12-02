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
import { logout } from '@redux/actions/userActions'
import { CommonActions } from '@react-navigation/native'


export default function PlayerSummary({ route, navigation }) {
  const dispatch = useDispatch()
  const item = route?.params?.item
  const team = route?.params?.team
  console.log('route', route)

  const token = useSelector(state => state.userReducer.token)
  const [comment, setComment] = useState('')

  const [characteristics, setCharacteristics] = useState([])
  const [teamRoster, setTeamRoster] = useState([])
  const [visibleSelectPlayerModal, setVisibleSelectPlayerModal] = useState(false)
  const [step, setStep] = useState(1)

  const selectedPlayer = teamRoster.find(i => i.selected)

  useEffect(() => {
    getGameCharacteristics()
    getTeamRoster()
  }, []);

  const getTeamRoster = async () => {
    try {
      const res = await mainApi.getTeamRoster(team.id)
      console.log('getTeamRoster', res)
      setTeamRoster(res?.data?.data.map(i => {
        return {
          ...i,
          visible: true
        }
      }))
    } catch (e) {
      console.log('e', e)
    }
  }

  const getGameCharacteristics = async () => {
    try {
      const res = await mainApi.getGameCharacteristics(token, {
        gameId: item?.game?.id //342, 
      })
      const characteristics = res.data.data.map(i => {
        return {
          ...i.characteristic,
          block: i.block,
          mode: i.mode,
        }
      })
      console.log('getGameCharacteristics', characteristics)
      setCharacteristics(characteristics)
    } catch (e) {
      console.log('e getGameCharacteristics', e)
      if (e.response.status === 403) {
        console.log('logout')
        onLogout()
      }
    }
  }

  const onLogout = () => {
    dispatch(logout())
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
    navigation.dispatch(resetAction);
  }


  const onSelectPlayer = item => {
    console.log('item', item)
    setTeamRoster(teamRoster.map(i => {
      return {
        ...i,
        selected: item.id === i.id ? !i.selected : false
      }
    }))
  }

  const prepareItem = i => {
    return {
      id: i.id,
      value: i.value ? helper.formatAvarageNumber(i.value) : '',
      comment: i.comment ? i.comment : ''
    }
  }


  const addGameReport = async () => {
    try {
      console.log('characteristics', characteristics)
      const data = {
        gameId: item?.game?.id, //342, 
        teamId: team.id, //47, 
        playerId: selectedPlayer?.id,
        players: teamRoster.filter(i => i.selected).map(prepareItem),
        analyzes: characteristics.filter(i => i.mode === 'analyze').map(prepareItem), // characteristics.filter(i => i.value && i.block === 'Summary Grades').map(prepareItem),
        ratings: characteristics.filter(i => i.value && i.mode === 'rating').map(prepareItem), // characteristics.filter(i => i.value && i.block === 'Advance Team Grade').map(prepareItem)
      };

      console.log('data', data)

      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.addGameReport(token, data)
      console.log('res', res)
      if (res?.status === 200) {
        navigation.goBack()
      } else {
        AlertAsync('Something went wrong')
      }
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
      helper.alertErrors(e.response.data.errors, e.response.data.message)
      console.log('e', e)
    }
  }


  const onChangeSearchText = text => {

    const newTeamRoster = teamRoster.map(item => {
      const itemData = item.name
        ? item.name.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      const visible = itemData.indexOf(textData) > -1 ? true : false;
      return {
        ...item,
        visible
      }
    })
    setTeamRoster(newTeamRoster)
  }


  const renderStep3 = () => {
    console.log('characteristics', characteristics)
    return (
      <View>

        <Text style={{ fontFamily: 'Avenir', fontWeight: '800', color: '#00293B', fontSize: 24, textAlign: 'center', marginTop: 33 }}>
          Step 3 of 3: Advance{`\n`}Team Grades
        </Text>



        <View style={{ paddingHorizontal: 26, marginTop: 45 }}>


          {characteristics.filter(i => i.block === 'Advance Team Grades').map((i, index) => {
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
            // disabled={!characteristics.find(i => i?.value)?.id}
            text='Fanalyze'
            style={{ width: '100%', marginTop: 36 }}
            onPress={addGameReport}
          />
          <Button
            text='BACK'
            style={{ width: '100%', marginTop: 17 }}
            inverter
            onPress={() => setStep(2)}
          />

          <View style={{ height: 100 }} />


        </View>


      </View>
    )
  }



  const renderStep2 = () => {
    return (
      <View>

        <Text style={{ fontFamily: 'Avenir', fontWeight: '800', color: '#00293B', fontSize: 24, textAlign: 'center', marginTop: 33 }}>
          Step 2 of 3: Player{`\n`}Grades
        </Text>



        <View style={{ paddingHorizontal: 26, marginTop: 45 }}>


          {teamRoster.map((i, index) => {
            return (
              <StatsOverviewItem
                format='alphabetical'
                {...i}
                key={i.id}
                field={i?.name}
                toggleVisivleComment={id => {
                  setTeamRoster(teamRoster.map(item => {
                    if (item.id === id) {
                      item.comment = null
                    }
                    return item;
                  }))
                }}
                onChangeComment={(comment) => {
                  setTeamRoster(teamRoster.map(item => {
                    if (item.id === i.id) {
                      item.comment = comment
                    }
                    return item;
                  }))
                }}
                comment={i?.comment}
                value={i?.value}
                onValuesChange={(values) => {
                  setTeamRoster(teamRoster.map(item => {
                    if (item.id === i.id) {
                      item.value = values[0]
                    }
                    return item;
                  }))
                }}
              />
            )
          })}

          {/* {characteristics.map((i, index) => {
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
          })} */}




          <Button
            disabled={!teamRoster.find(i => i?.value)?.id}
            text='Save and Continue'
            style={{ width: '100%', marginTop: 36 }}
            onPress={() => setStep(3)}
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



        {characteristics.filter(i => i.block === 'Summary Grades').map((i, index) => {
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


        <SelectPlayerModal
          title='Select Player'
          isVisible={visibleSelectPlayerModal}
          onClose={() => setVisibleSelectPlayerModal(false)}
          onSelect={onSelectPlayer}
          data={teamRoster.filter(i => i.visible)}
          showSearch
          // searchValue={''}
          onChangeSearchText={onChangeSearchText}
        />

        <TouchableOpacity
          onPress={() => setVisibleSelectPlayerModal(true)}
          style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D9DBE9', height: 78, marginTop: 34, marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >

          <View style={{ alignItems: 'center', flexDirection: 'row' }}>

            {selectedPlayer ? (
              <Image
                style={{ height: 57, width: 57, borderRadius: 28.5, marginRight: 14 }}
                source={{ uri: selectedPlayer?.thumbnail?.url }}
              />
            ) : (
              <Image
                style={{ height: 24, width: 24, marginRight: 14 }}
                source={require('@assets/icons/star-icon.png')}
              />
            )}



            <View>
              <Text style={{ fontWeight: '900', fontSize: 12, letterSpacing: 0.4, color: '#A0A3BD' }}>My Player of the Game</Text>
              <Text style={{ fontWeight: '500', fontSize: 18, color: '#081735' }}>
                {selectedPlayer ? selectedPlayer.name : 'Not Specified'}
              </Text>
            </View>
          </View>


          <Image
            style={{ height: 24, width: 14, marginRight: 14 }}
            source={require('@assets/icons/arrow-green-big.png')}
          />

        </TouchableOpacity>



        <View style={styles.block}>
          <Text style={styles.writeFieldTitle}>Write Your Comment</Text>
          <Input2
            style={styles.writeInput}
            multiline
            showMaxLength
            maxLength={255}
            value={comment}
            onChangeText={setComment}
          />
        </View>



        <Button
          disabled={!selectedPlayer}
          text='Save and Continue'
          style={{ marginBottom: 100, marginTop: 20 }}
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
        {step === 3 && renderStep3()}





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
  writeInput: { borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.32)', borderRadius: 4, height: 86, padding: 11, paddingTop: 11, fontWeight: '400', fontSize: 16, color: '#00293B', textAlignVertical: 'top' },


})