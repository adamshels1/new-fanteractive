import React, {useState, useEffect} from 'react'
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
import {useSelector, useDispatch} from 'react-redux'
import {
  Header,
  StatusBar,
  Text,
  BlockTitle,
  ListItem,
  TeamListItem,
  AvarageItem,
} from '@components'
import {mainApi} from '@api'
import {loaderAction} from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default function About ({route, navigation}) {
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
  const {title = '', content = ''} = page
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={title}
        navigation={navigation}
        goBack={navigation.goBack}
      />
      <ScrollView>
        <View style={{height: 387, width: '100%'}}>
          <Image
            style={{height: 387, width: '100%'}}
            source={{
              uri:
                'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt6ba33b35a143d067/60effe93f101cd22d91c320e/3d2b8d0b5a8ed594a2bf5c324547b22c7dfbebb2.jpg',
            }}
          />
          <View
            style={{
              height: 113,
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              bottom: 0,
              paddingLeft: 14,
              paddingTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 20,
            }}>
            <View>
              <Text style={{fontWeight: '700', fontSize: 32, color: '#FFF'}}>
                Harry Kane
              </Text>
              <Text style={{fontWeight: '500', fontSize: 12, color: '#FFF'}}>
                {' '}
                • Running Back
              </Text>
            </View>
            <View style={{height: 140, top: -80}}>
              <Image
                source={require('@assets/images/337-3379384_logo-tottenham-hotspurs-tottenham-hotspurs-hd-png-download.png')}
                style={{width: 42, height: 42, borderRadius: 21}}
              />
              <Image
                source={require('@assets/images/icons8-england.png')}
                style={{width: 42, height: 42, borderRadius: 21, marginTop: 9}}
              />
              <Text
                style={{
                  fontFamily: 'Oswald',
                  fontSize: 32,
                  fontWeight: '700',
                  marginTop: 7,
                  color: '#FFFFFF',
                }}>
                9.2
              </Text>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 14}}>
          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>About Reviewer</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              marginBottom: 5,
              padding: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderRadius: 30,
                  marginRight: 14,
                }}
                source={require('@assets/icons/avatar_2.png')}
              />

              <View>
                <Text
                  style={{
                    fontWeight: '900',
                    fontSize: 16,
                    color: '#00293B',
                    width: 200,
                  }}
                  numberOfLines={1}>
                  Josie Hernandez
                </Text>
                <View style={{flexDirection: 'row', marginTop: 5.5}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('@assets/icons/icon_1.png')}
                      style={{width: 15, height: 8, marginRight: 7.28}}
                    />
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 13,
                        color: '#00293B',
                        width: 200,
                      }}
                      numberOfLines={1}>
                      Senior Fanalyst
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 16,
                color: '#00293B',
                paddingTop: 7,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
            </Text>
          </View>

          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Analytics</Text>
            </TouchableOpacity>
          </View>

          <AvarageItem
            style={{marginTop: 14}}
            title='Potential'
            // value='A+'
            range='80'
          />

          <View style={{marginTop: 11}}>
            <Text style={{fontWeight: '900', fontSize: 16, color: '#00293B'}}>
              Strengths
            </Text>
            <Text style={{fontWeight: '400', fontSize: 16, color: '#00293B'}}>
              Strength, blocking, toughness, yards after reception, and
              efficiency.
            </Text>
          </View>

          <View style={{marginTop: 11}}>
            <Text style={{fontWeight: '900', fontSize: 16, color: '#00293B'}}>
              Weaknesses
            </Text>
            <Text style={{fontWeight: '400', fontSize: 16, color: '#00293B'}}>
              Speed, route running
            </Text>
          </View>

          <View style={{marginTop: 11}}>
            <Text style={{fontWeight: '900', fontSize: 16, color: '#00293B'}}>
              Overall Analysis
            </Text>
            <Text style={{fontWeight: '400', fontSize: 16, color: '#00293B'}}>
              Josh Jacobs is projected as the No. 1 running back prospect in
              this draft for most NFL scouts. The most impressive aspect of
              Jacobs is his strength. His ability to break tackles is nearly
              unmatched. When you couple Jacobs’ strength with his incredible
              patience, balance, and vision, you get a running back who is able
              to turn potential no gains and negative runs into miraculous runs.
              According to Pro Football Focus’ Mike Renner, 41% of Jacobs’ runs
              went for a TD or first down. Jacobs is a reliable goal-line option
              in the red-zone due to his knack to rush for every inch on every
              play.
            </Text>
          </View>

          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              paddingBottom: 8,
              paddingLeft: 3,
              marginTop: 14,
            }}>
            My Player of the Game
          </Text>

          <View
            style={{
              width: '100%',
              marginBottom: 5,
              padding: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 27,
                  marginRight: 12,
                }}
                source={require('@assets/icons/avatar_3.png')}
              />

              <View>
                <Text
                  style={{
                    fontWeight: '900',
                    fontSize: 16,
                    color: '#00293B',
                    width: 200,
                  }}
                  numberOfLines={1}>
                  Chris Flowers
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 12,
                      color: '#00293B',
                      width: 200,
                    }}
                    numberOfLines={1}>
                    Football Offensive Tackle
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginBottom: 5,
              padding: 8,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 27,
                  marginRight: 12,
                }}
                source={require('@assets/icons/avatar_3.png')}
              />

              <View>
                <Text
                  style={{
                    fontWeight: '900',
                    fontSize: 16,
                    color: '#00293B',
                    width: 200,
                  }}
                  numberOfLines={1}>
                  Chris Flowers
                </Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 12,
                      color: '#00293B',
                      width: 200,
                    }}
                    numberOfLines={1}>
                    Football Offensive Tackle
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Stats</Text>
            </TouchableOpacity>
          </View>

          <AvarageItem
            style={{marginTop: 14}}
            title='Power Moves'
            // value='A+'
            range='80'
          />

          <View style={styles.block}>
            <Text style={{fontWeight: '400', fontSize: 16, color: '#00293B'}}>
              Strength allows him to break most arm tackles and fight for every
              inch, however, if he gets stronger he could be a terror on every
              play.
            </Text>
          </View>

          <View style={styles.block}>
            <Text style={{fontWeight: '400', fontSize: 16, color: '#00293B'}}>
              Kyler Murray kept the offense unpredictable with his ability to
              run. He also has become better at progressing
            </Text>
          </View>

          <AvarageItem
            style={{marginTop: 14}}
            title='Finesse Moves'
            value='5.2'
            range='52'
          />

          <AvarageItem title='Acceleration' value='6.7' range='67' />

          <AvarageItem title='Tackling' value='5.2' range='52' />

          <View style={styles.block}>
            <Text style={{fontWeight: '400', fontSize: 16, color: '#00293B'}}>
              Harris has excellent hands, but his run after the catch is
              underwhelming, and he mainly runs bubble screens and out routes.
            </Text>
          </View>

          <AvarageItem
            style={{marginTop: 14}}
            title='Penetration'
            value='9.0'
            range='90'
          />

          <AvarageItem title='Motor' value='6.6' range='66' />

          <AvarageItem title='Speed' value='9.4' range='30' />

          <AvarageItem title='Durability' value='5.0' range='50' />

          <AvarageItem title='Size' value='5.0' range='90' />

          <AvarageItem title='Character' value='2.4' range='10' />

          <AvarageItem title='Technique' value='9.3' range='60' />

          <AvarageItem title='Intangibles	' value='5.0' range='30' />

          <AvarageItem title='Consistency	' value='2.0' range='60' />

          <View style={{height: 50}} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderTitle: {
    fontWeight: '800',
    color: '#2B2B2B',
    fontSize: 18,
    marginTop: 10,
  },
  sliderOptions: {flexDirection: 'row', alignItems: 'center'},
  sliderValue: {
    marginLeft: 26,
    fontFamily: 'Oswald',
    fontWeight: '700',
    fontSize: 18,
    color: '#2B2B2B',
  },
  sliderIcon: {width: 29, height: 28, marginLeft: 23},
  block: {
    width: '100%',
    marginTop: 17,
    marginBottom: 10,
    padding: 13,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.22,

    elevation: 3,
  },
  writeFieldTitle: {
    fontWeight: '800',
    fontSize: 12,
    color: '#00293B',
    position: 'absolute',
    backgroundColor: '#fff',
    top: 5,
    left: 25,
    zIndex: 1,
  },
  writeInput: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.32)',
    borderRadius: 4,
    height: 86,
    padding: 11,
    paddingTop: 11,
    fontWeight: '400',
    fontSize: 16,
    color: '#00293B',
  },
  textWrap: {flexDirection: 'row', justifyContent: 'space-between'},
  optionTitle: {
    fontWeight: '500',
    fontSize: 14,
    paddingBottom: 8,
    paddingLeft: 3,
  },
  optionValue: {fontWeight: '700', fontSize: 18},
  gradientLine: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  grayLine: {backgroundColor: '#F4F4FB', height: 6},

  filterItem: {flexDirection: 'row', alignItems: 'center'},
  filterText: {fontWeight: '900', fontSize: 12, color: '#00293B'},
  filterIcon: {width: 7.53, height: 4.34, top: 1, marginLeft: 3.24},
  filtersWrap: {
    height: 30,
    width: '100%',
    backgroundColor: '#EDF1F9',
    borderRadius: 3,
    marginTop: 29,
    paddingHorizontal: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
