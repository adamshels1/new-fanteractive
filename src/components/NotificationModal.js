import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from '@components'
import { colors } from '@constants'
import moment from 'moment'

export default class NotificationModal extends Component {

  render() {
    const { onClose, event, action, points, loadingAction, onDelete, onOk, from } = this.props;
    const imageSource = event?.logo ? { uri: event.logo } : require('@assets/images/no_logo.png');
    return (
      <Modal
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down', 'up']}
        onBackdropPress={onClose}
        avoidKeyboard={true}
        {...this.props}
      >
        <SafeAreaView style={styles.container}>

          {/* <TouchableOpacity onPress={onClose} style={styles.close}>
            <Image source={require('@assets/icons/x.png')} style={styles.closeIcon} />
          </TouchableOpacity> */}


          <View style={styles.content}>

            {event?.title && (
              <View style={styles.cardHeader}>
                <Image source={imageSource} style={styles.image} />
                <View style={styles.wrapInfo}>

                  <Text style={styles.title}>
                    {event?.title}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.optionWrap}>
                      <Image source={require('@assets/icons/maps.png')} style={{ width: 10, height: 13 }} />
                      <Text style={styles.optionText} numberOfLines={1}>
                        {event?.address}
                      </Text>
                    </View>
                    <View style={styles.optionWrap}>
                      <Image source={require('@assets/icons/agenda.png')} style={{ width: 12, height: 12 }} />
                      <Text style={styles.optionText} numberOfLines={1}>
                        {moment(event?.date_from).format('DD MMMM')} - {moment(event?.date_to).format('DD MMMM')}
                      </Text>
                    </View>
                  </View>

                </View>
              </View>
            )}

            {event && (
              <View>
                {/* <Text style={{ marginTop: 7 }}>
                <Text style={styles.availablePoints}>
                  You Earned Rewards:  <Text style={styles.points}>200</Text> <Text style={{ color: '#121212' }}>points</Text>
                </Text>
              </Text> */}

                {from && (
                  <Text style={{ marginTop: 7 }}>
                    <Text style={styles.availablePoints}>
                      Message from: <Text style={{ color: '#F2A71D' }}>{from?.first_name} {from?.last_name}</Text>
                    </Text>
                  </Text>
                )}

                <Image source={{ uri: event?.intro_image }} style={styles.image2} />

                <Text style={styles.text} numberOfLines={3}>
                  {event?.content}
                </Text>
              </View>
            )}


            {points && (
              <View style={{ alignItems: 'center', marginBottom: 28, marginTop: 20 }}>
                <Text style={styles.text2}>
                  Congratulations!{`\n`}
                  You Earned Rewards:
                </Text>
                <Text style={{ marginTop: 12 }}>
                  <Text style={styles.points}>{action} {points}</Text> <Text style={{ color: '#121212' }}>points</Text>
                </Text>
              </View>
            )}


            <View style={styles.line} />

            {loadingAction ? (
              <ActivityIndicator style={{ marginTop: 20, marginBottom: 10 }} />
            ) : (
              <View style={styles.buttons}>
                <TouchableOpacity onPress={onDelete} style={styles.button}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <View style={styles.line2} />
                <TouchableOpacity onPress={this.props.onOk} style={styles.button}>
                  <Text style={styles.okText}>Ok</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>


        </SafeAreaView>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, justifyContent: 'center', paddingTop: '20%' },
  container: { marginHorizontal: 10, backgroundColor: '#FFF', borderRadius: 9, paddingHorizontal: 13, paddingVertical: 20 },
  text: { marginTop: 12, fontWeight: '400', fontFamily: 'Avenir', fontSize: 14, color: '#121212' },
  day: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 12, color: '#121212', textAlign: 'center' },
  points: { marginTop: 12, marginBottom: 48, fontWeight: '700', fontFamily: 'Avenir', fontSize: 35, color: '#2D77C5', textAlign: 'center' },
  image: { width: 151, height: 151, marginTop: 68, marginBottom: 50 },

  content: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  title: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 16, color: '#121212', marginBottom: 3 },
  number: { fontFamily: 'Avenir', fontWeight: '700', fontSize: 20, color: '#CFCFCF', marginTop: 6 },
  wrapInfo: { width: '70%', marginLeft: 18 },
  availablePoints: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 16, color: '#7A7A7A' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' },
  image: { width: 55, height: 55, borderRadius: 25 },
  optionWrap: { flexDirection: 'row', alignItems: 'center', marginRight: 11, marginTop: 7 },
  optionText: { fontFamily: 'Avenir', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 7, maxWidth: 120 },

  deleteText: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 15, color: '#D91F26', marginBottom: 3 },
  okText: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 15, color: '#2D77C5', marginBottom: 3 },
  cardHeader: {
    flexDirection: 'row', borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 15
  },
  close: { position: 'absolute', right: 10, top: 10 },
  closeIcon: { width: 38, height: 34 },
  image2: { width: '100%', height: 164, marginTop: 13, marginBottom: 12 },
  line: { backgroundColor: '#E2E2E2', height: 1, width: '100%', marginTop: 15 },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  button: { width: '49%', height: 55, justifyContent: 'center', alignItems: 'center' },
  line2: { height: 25, width: 1, backgroundColor: '#E2E2E2' },
  text2: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 13, color: '#7A7A7A', textAlign: 'center' },
});
