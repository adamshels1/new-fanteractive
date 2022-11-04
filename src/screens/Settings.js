

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

export default function MyStadiumReport(props) {
  const dispatch = useDispatch()
  const [visibleFilterModal, setVisibleFilterModal] = useState(false)


  const items = [
    {
      title: 'User Details',
      icon: require('@assets/icons/user-3.png'),
      route: 'EditUserDetails'
    },
    {
      title: 'Interests',
      icon: require('@assets/icons/info-3.png'),
      route: 'Interests'
    },
    {
      title: 'Security',
      icon: require('@assets/icons/keys.png')
    },
    {
      title: 'Notifications',
      icon: require('@assets/icons/notifications-3.png')
    },
  ]


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
      <View style={{ paddingLeft: 20 }}>
        <BlockTitle title='Settings' showLine />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        goBack={props.navigation.goBack}
        showFilter
        navigation={props.navigation}
        onFilter={() => setVisibleFilterModal(true)}
      />

      <FilterModal
        isVisible={visibleFilterModal}
        onClose={() => setVisibleFilterModal(false)}
      />


      <View style={{ paddingVertical: 0, paddingHorizontal: 0 }}>



        <FlatList
          style={{ marginTop: 25 }}
          data={items}
          ListHeaderComponent={renderListHeaderComponent}
          keyExtractor={(item, index) => 'gameReview-' + index}
          renderItem={({ item, index }) => <TouchableOpacity
            style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D9DBE9', height: 78, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 17, paddingRight: 37 }}
            onPress={() => props.navigation.navigate(item.route)}
          >

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 26 }}
                source={item.icon}
                resizeMode='center'
              />
              <Text style={{ fontWeight: '400', fontSize: 18, color: '#081735', marginLeft: 16 }}>
                {item.title}
              </Text>
            </View>
            <Image
              style={{ width: 13, height: 25 }}
              source={require('@assets/icons/green-arrow.png')}
              resizeMode='center'
            />
          </TouchableOpacity>
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