import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Input, StatusBar, Header } from '@components'
import { colors } from '@constants'
import * as Animatable from 'react-native-animatable';
import { Text } from '@components'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

export default function FilterModal(props) {
  const { onClose } = props;

  const enableScroll = () => this.setState({ scrollEnabled: true });
  const disableScroll = () => this.setState({ scrollEnabled: false });

  return (
    <Modal
      style={styles.modal}
      onSwipeComplete={onClose}
      // swipeDirection={['down', 'up']}
      onBackdropPress={onClose}
      avoidKeyboard={true}
      {...props}
    >
      <StatusBar barStyle='dark-content' />

      <View style={styles.container}>
        <Header
          showClose
          onClose={onClose}
        />
        <ScrollView>


          <Text style={{ fontWeight: '700', fontSize: 22, color: '#00293B', paddingRight: 10, textTransform: 'uppercase', textAlign: 'center', marginTop: 22, fontFamily: 'Oswald' }}>
            Search by name
          </Text>


          <View style={{ paddingHorizontal: 19, marginTop: 14 }}>

            <Input
              field='Player Name'
              showSearchIcon
            />

            <Text style={{ fontWeight: '700', fontSize: 22, color: '#00293B', paddingRight: 10, textTransform: 'uppercase', textAlign: 'center', marginTop: 22, fontFamily: 'Oswald' }}>
              Advanced Filter
            </Text>


            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Text style={styles.fieldName}>Avarage Stats</Text>
                <Text style={styles.fieldName}>From <Text style={styles.sliderValue}>1.3 </Text>to <Text style={styles.sliderValue}>9.0</Text></Text>
              </View>
              <MultiSlider
                // onValuesChangeStart={disableScroll}
                // onValuesChangeFinish={enableScroll}
                unselectedStyle={{ backgroundColor: '#7D86A9' }}
                selectedStyle={{ backgroundColor: '#5FC422' }}
                markerStyle={{ backgroundColor: '#fff', borderWidth: 4, borderColor: '#5FC422' }}
                values={[
                  10,
                  100,
                ]}
                min={0}
                max={100}
                isMarkersSeparated
                enabledTwo={true}
                enabledOne={true}
                containerStyle={{
                  height: 40,
                }}
                trackStyle={{
                  height: 4,
                  backgroundColor: 'red',
                }}
                sliderLength={350}
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

          <View style={{ borderBottomWidth: 1, borderColor: '#8F9FB3', marginTop: 25 }} />

          <View style={styles.tagsWrap}>
            <Text style={styles.fieldName}>Sport</Text>
            <TouchableOpacity>
              <Image
                style={styles.addIcon}
                source={require('@assets/icons/add.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsWrap}>
            <Text style={styles.fieldName}>League</Text>
            <TouchableOpacity>
              <Image
                style={styles.addIcon}
                source={require('@assets/icons/add.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsWrap}>
            <Text style={styles.fieldName}>Position</Text>
            <TouchableOpacity>
              <Image
                style={styles.addIcon}
                source={require('@assets/icons/add.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsWrap}>
            <Text style={styles.fieldName}>Team</Text>
            <TouchableOpacity>
              <Image
                style={styles.addIcon}
                source={require('@assets/icons/add.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsWrap}>
            <Text style={styles.fieldName}>Status</Text>
            <TouchableOpacity>
              <Image
                style={styles.addIcon}
                source={require('@assets/icons/add.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsWrap}>
            <Text style={styles.fieldName}>Country</Text>
            <TouchableOpacity>
              <Image
                style={styles.addIcon}
                source={require('@assets/icons/add.png')}
              />
            </TouchableOpacity>
          </View>


          <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'center', alignItems: 'space-around', width: '100%', paddingBottom: 60 }}>
            <Button
              text='Clear all'
              textStyle={{ fontSize: 18, color: '#D0021B' }}
              inverter
              style={{ width: 138, marginRight: 10 }}
              color='#fff'
            />
            <Button
              text='Apply'
              style={{ width: 186 }}
            />
          </View>
        </ScrollView>
      </View>

    </Modal>
  );

}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0 },
  container: { backgroundColor: '#FFF', borderRadius: 12, bottom: 0, flex: 1 },

  closeButton: { position: 'absolute', right: 10, top: 10, flex: 1 },
  closeIcon: { width: 38, height: 34 },

  fieldName: {
    fontFamily: 'Avenir', fontWeight: '500', fontSize: 16, color: '#000000'
  },
  sliderValue: { color: '#7D86A9', fontSize: 18, fontWeight: '700', fontFamily: 'Oswald' },
  tagsWrap: { height: 59, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 30, paddingRight: 18, borderBottomWidth: 1, borderColor: '#8F9FB3' },
  addIcon: { width: 20, height: 20 },
});
