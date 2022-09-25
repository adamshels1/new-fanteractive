import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Linking } from 'react-native';
import { Text } from '@components'
import moment from 'moment'

export default function RestauraintListItem(props) {
  const { title, logo, onPress, date_from, date_to, cities } = props;
  const logoSource = logo ? { uri: logo } : require('@assets/images/no_logo.png');

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            source={logoSource}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.optionWrap}>
                <Image source={require('@assets/icons/maps.png')} style={styles.mapsIcon} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {cities[0]?.city_name}
                </Text>
              </View>


              <View style={styles.optionWrap}>
                <Image source={require('@assets/icons/agenda.png')} style={styles.agendaIcon} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {moment(date_from).format('MMMM DD')} - {moment(date_to).format('MMMM DD, YYYY')}
                </Text>
              </View>


            </View>

          </View>
        </View>

        <Image source={require('@assets/icons/arrow-gray.png')} style={{ height: 10, width: 6 }} />

      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7, marginRight: 10 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10 },
  container: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 14, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 17, paddingTop: 18 },
  image: { width: 40, height: 40, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 15, color: '#121212', width: 230 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 14, color: '#121212' },
  textCount: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 13, color: '#848484' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 },
  moreIcon: { width: 4, height: 22 },
  mapsIcon: { width: 10, height: 13 },
  agendaIcon: { width: 12, height: 12 },
  image31: { width: '100%', height: 201 },
  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 }
});
