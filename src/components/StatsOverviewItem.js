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
import helper from '@services/helper';
const windowWidth = Dimensions.get('window').width;

export default function StatsOverviewItem(props) {
  const { onChangeComment, format = 'avarageNumber' } = props
  const [visibleComment, setVisibleComment] = useState(false)
  const toggleVisivleComment = () => {
    setVisibleComment(!visibleComment)
    props?.toggleVisivleComment && props.toggleVisivleComment(props.id)
  }
  const { value = 0 } = props

  let formatValue = helper.formatAvarageNumber(value)
  if (format === 'alphabetical') {
    formatValue = helper.fixAlphabetical(formatValue)
  }

  if (onChangeComment) return (
    <View>
      <View style={styles.wrapTitle}>
        <Text style={styles.sliderTitle}>
          {props.field}:
        </Text>
      </View>
      <View style={styles.sliderOptions}>
        <MultiSlider
          // onValuesChangeStart={disableScroll}
          // onValuesChangeFinish={enableScroll}
          // isMarkersSeparated={()=><View style={{backgroundColor: 'red', width: 10, height: 10}}/>}
          imageBackgroundSource={require('@assets/images/Rectangle.png')}
          // customMarker={() => <Image source={require('@assets/icons/slider-marker.png')} style={{ width: 40, height: 40 }} />}
          unselectedStyle={{ backgroundColor: '#CBD5EA' }}
          selectedStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
          markerStyle={styles.markerStyle}
          values={[
            value,
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
          onValuesChange={props?.onValuesChange}
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
        <View style={{ width: 40, marginLeft: 26 }}>
          <Text style={styles.sliderValue}>
            {formatValue}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleVisivleComment}>
          {/* <Image source={require('@assets/icons/add2.png')} style={styles.sliderIcon} /> */}
          <Image source={visibleComment ? require('@assets/icons/add2-red.png') : require('@assets/icons/add2.png')} style={styles.sliderIcon} />
        </TouchableOpacity>
      </View>

      {visibleComment && (
        <View style={styles.block}>
          <Text style={styles.writeFieldTitle}>Write Your Comment</Text>
          <TextInput
            style={styles.writeInput} multiline
            value={props?.comment}
            onChangeText={props.onChangeComment}
          />
        </View>
      )}


    </View>
  )
  return (
    <View style={{ marginTop: 10 }}>
      <View>
        <View style={styles.wrapTitle}>
          <Text style={styles.sliderTitle}>
            {props.field}:
          </Text>

          <Text style={styles.sliderValue}>
            {helper.formatAvarageNumber(value)}
          </Text>
        </View>

        <View style={styles.sliderOptions}>
          <MultiSlider
            // onValuesChangeStart={disableScroll}
            // onValuesChangeFinish={enableScroll}
            // isMarkersSeparated={()=><View style={{backgroundColor: 'red', width: 10, height: 10}}/>}
            imageBackgroundSource={require('@assets/images/Rectangle.png')}
            // customMarker={() => <Image source={require('@assets/icons/slider-marker.png')} style={{ width: 40, height: 40 }} />}
            unselectedStyle={{ backgroundColor: '#CBD5EA' }}
            selectedStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
            markerStyle={{ backgroundColor: '#fff', borderWidth: 0, borderColor: 'gray' }}
            values={[
              value,
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
            sliderLength={windowWidth - 30}
            onValuesChange={props?.onValuesChange}
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
        </View>
      </View>

      {visibleComment && (
        <View style={styles.block}>
          <Text style={styles.writeFieldTitle}>Write Your Comment</Text>
          <TextInput
            style={styles.writeInput} multiline
            value={props?.comment}
            onChangeText={props.onChangeComment}
          />
        </View>
      )}

    </View>
  )

}

const styles = StyleSheet.create({
  sliderTitle: { fontWeight: '800', color: '#2B2B2B', fontSize: 18 },
  sliderOptions: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  sliderValue: { fontFamily: 'Oswald', fontWeight: '700', fontSize: 18, color: '#2B2B2B' },
  sliderIcon: { width: 29, height: 28, marginLeft: 13 },
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
  markerStyle: {
    backgroundColor: '#fff', borderWidth: 0, borderColor: 'gray',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.22,
    elevation: 3,
  },
});
