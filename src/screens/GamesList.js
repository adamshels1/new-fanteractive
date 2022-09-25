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
import { Header, StatusBar, Text, BlockTitle, ListItemGame, TeamListItem, Button, FilterModal } from '@components'
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

          <BlockTitle title='Recent Games Reviews' />

          <FlatList
            style={{ marginTop: 25 }}
            data={[1, 1, 1, 1, 1]}
            renderItem={() => <ListItemGame
              value='2.3'
              onPress={() => navigation.navigate('GameSummary')}
              image={{ uri: 'https://2.bp.blogspot.com/-vEeXSLwkSqg/XI7btUXIe3I/AAAAAAAAJI4/odtruDY2ncYW5sruJ9qL_TrIF7_z0TlQgCK4BGAYYCw/s1600/logo%2Bpec%2Bzwolle%2Bnederland%2Bfootball.png' }}
            />
            }
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