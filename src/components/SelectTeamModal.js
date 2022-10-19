import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class LoginModal extends Component {

  render() {
    const { onClose, visitor_team, local_team, onSelect } = this.props;
    console.log('visitor_team', visitor_team)
    return (
      <Modal
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down', 'up']}
        onBackdropPress={onClose}
        avoidKeyboard={true}
        {...this.props}
      >
        <SafeAreaView>
          <View style={styles.container}>

            <TouchableOpacity onPress={onClose} style={styles.closeWrap}>
              <Image source={require('@assets/icons/x2.png')} style={styles.closeIcon} />
            </TouchableOpacity>


            <View style={{ alignItems: 'center' }}>
              {/* <Image source={require('@assets/icons/comments.png')} style={{ width: 118, height: 118, marginTop: 39 }} /> */}

              {/* <Image source={require('@assets/images/rew.png')} style={{ width: 185, height: 172, marginTop: 34 }} /> */}

              <Text style={styles.text}>
                Select team you would
                {`\n`}
                like to grade:
              </Text>



              <View style={styles.bodyBottom}>


                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 4, padding: 11 }}
                  onPress={() => onSelect('local')}
                >
                  <Image source={{ uri: local_team?.thumbnail?.url }} style={{ width: 52, height: 52 }} />
                  <View style={{ marginLeft: 12, top: 2 }}>
                    <Text style={{ fontWeight: '800', fontSize: 16, color: '#00293B' }}>
                      {local_team?.name}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('@assets/icons/type.png')} style={{ width: 12, height: 12 }} />
                      <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 12, color: '#ADB6D4', marginLeft: 7 }}>
                        {local_team?.country}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>




                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 4, padding: 11, marginTop: 7 }}
                  onPress={() => onSelect('visitor')}
                >
                  <Image source={{ uri: visitor_team?.thumbnail?.url }} style={{ width: 52, height: 52 }} />
                  <View style={{ marginLeft: 12, top: 2 }}>
                    <Text style={{ fontWeight: '800', fontSize: 16, color: '#00293B' }}>
                      {visitor_team?.name}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('@assets/icons/type.png')} style={{ width: 12, height: 12 }} />
                      <Text style={{ fontFamily: 'Oswald', fontWeight: '500', fontSize: 12, color: '#ADB6D4', marginLeft: 7 }}>
                        {visitor_team?.country}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.wrapButtons}>


                </View>

              </View>

            </View>

          </View>
        </SafeAreaView>
      </Modal >
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, justifyContent: 'center', paddingTop: '20%' },
  container: { marginHorizontal: 10, backgroundColor: '#FFF', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 20 },

  text: { marginTop: 15, fontWeight: '800', fontFamily: 'Avenir', fontSize: 24, lineHeight: 26, color: '#00293B', textAlign: 'center', marginBottom: 20 },


  bodyBottom: { width: '100%' },
  orWrap: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 19 },
  or: { color: '#B7B7B7', fontFamily: 'Avenir', fontWeight: '600', fontSize: 14 },
  fbIcon: { width: 18, height: 18, marginRight: 8 },
  emailIcon: { width: 18, height: 18, marginRight: 8 },
  line: { backgroundColor: '#B7B7B7', height: 1, width: '30%' },
  wrapButtons: { marginTop: 19, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  closeWrap: { position: 'absolute', right: 10, top: 10, zIndex: 1 },
  closeIcon: { width: 38, height: 34 },
});
