import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem, Button, FilterModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import { logout } from '@redux/actions/userActions'
import { CommonActions } from '@react-navigation/native'

export default function MyStadiumReport({ route, navigation }) {
  const dispatch = useDispatch()
  const [page, setPage] = useState({})
  const [visibleFilterModal, setVisibleFilterModal] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const userReducer = useSelector(state => state.userReducer)
  console.log('userReducer', userReducer)
  const [items, setItem] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.getMyArticles(token);
      console.log('scouting', res.data.data)
      setItem(res.data.data);
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log('scouting', e)
      dispatch(loaderAction({ isLoading: false }))
      if (e.response.status === 403) {
        console.log('logout')
        onLogout()
      }
    }
  }

  const onLogout = () => {
    dispatch(logout())
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
    navigation.dispatch(resetAction);
  }


  const renderListHeaderComponent = () => {
    return (
      <View>
        <BlockTitle title='MY ARTICLES' showLine />

        {/* <Button
          leftComponent={<Image source={require('@assets/icons/shape.png')} style={{ width: 26, height: 29, marginRight: 8 }} />}
          text='New STADIUM Report'
          style={{ marginTop: 17 }}
          textStyle={{ fontFamily: 'Oswald' }}
        /> */}

        <View style={styles.filtersWrap}>
          <TouchableOpacity style={styles.filterItem}>
            <Text style={styles.filterText}>Articles</Text>
            <Image
              style={styles.filterIcon}
              source={require('@assets/icons/Sort_Down_icon.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterItem}>
            <Text style={styles.filterText}>Your Grade</Text>
            <Image
              style={styles.filterIcon}
              source={require('@assets/icons/Sort_Down_icon.png')}
            />
          </TouchableOpacity>

        </View>
      </View>
    )
  }

  const ListFooterComponent = () => {
    return (
      <View>
        {/* <Button
          text='Load More'
          inverter
        /> */}

        <Image
          style={{ width: '100%', height: 335 }}
          source={require('@assets/images/banner.png')}
          resizeMode='center'
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        goBack={navigation.goBack}
        showFilter
        navigation={navigation}
        onFilter={() => setVisibleFilterModal(true)}
      />

      <FilterModal
        isVisible={visibleFilterModal}
        onClose={() => setVisibleFilterModal(false)}
      />


      <View style={{ paddingVertical: 24, paddingHorizontal: 20 }}>



        <FlatList
          style={{ marginTop: 25 }}
          data={items}
          ListHeaderComponent={renderListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          keyExtractor={(item, index) => 'gameReview-' + index}
          renderItem={({ item, index }) => <ListItem
            type='article'
            amount={item.title}
            title={item.summary}
            // value='2.3'
            icon={{ uri: item?.thumbnail?.url }}
            item={item}
            onPress={() => navigation.navigate('Article', { item })}
          />
          }
        />

      </View>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  filterItem: { flexDirection: 'row', alignItems: 'center' },
  filterText: { fontWeight: '900', fontSize: 12, color: '#00293B' },
  filterIcon: { width: 7.53, height: 4.34, top: 1, marginLeft: 3.24 },
  filtersWrap: { height: 30, width: '100%', backgroundColor: '#EDF1F9', borderRadius: 3, paddingHorizontal: 11, flexDirection: 'row', justifyContent: 'space-between' },
})