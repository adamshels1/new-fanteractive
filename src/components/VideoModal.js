import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from '@components'
// import YoutubePlayer from "react-native-youtube-iframe"
import helper from '@services/helper'
import { server } from '@constants'

export default class VideoModal extends Component {

  render() {
    const { onClose, videoUrl } = this.props
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


          {/* {helper.getYoutubeVideoId(videoUrl) ? (
            <YoutubePlayer
              videoId={helper.getYoutubeVideoId(videoUrl)}
              play={false}
              height={211}
              width={'100%'}
            />
          ) : null} */}


          <View style={styles.footer}>

            <TouchableOpacity
              onPress={() => Linking.openURL(videoUrl)}
              style={styles.footerButton}
            >
              <Text style={styles.watchText}>Watch on YouTube</Text>
            </TouchableOpacity>
            <View style={styles.line2} />
            <TouchableOpacity
              onPress={onClose}
              style={styles.footerButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>

          </View>


        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFF', borderRadius: 12, bottom: 0 },
  footerButton: { width: 160, alignItems: 'center', justifyContent: 'center', height: 40 },
  watchText: { fontWeight: '700', fontSize: 15, color: '#FF0000' },
  closeText: { fontWeight: '700', fontSize: 15, color: '#F2A71D' },
  footer: { marginBottom: 38, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, paddingHorizontal: 19, },
  line2: { height: 29, width: 1, backgroundColor: '#E2E2E2', height: 29 },
});
