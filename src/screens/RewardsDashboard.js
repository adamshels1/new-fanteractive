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

export default function BecomeSponsor({ route, navigation }) {

  const [visibleLogin, setVisibleLogin] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const [isloggedin, setLoggedin] = useState([false])
  useEffect(() => {
    setLoggedin(token)
  });

  const data = [
    {
      title: 'Leaderboard',
      icon: require('@assets/icons/team-leader.png'),
      route: 'Leaderboard'
    },
    {
      title: 'Collect Daily Points',
      icon: require('@assets/icons/Collect.png'),
      route: 'CollectPoints'
    },
    {
      title: 'Browse Rewards',
      icon: require('@assets/icons/ere.png'),
      route: 'Rewards'
    },
    {
      title: 'My Rewards',
      icon: require('@assets/icons/my_rewards.png'),
      route: 'MyRewards'
    },
    {
      title: 'History of Points',
      icon: require('@assets/icons/history_rewards.png'),
      route: 'HistoryPoints'
    },
    {
      title: 'How Rewards Work',
      icon: require('@assets/icons/conversation.png'),
      // route: 'HowToGetRewards',
      route: 'PageHowToGetRewards',
      params: { title: 'How+to+get+rewards?', showBack: true }
    }
  ]

  const onItem = (route, params) => {
    if (isloggedin || route === 'PageHowToGetRewards') {
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
        title={'Rewards Dashboard'}
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
        renderHeader={() => <Image source={require('@assets/images/rew.png')} style={{ width: 185, height: 172, marginTop: 34 }} />}
        text={`Please Login or Register \nto Use Rewards Dashbord`}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <View style={{ paddingHorizontal: 17, alignItems: 'center' }}>



          <FlatList
            style={{ marginTop: 6, width: '100%' }}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => 'restaurants-' + index}
            ListHeaderComponent={<View style={{ alignItems: 'center', marginTop: 29 }}>
              <Image style={styles.image} resizeMode='contain' source={require('@assets/images/rew.png')} />
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
  image: { width: 205, height: 189 },
  title: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
  button: { height: 70, backgroundColor: '#fff', borderRadius: 12, width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 23, marginBottom: 10 },
  icon: { width: 36, height: 36, marginRight: 25 },
})