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

export default function About({ route, navigation }) {
  // const dispatch = useDispatch()
  const [page, setPage] = useState({})
  const [visibleFilterModal, setVisibleFilterModal] = useState(false)
  // useEffect(async () => {
  //   try {
  //     dispatch(loaderAction({ isLoading: true }))
  //     const page = await mainApi.getPage({ id: 1065 });
  //     setPage(page);
  //     dispatch(loaderAction({ isLoading: false }))
  //   } catch (e) {
  //     dispatch(loaderAction({ isLoading: false }))
  //   }
  // }, []);
  const { title = '', content = '' } = page;
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={title}
        showMenu
        showFilter
        navigation={navigation}
        onFilter={() => setVisibleFilterModal(true)}
      />

      <FilterModal
        isVisible={visibleFilterModal}
        onClose={() => setVisibleFilterModal(false)}
      />

      <ScrollView>

        <View style={{ paddingVertical: 24, paddingHorizontal: 20 }}>

          <BlockTitle title='Players Scouting' />

          <Button
            leftComponent={<Image source={require('@assets/icons/shape.png')} style={{ width: 26, height: 29, marginRight: 8 }} />}
            text='Issue A New Scouting Report'
            style={{ marginTop: 17 }}
            textStyle={{fontFamily: 'Oswald'}}
          />

          <View style={styles.filtersWrap}>
            <TouchableOpacity style={styles.filterItem}>
              <Text style={styles.filterText}>Player</Text>
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

          <FlatList
            style={{ marginTop: 25 }}
            data={[1, 1, 1, 1, 1]}
            renderItem={() => <ListItem value='2.3' onPress={() => navigation.navigate('Player')} />
            }
          />

          <Button
            text='Load More'
            inverter
          />

          <Image
            style={{ width: '100%', height: 335 }}
            source={require('@assets/images/banner.png')}
            resizeMode='center'
          />

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
  filterItem: { flexDirection: 'row', alignItems: 'center' },
  filterText: { fontWeight: '900', fontSize: 12, color: '#00293B' },
  filterIcon: { width: 7.53, height: 4.34, top: 1, marginLeft: 3.24 },
  filtersWrap: { height: 30, width: '100%', backgroundColor: '#EDF1F9', borderRadius: 3, marginTop: 29, paddingHorizontal: 11, flexDirection: 'row', justifyContent: 'space-between' },
})