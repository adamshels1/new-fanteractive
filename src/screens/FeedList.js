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
  const [feed, setFeed] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    try {
      setLoading(true)
      const games = await getActivityGames()
      const players = await getActivityPlayes()
      const stadiums = await getActivityStadiums()
      const feed = [
        ...games,
        ...players,
        ...stadiums
      ]
      setFeed(feed.sort((a, b) => a.date - b.date))
      console.log('feed', feed)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const getActivityGames = async () => {
    try {
      const res = await mainApi.getActivityGames()
      console.log('games', res)
      const games = res.data.data.map(i => {
        return {
          ...i,
          type: 'game',
          date: i.created_at
        }
      })
      return games
    } catch (e) {
      console.log('e', e)
    }
  }

  const getActivityPlayes = async () => {
    try {
      const res = await mainApi.getActivityPlayes()
      console.log('players', res)
      const players = res.data.data.map(i => {
        return {
          ...i,
          type: 'player',
          date: i.created,
          id: i.player_id,
        }
      })
      return players
    } catch (e) {
      console.log('e', e)
    }
  }

  const getActivityStadiums = async () => {
    try {
      const res = await mainApi.getActivityStadiums()
      console.log('stadiums', res)
      const stadiums = res.data.data.map(i => {
        return {
          ...i,
          type: 'stadium',
          date: i.rating_posted_at
        }
      })
      return stadiums
    } catch (e) {
      console.log('e', e)
    }
  }

  const renderItem = ({ item, index }) => {
    // console.log('item', item)
    if (item.type === 'game') return (
      <ListItemArticle
        value1={'GAME REPORT CARD'}
        value2={item?.game?.visitor_team?.name}
        value3={`vs ${item?.game?.local_team?.name}`}
        value4={item?.fanager?.full_name}
        value5={moment(item?.rating_posted_at).format('DD MMM, YYYY')}
        gameResult={`${item?.game?.visitor_score}:${item?.game?.local_score}`}
        image={{ uri: item?.team?.thumbnail?.url }}
        miniImage={{ uri: item?.team?.thumbnail?.url }}
        onPress={() => navigation.navigate('GameSummary', { item })}
      />
    )

    if (item.type === 'player') return (
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

    if (item.type === 'stadium') return (
      <ListItemArticle
        value1={'Stadium review'}
        value2={item.name}
        value3={`${item.city}, ${item.country}`}
        value4={item.fanager_name}
        value5={moment(item.rating_posted_at).format('DD MMM, YYYY')}
        image={{ uri: item?.thumbnail?.url }}
        // miniImage={{ uri: item?.team?.thumbnail?.url }}
        onPress={() => navigation.navigate('StadiumSummary', { item })}
      />
    )

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
        onRefresh={loadData}
        ListHeaderComponent={<BlockTitle title='Latest Fanalyst Activity' />}
        ListFooterComponent={<View style={{ height: 50 }} />}
        style={{ paddingVertical: 24, paddingHorizontal: 20 }}
        data={feed}
        keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
        renderItem={renderItem}
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