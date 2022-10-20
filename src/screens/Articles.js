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
import { Header, StatusBar, Text, BlockTitle, ListItemArticle, TeamListItem, Button, FilterModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import moment from 'moment';

export default function About({ route, navigation }) {
  // const dispatch = useDispatch()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getArticles()
  }, []);

  const getArticles = async () => {
    try {
      setLoading(true)
      const res = await mainApi.getArticles()
      console.log('aaa', res)
      setArticles(res.data.data)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log('e', e)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        showMenu
        showFilter
        navigation={navigation}
        onFilter={() => setVisibleFilterModal(true)}
      />

      {/* <FilterModal
        isVisible={visibleFilterModal}
        onClose={() => setVisibleFilterModal(false)}
      /> */}



      <FlatList
        refreshing={loading}
        onRefresh={getArticles}
        ListHeaderComponent={<BlockTitle title='Recent Articles' />}
        ListFooterComponent={<View style={{height: 50}} />}
        style={{ paddingVertical: 24, paddingHorizontal: 20 }}
        data={articles}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {
          console.log('item', item)
          return (
            <ListItemArticle
              value1={'ARTICLE'}
              value2={item?.title}
              value3={item?.category?.name}
              value4={item?.author?.full_name}
              value5={moment(item?.published).format('DD MMM, YYYY')}
              image={{ uri: item?.thumbnail?.url }}
              // miniImage={{ uri: item?.team?.thumbnail?.url }}
              onPress={() => navigation.navigate('Article', { item })}
            />
          )
        }
        }
      />





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
  filtersWrap: { height: 30, width: '100%', backgroundColor: '#EDF1F9', borderRadius: 3, marginTop: 29, paddingHorizontal: 11, flexDirection: 'row', justifyContent: 'space-between' },
})