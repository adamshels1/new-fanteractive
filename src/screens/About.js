import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, StatusBar, Text, BlockTitle, ListItem, TeamListItem } from '@components'
import { mainApi } from '@api';
import { setTokenAction, setUserAction } from '@redux/actions/userActions'
import { loaderAction } from '@redux/actions/loaderActions'
import moment from 'moment'

export default function About({ route, navigation }) {
  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const [user, setUser] = useState(null)
  const [odds, setOdds] = useState(null)
  const [analyses, setAnalyses] = useState(null)

  useEffect(() => {
    getData()
  }, []);


  const getData = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      const res = await mainApi.getUser(token);
      const user = res?.data?.data
      if (user) {
        console.log('user', user)
        setUser(user);
        dispatch(setUserAction(user))
        const resOdds = await mainApi.getUserOdds(token, { userId: user.id })
        setOdds(resOdds?.data?.data)
        const resAnalyses = await mainApi.getUserAnalyses(token, { userId: user.id })
        console.log('resAnalyses?.data?.data', resAnalyses?.data?.data)
        setAnalyses(resAnalyses?.data?.data)
      }
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        showMenu
        navigation={navigation}
      // goBack={navigation.goBack}
      />
      <ScrollView>
        <View
          style={{ height: 262, width: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <Image
            style={{ height: 262, width: '100%' }}
            source={{ uri: user?.thumbnail?.url }}
          />
          <View style={{ height: 81, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, paddingLeft: 14, paddingTop: 15 }}>
            <Text style={{ fontWeight: '700', fontSize: 32, color: '#FFF', textTransform: 'uppercase', fontFamily: 'Oswald' }}>
              {user?.full_name}
            </Text>
            <Text style={{ fontWeight: '500', fontSize: 12, color: '#FFF', textTransform: 'uppercase', fontFamily: 'Oswald' }}>Tier: {user?.tier_label}</Text>
          </View>
        </View>


        <View style={{ paddingVertical: 24, paddingHorizontal: 20 }}>
          <BlockTitle title='ABOUT ME' showLine />
          <Text style={{ fontWeight: '400', fontSize: 14, color: '#000', marginTop: 6 }}>
            {user?.about}
          </Text>


          <View style={{ marginTop: 20 }}>
            <BlockTitle title='Quick Stats' showLine />

            <ListItem
              icon={require('@assets/icons/scouting_reports.png')}
              amount={odds?.scouting_reports}
              title='Scouting Reports'
              onPress={() => navigation.navigate('PlayersScoutings')}
            />

            <ListItem
              icon={require('@assets/icons/game_report_cards.png')}
              amount={odds?.game_report_cards}
              title='Game Report Cards'
              onPress={() => navigation.navigate('GameReview')}
            />

            <ListItem
              icon={require('@assets/icons/stadium_ratings.png')}
              amount={odds?.stadium_ratings}
              title='Stadium Ratings'
              onPress={() => navigation.navigate('MyStadiumReport')}
            />

            <ListItem
              icon={require('@assets/icons/articles.png')}
              amount={odds?.articles}
              title='Articles'
              onPress={() => navigation.navigate('MyArticles')}
            />

            {/* <ListItem
              icon={require('@assets/icons/teams_grades.png')}
              amount={odds?.teams_grades}
              title='Teams Grades'
            /> */}



          </View>


          {user?.favorite_teams?.length ? (
            <View style={{ marginTop: 26 }}>
              <BlockTitle title='My Favorite Teams' showLine />
              <FlatList
                style={{ marginTop: 25 }}
                data={user?.favorite_teams}
                renderItem={({ item, index }) =>
                  <TeamListItem
                    name={item?.name}
                    image={item?.thumbnail?.url}
                  />
                }
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : null}



          <View style={{ marginTop: 20 }}>
            <BlockTitle title='My Latest Analyses' showLine />
            <FlatList
              style={{ marginTop: 25 }}
              data={analyses?.articles}
              renderItem={({ item, index }) => <ListItem
                type='article'
                amount={item.title}
                title={item.summary}
                // value='2.3'
                icon={{ uri: item?.thumbnail?.url }}
                item={item}
              />
              }
            />

            <FlatList
              style={{ marginTop: 25 }}
              data={analyses?.games}
              renderItem={({ item, index }) => <ListItem
                value={helper.fixAlphabetical(item?.avg)}
                amount={item?.fanager?.full_name}
                title={`${item?.fanager?.tier_label} • ${moment(item?.reated_at).format('DD MMM YYYY')}`}
                icon={{
                  uri: item?.fanager?.thumbnail?.url
                }}
                disabled
              // onPress={() => navigation.navigate('PlayerReport')}
              />
              }
            />

            <FlatList
              style={{ marginTop: 25 }}
              data={analyses?.players}
              renderItem={({ item, index }) => <ListItem
                value={parseFloat(item?.avg).toFixed(2)}
                amount={item?.full_name}
                title={`${item?.tier} •`}
                icon={{
                  uri: item?.thumbnail?.url
                }}
                disabled
              // onPress={() => navigation.navigate('PlayerReport')}
              />
              }
            />

            <FlatList
              style={{ marginTop: 25 }}
              data={analyses?.stadiums}
              renderItem={({ item, index }) => <ListItem
                type='stadium'
                value={parseFloat(item?.avg).toFixed(2)}
                amount={item?.fanager?.full_name}
                title={`${item?.event?.event_name} • ${moment(item?.posted).format('DD MMM YYYY')}`}
                icon={{
                  uri: item?.thumbnail?.url
                }}
                disabled
              // onPress={() => navigation.navigate('PlayerReport')}
              />
              }
            />


            <FlatList
              style={{ marginTop: 25 }}
              data={analyses?.teams}
              renderItem={({ item, index }) => <ListItem
                type='article'
                amount={item.title}
                title={item.summary}
                // value='2.3'
                icon={{ uri: item?.thumbnail?.url }}
                item={item}
              />
              }
            />

          </View>


          {/* <Image
            style={{ width: '100%', height: 335 }}
            source={require('@assets/images/banner.png')}
            resizeMode='center'
          /> */}

        </View>



      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
})