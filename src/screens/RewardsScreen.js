import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Linking
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Button, RewardsListItem, Text } from '@components'
import { logout } from '@redux/actions/userActions'
import { setRewardsAction } from '@redux/actions/mainActions'
import { loaderAction } from '@redux/actions/loaderActions'
import { mainApi } from '@api'
import _ from 'lodash'

export default function RewardsScreen({ navigation }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const rewards = useSelector(state => state.mainReducer.rewards)
  const [isloggedin, setLoggedin] = useState([false])
  useEffect(() => {
    setLoggedin(token)
  });
  const loadRewards = async () => {
    try {
      const { email } = user
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.getRewards({ email, token });
      if (res.state !== 'error' && res) {
        dispatch(setRewardsAction(res))
      }
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      dispatch(loaderAction({ isLoading: false }))
      console.log(e)
    }
  }
  useEffect(() => {
    loadRewards();
  }, []);
  const total = _.sumBy(rewards, 'value');
  if (isloggedin && !rewards.length) return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header title='Rewards' />
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text style={styles.bodyTitle}>
            Rewards not available
          </Text>
          <Text style={styles.desc}>
            You haven't earned any awards yet
          </Text>
          <Image style={styles.image2} source={require('@assets/images/rew.png')} />
        </View>
      </View>
    </SafeAreaView>
  )
  if (isloggedin) return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title='Rewards'
        showMenu
        navigation={navigation}
      // onMenu={() => dispatch(logout())}
      />

      <FlatList
        style={{ marginTop: 11 }}
        data={rewards}
        keyExtractor={(item, index) => 'reward-' + index}
        renderItem={({ item }) => <RewardsListItem {...item} />}
      />
      <View style={styles.totalWrap}>
        <Text style={styles.total}>
          TOTAL: <Text style={styles.totalCount}>{total}</Text> points
        </Text>
      </View>
    </SafeAreaView>
  )
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header title='Rewards' />
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <Text style={styles.bodyTitle}>
            Rewards not available
          </Text>
          <Image style={styles.image} source={require('@assets/images/trophy.png')} />
          <Text style={styles.desc}>
            You haven't earned any awards yet
          </Text>
        </View>

        <View style={styles.bodyBottom}>
          <Button
            text='Log in'
            inverter
            onPress={() => navigation.navigate('Login')}
          />
          <Button
            text='Sign up to get started'
            style={{ marginTop: 25 }}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
        <Text style={{ marginTop: 20, fontSize: 12, color: 'gray' }}>
          AppVersion (3)
        </Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  body: { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 17, flex: 1 },
  bodyTop: { marginTop: 46, alignItems: 'center' },
  bodyBottom: { marginBottom: 30, width: '100%' },
  bodyTitle: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 24, color: '#121212' },
  desc: { marginTop: 30, fontFamily: 'Avenir', fontWeight: '400', color: '#7A7A7A', fontSize: 18 },
  image: { width: 80, height: 80, marginTop: 35 },
  image2: { width: 346, height: 346, marginTop: 51 },
  totalWrap: { height: 68, width: '100%', backgroundColor: '#F5F5F5', alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 },
  total: { fontFamily: 'Avenir', fontWeight: '400', color: '#121212', fontSize: 18 },
  totalCount: { color: '#F2A71D', fontWeight: '700' }
})