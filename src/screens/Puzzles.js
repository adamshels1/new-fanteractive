import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  BackHandler
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Input, Button, StatusBar, Text } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import { setUserAction } from '@redux/actions/userActions'

export default function Puzzles({ route, navigation }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)

  const [puzzles, setPuzzles] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    getPuzzles(true)
  }, []);

  const getPuzzles = async (showLoader) => {
    try {
      if (showLoader) {
        dispatch(loaderAction({ isLoading: true }))
      }

      const data = await mainApi.getPuzzles({
        user_id: user?.userId,
        token,
      })
      setPuzzles(data?.puzzles)
      setData(data?.user)
      if (data?.user) {
        dispatch(setUserAction({ ...user, ...data.user }))
      }
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const avatarSource = user?.avatar ? { uri: user?.avatar } : require('@assets/images/no_avatar.png')

  const renderHeaderComponent = () => {
    return (
      <View>
        <View style={styles.listHeader}>

          <Image style={styles.image} resizeMode='contain' source={avatarSource} />

          <View style={{ flexDirection: 'row', marginLeft: 22 }}>
            <Text style={styles.option}>
              <Text style={styles.optionTitle}>
                RANK:
              </Text>
              {` `}{data?.rank}
            </Text>
            <Text style={styles.option}>
              <Text style={styles.optionTitle}>
                POINTS:
              </Text>
              {/* {` `}{data?.points?.total} */}
              {` `}{user?.points?.total}
            </Text>
          </View>

        </View>

        <View
          style={{ height: 85, backgroundColor: '#fff', width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 23, borderBottomWidth: 1, borderColor: '#EAEAEA', borderTopRightRadius: 12, borderTopLeftRadius: 12 }}
        >
          <Image style={{ width: 46, height: 45 }} resizeMode='contain' source={require('@assets/icons/Puzzle.png')} />
          <Text style={{ fontWeight: '600', fontSize: 18, color: '#121212', marginLeft: 17 }}>Puzzles</Text>
        </View>
      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    const isLastItem = (index + 1) === data.length
    const buttonStyle = isLastItem ? { ...styles.button, borderBottomRightRadius: 12, borderBottomLeftRadius: 12 } : styles.button
    const disabled = item?.quantity === 0
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Puzzle', { puzzle: item })}
        style={[buttonStyle, { opacity: disabled ? 0.5 : 1 }]}
        disabled={disabled}
      >
        <View style={styles.itemTitleWrap}>
          <Image style={styles.icon} resizeMode='contain' source={require('@assets/icons/Trivia2.png')} />
          <Text>{item?.title}</Text>
        </View>

        <Image style={styles.arrowIcon} resizeMode='contain' source={require('@assets/icons/arrow-gray.png')} />
      </TouchableOpacity>
    )
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
        goBack={navigation.goBack}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      >
        <View style={{ paddingHorizontal: 17, alignItems: 'center' }}>



          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={puzzles}
            keyExtractor={(item, index) => 'puzzles-' + index}
            ListHeaderComponent={renderHeaderComponent}
            ListFooterComponent={<View style={{ height: 50 }} />}
            renderItem={renderItem}
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
  image: { width: 76, height: 76, borderRadius: 38 },
  title: { fontFamily: 'Avenir', color: '#121212', fontWeight: '400', fontSize: 24 },
  text: { fontFamily: 'Avenir', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
  button: { height: 62, backgroundColor: '#fff', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 23, borderBottomWidth: 1, borderColor: '#EAEAEA' },
  icon: { width: 36, height: 36, marginRight: 25 },
  listHeader: { marginTop: 19, marginBottom: 22, flexDirection: 'row', alignItems: 'center' },
  option: { fontWeight: '700', fontSize: 18, color: '#F2A71D', marginRight: 15 },
  optionTitle: { fontWeight: '400', fontSize: 16, color: '#121212', textDecorationLine: 'underline' },
  arrowIcon: { width: 6, height: 10 },
  flatList: { width: '100%', paddingBottom: 40 },
  itemTitleWrap: { flexDirection: 'row', alignItems: 'center' },
})