import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { Header, Input, Button, Text } from '@components'

export default function Help({ route, navigation }) {

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Get rewards'}
        goBack={navigation.goBack}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={{ paddingVertical: 26, paddingHorizontal: 17 }}>

            <Text style={styles.title}>
              How to get rewards?
            </Text>

            <Image style={styles.image} resizeMode='contain' source={require('@assets/images/vid2.png')} />

            <Text style={styles.title}>
              What to do with rewards?
            </Text>

            <Text style={styles.text}>
              Excepteur sint occaecat cupidatat, dolore eu fugiat nulla pariatur non proident. Dolorem sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et fugiat nulla pariatur dolore magna aliqua.
            </Text>

            <Text style={styles.title}>
              How to get daily points?
            </Text>

            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
              {`\n`}
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
              {`\n`}
              Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: { width: 341, height: 201, marginBottom: 21, marginTop: 21 },
  title: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
})