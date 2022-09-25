import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Linking } from 'react-native';
import PropTypes from 'prop-types'
import { Text } from '@components'

export default function RestauraintListItem(props) {
  const { title, phone_number, website, address, logo, onPress, menu_link } = props;
  const logoSource = logo ? { uri: logo } : require('@assets/images/no_logo.png');
  const onMenu = () => {
    try {
      menu_link && Linking.openURL(`https://${menu_link}`)
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <TouchableOpacity onPress={onMenu} style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onMenu}>
          <Image
            style={styles.image}
            source={logoSource}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>
            {title}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone_number}`)} style={styles.optionWrap}>
            <Image source={require('@assets/icons/phone.png')} style={{ width: 10, height: 10 }} />
            <Text style={styles.optionText} numberOfLines={1}>{phone_number}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://' + website)} style={styles.optionWrap}>
            <Image source={require('@assets/icons/web.png')} style={{ width: 11.84, height: 11.53 }} />
            <Text style={styles.optionText} numberOfLines={1}>{website}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/place/' + address)} style={styles.optionWrap}>
            <Image source={require('@assets/icons/maps.png')} style={{ width: 10, height: 13 }} />
            <Text style={styles.optionText} numberOfLines={1}>{address}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
        <Image source={require('@assets/icons/arrow-r.png')} style={{ width: 10, height: 15 }} />
      </TouchableOpacity>

    </TouchableOpacity>
  )
}

// RestauraintListItem.propTypes = {
// }

const styles = StyleSheet.create({
  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10, width: 230 },
  container: { width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingTop: 16, paddingBottom: 16, justifyContent: 'space-between', paddingHorizontal: 17 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 18, color: '#121212' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 }
});
