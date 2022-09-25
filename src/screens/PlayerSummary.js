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
          style={{ height: 387, width: '100%' }}
        >
          <Image
            style={{ height: 387, width: '100%' }}
            source={{ uri: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt6ba33b35a143d067/60effe93f101cd22d91c320e/3d2b8d0b5a8ed594a2bf5c324547b22c7dfbebb2.jpg' }}
          />
          <View style={{ height: 113, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
            <View>
              <Text style={{ fontWeight: '700', fontSize: 32, color: '#FFF' }}>Harry Kane</Text>
              <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF' }}> • Running Back</Text>
            </View>
            <View style={{ height: 140, top: -80 }}>
              <Image source={require('@assets/images/337-3379384_logo-tottenham-hotspurs-tottenham-hotspurs-hd-png-download.png')} style={{ width: 42, height: 42, borderRadius: 21 }} />
              <Image source={require('@assets/images/icons8-england.png')} style={{ width: 42, height: 42, borderRadius: 21, marginTop: 9 }} />
              <Text style={{ fontFamily: 'Oswald', fontSize: 32, fontWeight: '700', marginTop: 7, color: '#FFFFFF' }}>9.2</Text>
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

          <View style={{
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
              <Text style={styles.optionTitle}>Power Moves</Text>
              <Text style={styles.optionValue}>9.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '10%' }} />
            </ImageBackground>
          </View>


          <View>
            <View style={styles.textWrap}>
              <Text style={styles.optionTitle}>Finesse Moves</Text>
              <Text style={styles.optionValue}>4.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '60%' }} />
            </ImageBackground>
          </View>

          <View>
            <View style={styles.textWrap}>
              <Text style={styles.optionTitle}>Acceleration</Text>
              <Text style={styles.optionValue}>7.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '30%' }} />
            </ImageBackground>
          </View>

          <View>
            <View style={styles.textWrap}>
              <Text style={styles.optionTitle}>Block Shedding</Text>
              <Text style={styles.optionValue}>10.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '0%' }} />
            </ImageBackground>
          </View>

          <View>
            <View style={styles.textWrap}>
              <Text style={styles.optionTitle}>Tackling</Text>
              <Text style={styles.optionValue}>2.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '80%' }} />
            </ImageBackground>
          </View>

          <View>
            <View style={styles.textWrap}>
              <Text style={styles.optionTitle}>Penetration</Text>
              <Text style={styles.optionValue}>5.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '50%' }} />
            </ImageBackground>
          </View>

          <View>
            <View style={styles.textWrap}>
              <Text style={styles.optionTitle}>Motor</Text>
              <Text style={styles.optionValue}>9.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '10%' }} />
            </ImageBackground>
          </View>

          <View>
            <View style={styles.textWrap}>
              <Text style={styles.optionTitle}>Speed</Text>
              <Text style={styles.optionValue}>6.0</Text>
            </View>
            <ImageBackground source={require('@assets/images/Rectangle.png')} style={styles.gradientLine}>
              <View style={{ ...styles.grayLine, width: '40%' }} />
            </ImageBackground>
          </View>



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