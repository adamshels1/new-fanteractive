import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text } from '@components'
import { colors } from '@constants'

export default class RedeemRewardModal extends Component {

  render() {
    const { onClose, onRedeem, isLoading, intro_image, address, content, title, points, onPress } = this.props
    const imageSource = intro_image ? { uri: intro_image } : require('@assets/images/no_image.png')
    return (
      <Modal
        style={styles.modal}
        onSwipeComplete={onClose}
        swipeDirection={['down', 'up']}
        onBackdropPress={onClose}
        avoidKeyboard={true}
        {...this.props}
      >

        <View style={styles.container}>
          <Image
            source={imageSource}
            style={styles.image}
          />

          <View style={{ marginTop: 15, paddingHorizontal: 19 }}>
            <View style={styles.optionWrap}>
              <Image source={require('@assets/icons/maps.png')} style={{ width: 10, height: 13 }} />
              <Text style={styles.optionText} numberOfLines={1}>
                {address}
              </Text>
            </View>

            <Text style={styles.title}>
              {title}
            </Text>
            <Text style={styles.desc}>
              {content}
            </Text>

            <View style={{ height: 1, width: '100%', backgroundColor: '#CFCFCF', marginVertical: 28 }} />

            <View style={{ marginBottom: 38, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.availablePoints}>
                <Text style={styles.points}>{points}</Text> points
              </Text>
              <Button
                style={{ width: 188 }}
                text='Redeem Now'
                onPress={onRedeem}
                isLoading={isLoading}
                disabled={isLoading}
              />
            </View>

          </View>

        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { marginHorizontal: 10, backgroundColor: '#FFF', borderRadius: 12, bottom: 0 },

  day: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 12, color: '#121212', textAlign: 'center' },
  image: { width: '100%', height: 251, borderTopRightRadius: 12, borderTopLeftRadius: 12 },

  optionWrap: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontFamily: 'Avenir', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10, width: 230 },
  title: { marginTop: 11, fontWeight: '600', fontFamily: 'Avenir', fontSize: 16, color: '#121212' },
  desc: { marginTop: 10, fontWeight: '400', fontFamily: 'Avenir', fontSize: 14, color: '#121212' },
  availablePoints: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 16, color: '#121212' },
  points: { fontWeight: '700', fontSize: 16, color: '#F2A71D' }
});
