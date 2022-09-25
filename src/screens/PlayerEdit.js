import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TextInput,
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
          style={{ height: 155, width: '100%' }}
        >
          <Image
            style={{ height: 155, width: '100%' }}
            source={{ uri: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt6ba33b35a143d067/60effe93f101cd22d91c320e/3d2b8d0b5a8ed594a2bf5c324547b22c7dfbebb2.jpg' }}
          />
          <View style={{ height: 81, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15 }}>
            <Text style={{ fontWeight: '700', fontSize: 32, color: '#FFF' }}>Harry Kane</Text>
            <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF' }}> • Running Back</Text>
          </View>
        </View>

        <Text style={{ fontFamily: 'Avenir', fontWeight: '800', color: '#00293B', fontSize: 24, textAlign: 'center', marginTop: 33 }}>
          Step1: Stats Overview
        </Text>



        <View style={{ paddingHorizontal: 26, marginTop: 45 }}>



          <View>
            <Text style={styles.sliderTitle}>Power Moves:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>8.0</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>


          <View>
            <Text style={styles.sliderTitle}>Acceleration:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>4.5</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>


          <View>
            <Text style={styles.sliderTitle}>Block Shedding:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>



          <View style={styles.block}>
            <Text style={styles.writeFieldTitle}>Write Your Comment</Text>
            <TextInput
              style={styles.writeInput} multiline
              value='Strength allows him to break most arm tackles and fight for every inch, however, if he gets stronger'
            />
          </View>



          <View>
            <Text style={styles.sliderTitle}>Penetration:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>8.0</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>


          <View>
            <Text style={styles.sliderTitle}>Motor:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>4.5</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>


          <View>
            <Text style={styles.sliderTitle}>Speed:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>



          <View style={styles.block}>
            <Text style={styles.writeFieldTitle}>Write Your Comment</Text>
            <TextInput style={[styles.writeInput, { borderWidth: 0 }]} multiline
              value='Harris has excellent hands, but his run after the catch is underwhelming, and he mainly runs bubble...'
            />
          </View>

          <View>
            <Text style={styles.sliderTitle}>Durability:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>
          <View>
            <Text style={styles.sliderTitle}>Size:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>
          <View>
            <Text style={styles.sliderTitle}>Character:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>
          <View>
            <Text style={styles.sliderTitle}>Technique:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>
          <View>
            <Text style={styles.sliderTitle}>Intangibles	:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>
          <View>
            <Text style={styles.sliderTitle}>Consistency:</Text>
            <View style={styles.sliderOptions}>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  100,
                ]}
                min={0}
                max={100}
                enabledTwo={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={200}
              // onValuesChange={api.debounce(
              //   (values) =>
              //     this.setState({
              //       hourly_rate: [
              //         Math.floor(values[0]),
              //         Math.floor(values[1]),
              //       ],
              //     }),
              //   100,
              // )}
              />
              <Text style={styles.sliderValue}>9.8</Text>
              <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} />
              {/* <Image source={require('@assets/icons/add2-red.png')} style={styles.sliderIcon} /> */}
            </View>
          </View>


          <Button text='Save and Continue' style={{width: '100%', marginTop: 36}}/>

          <View style={{ height: 100 }} />


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
})