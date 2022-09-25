import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Input, Button, StatusBar, Text, LoginModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'

export default function Games({ route, navigation }) {

  const [visibleLogin, setVisibleLogin] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const [isloggedin, setLoggedin] = useState([false])
  useEffect( () => {
    setLoggedin(token)
  });

  const data = [
    {
      title: 'Puzzles',
      icon: require('@assets/icons/Puzzle.png'),
      route: 'Puzzles'
    },
    {
      title: 'E-Trivia',
      icon: require('@assets/icons/Trivia.png'),
      route: 'TriviaStackScreen'
    },
  ]

  const onItem = (route, params) => {
    if (isloggedin) {
      navigation.navigate(route, params)
    } else {
      setVisibleLogin(true)
    }
  }


  const onLogin = () => {
    setVisibleLogin(false)
    navigation.navigate('Login')
  }

  const onEmail = () => {
    setVisibleLogin(false)
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Mini Games'}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
      />

      <LoginModal
        isVisible={visibleLogin}
        onClose={() => setVisibleLogin(false)}
        onLogin={onLogin}
        onEmail={onEmail}
        renderHeader={() => <Image source={require('@assets/images/games.png')} style={{ width: 226, height: 131, marginTop: 46, marginBottom: 8 }} />}
        text={`Please Login or \nRegister to Use Mini Games`}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <View style={{ paddingHorizontal: 17, alignItems: 'center' }}>



          <FlatList
            style={{ marginTop: 6, width: '100%', paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => 'restaurants-' + index}
            ListHeaderComponent={<View style={styles.listHeader}>
              <Image style={styles.image} resizeMode='contain' source={require('@assets/images/games.png')} />
            </View>}
            ListFooterComponent={<View style={{ height: 50 }} />}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => onItem(item.route, item.params)}
                  style={styles.button}
                >
                  <Image style={styles.icon} resizeMode='contain' source={item.icon} />
                  <Text>{item?.title}</Text>
                </TouchableOpacity>
              )
            }}
          />


        </View>

      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  image: { width: 258, height: 150 },
  title: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
  button: { height: 70, backgroundColor: '#fff', borderRadius: 12, width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 23, marginBottom: 10 },
  icon: { width: 36, height: 36, marginRight: 25 },
  listHeader: { alignItems: 'center', marginTop: 40, marginBottom: 56 }
})