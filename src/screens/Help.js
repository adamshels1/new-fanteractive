import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { Header, Input, Button, StatusBar, Text } from '@components'

export default function Help({ route, navigation }) {

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Help'}
        goBack={navigation.goBack}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={{ paddingVertical: 26, paddingHorizontal: 17 }}>

            <Text style={styles.title}>
              How the app works?
            </Text>

            <Image style={styles.image} resizeMode='contain' source={require('@assets/images/vid.png')} />

            <Text style={styles.title}>
              How to get rewards?
            </Text>

            <Text style={styles.text}>
              Excepteur sint occaecat cupidatat, dolore eu fugiat nulla pariatur non proident. Dolorem sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et fugiat nulla pariatur dolore magna aliqua.
              {`\n\n`}
              Irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>


            <Button
              style={{ marginTop: 50 }}
              text='View tutorial'
            // onPress={onSignup}
            />

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