import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { TouchableOpacity } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;

export default function StatsOverviewItem(props) {
  const [visibleComment, setVisibleComment] = useState(false)
  return (
    <View>
      <View>
        <Text style={styles.sliderTitle}>
          {props.field}:
        </Text>
        <View style={styles.sliderOptions}>
          <MultiSlider
            // onValuesChangeStart={disableScroll}
            // onValuesChangeFinish={enableScroll}
            // isMarkersSeparated={()=><View style={{backgroundColor: 'red', width: 10, height: 10}}/>}
            imageBackgroundSource={require('@assets/images/Rectangle.png')}
            customMarker={() => <Image source={require('@assets/icons/slider-marker.png')} style={{ width: 40, height: 40 }} />}
            unselectedStyle={{ backgroundColor: '#CBD5EA' }}
            selectedStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
            markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
            values={[
              100,
            ]}
            min={0}
            max={100}
            enabledTwo={true}
            containerStyle={{
              height: 4,
            }}
            trackStyle={{
              height: 4,
              backgroundColor: 'red',
            }}
            sliderLength={windowWidth - 155}
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
          <TouchableOpacity onPress={() => setVisibleComment(!visibleComment)}>
            {/* <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} /> */}
            <Image source={visibleComment ? require('@assets/icons/add2-red.png') : require('@assets/icons/add2.png')} style={styles.sliderIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {visibleComment && (
        <View style={styles.block}>
          <Text style={styles.writeFieldTitle}>Write Your Comment</Text>
          <TextInput
            style={styles.writeInput} multiline
            value='Strength allows him to break most arm tackles and fight for every inch, however, if he gets stronger'
            onChangeText={props.onChangeComment}
          />
        </View>
      )}


    </View>
  )
}

const styles = StyleSheet.create({
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
});
