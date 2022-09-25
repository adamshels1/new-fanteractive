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
import { Header, Input, Button, StatusBar, Text } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'

export default function Trivia({ route, navigation }) {


  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)

  const [typeOfTrivia, setTypeOfTrivia] = useState(null)

  useEffect(() => {
    setTypeOfTrivia(route?.params?.typeOfTrivia)
  }, []);

  const items = typeOfTrivia?.items ? typeOfTrivia?.items : []


  const renderItem = ({ item, index }) => {
    const isFirst = index === 0
    const isLast = items.length === (index + 1)
    let wrapStyle = { paddingHorizontal: 17, backgroundColor: '#fff' };
    if (isFirst) {
      wrapStyle = { ...wrapStyle, borderTopRightRadius: 12, borderTopLeftRadius: 12, paddingBottom: 7 }
    } else if (isLast) {
      wrapStyle = { ...wrapStyle, borderBottomRightRadius: 12, borderBottomLeftRadius: 12, paddingTop: 7 }
    }
    wrapStyle = { ...wrapStyle, opacity: item?.avalaible ? 1 : 0.4 }
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Questions', { trivia: item })}
        style={wrapStyle}
        disabled={!item?.avalaible}
      >
        <View
          style={styles.itemContent}
        >
          <Image style={styles.icon} resizeMode='contain' source={{ uri: item?.thumb }} />
          <View style={{ maxWidth: '76%' }}>
            <Text style={styles.itemTitle}>{item?.title}</Text>
            <Text style={styles.itemDesc}>
              {item.description}
            </Text>
          </View>

        </View>
        <View style={styles.itemLine} />
      </TouchableOpacity>
    )
  }

  const renderListHeaderComponent = () => {
    return (
      <View style={styles.listHeader}>
        <Image style={styles.image} resizeMode='contain' source={require('@assets/icons/Trivia2.png')} />
        <Text style={styles.visualText}>{typeOfTrivia?.category}</Text>
      </View>
    )
  }

  const renderListFooterComponent = <View style={{ height: 50 }} />

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={'Type of Trivia'}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
        goBack={navigation.goBack}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.content}>

          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={items}
            keyExtractor={(item, index) => 'restaurants-' + index}
            ListHeaderComponent={renderListHeaderComponent}
            ListFooterComponent={renderListFooterComponent}
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
    backgroundColor: '#F3F3F3'
  },
  content: { paddingHorizontal: 17, alignItems: 'center' },
  image: { width: 47, height: 47 },
  title: { fontFamily: 'Avenir', color: '#121212', fontWeight: '400', fontSize: 24 },
  text: { fontFamily: 'Avenir', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
  button: { backgroundColor: '#fff', borderRadius: 12, width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 23, paddingBottom: 15 },
  icon: { width: 84, height: 65, marginRight: 12 },
  listHeader: { alignItems: 'center', marginTop: 40, marginBottom: 29 },
  itemContent: { flexDirection: 'row', alignItems: 'center', paddingTop: 13 },
  itemTitle: { fontWeight: '600', fontSize: 14, lineHeight: 19.6 },
  itemDesc: { fontWeight: '400', fontSize: 13, color: '#7A7A7A', marginTop: 1 },
  itemLine: { height: 1, width: '100%', backgroundColor: '#EAEAEA', marginTop: 15 },
  visualText: { fontWeight: '400', fontSize: 16, marginTop: 17 },
  flatList: { marginTop: 6, width: '100%', paddingBottom: 40 }
})