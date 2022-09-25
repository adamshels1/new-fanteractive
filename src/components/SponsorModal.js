import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Input, SponsorListItem } from '@components'
import { colors } from '@constants'
import * as Animatable from 'react-native-animatable';
import { Text } from '@components'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function SponsorModal(props) {
  const [visibleSkipButton, setVisibleSkipButton] = useState(false)
  const { onClose, sponsor, onSponsor } = props

  const onCompleteTimer = () => {
    setVisibleSkipButton(true)
  }

  return (
    <Modal
      style={styles.modal}
      onSwipeComplete={onClose}
      // swipeDirection={['down', 'up']}
      // onBackdropPress={onClose}
      avoidKeyboard={true}
      {...props}
    >

      <View style={styles.container}>
        <ScrollView>
          <View style={{ paddingVertical: 30, paddingHorizontal: 18 }}>
            <Text style={{ fontWeight: '400', fontSize: 23, color: '#121212', textAlign: 'center', paddingBottom: 25 }}>
              Sponsor of Restaurant {`\n`}Week of Atlanta
            </Text>

            <SponsorListItem
              {...sponsor}
              hideButton={true}
              onPress={onSponsor}
            />

            <Button
              text={'Visit Sponsor'}
              style={{ marginTop: 20 }}
              onPress={onSponsor}
            />


            {visibleSkipButton ? (
              <Button
                text={'Skip'}
                inverter
                textStyle={{ color: '#F2A71D' }}
                style={{ marginTop: 20, marginBottom: 20 }}
                onPress={onClose}
              />
            ) : (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <CountdownCircleTimer
                  isPlaying
                  duration={9}
                  size={90}
                  strokeWidth={4}
                  onComplete={onCompleteTimer}
                  colors={[
                    ['#F2A71D', 0.4],
                    ['#F2A33A', 0.4],
                  ]}
                >
                  {({ remainingTime, animatedColor }) => (
                    <Animated.Text style={{ color: animatedColor, fontSize: 25, textAlign: 'center', fontWeight: '700' }}>

                      <Text style={styles.countText}>Skip after{`\n`}</Text>
                      {remainingTime}
                      <Text style={styles.countText}>{`\n`}Seconds</Text>

                    </Animated.Text>
                  )}
                </CountdownCircleTimer>
              </View>
            )}



          </View>
        </ScrollView>


      </View>
    </Modal>
  );

}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFF', borderTopRightRadius: 12, borderTopLeftRadius: 12, bottom: 0 },
  closeButton: { position: 'absolute', right: 10, top: 10 },
  closeIcon: { width: 38, height: 34 },
  countText: { color: '#626262', fontSize: 10, fontWeight: '400' },

});
