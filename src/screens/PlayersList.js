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
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getActivityPlayes()
  }, []);

  const getActivityPlayes = async () => {
    try {
      setLoading(true)
      const res = await mainApi.getActivityPlayes()
      console.log('aaa', res)
      setPlayers(res.data.data)
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
        onRefresh={getActivityPlayes}
        ListHeaderComponent={<BlockTitle title='Recent Players Grades' />}
        style={{ paddingVertical: 24, paddingHorizontal: 20 }}
        data={players}
        keyExtractor={(item, index) => item.player_id}
        renderItem={({ item, index }) => {
          console.log('item', item)
          return (
            <ListItemArticle
              value1={'Player Scouting Report'}
              value2={item.name}
              value3={`${item.team.name} ${item.position.title}`}
              value4={item.fanager_name}
              value5={moment(item.rating_posted_at).format('DD MMM, YYYY')}
              image={{ uri: item?.thumbnail?.url }}
              miniImage={{ uri: item?.team?.thumbnail?.url }}
              onPress={() => navigation.navigate('PlayerSummary', { item })}
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