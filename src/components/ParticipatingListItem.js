import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Linking } from 'react-native';
import { Button, Text } from '@components'
// import analytics from '@react-native-firebase/analytics'

export default function RestauraintListItem(props) {
  const { title, phone_number, website, address, logo, onPress, short_description, mealtimes = [] } = props;
  const logoSource = logo ? { uri: logo } : require('@assets/images/no_logo.png');


  const onWebsite = async () => {
    try {
      if (!website) return
      Linking.openURL(website)
      // await analytics().logEvent('Restaurant_Website_call', {
      //   website,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }


  const onPhone = async () => {
    try {
      if (!phone_number) return
      Linking.openURL(phone_number?.url)
      // await analytics().logEvent('Restaurant_Phone_call', {
      //   phone_number: phone_number?.title,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }

  const onAddress = async () => {
    try {
      if (!address) return
      Linking.openURL('https://www.google.com/maps/place/' + address)
      // await analytics().logEvent('Restaurant_Maps_call', {
      //   map_link: 'https://www.google.com/maps/place/' + address,
      // })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            source={logoSource}
            resizeMode='contain'
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.title}>
              {title}
            </Text>
            <Text style={styles.subTitle} numberOfLines={2}>
              {short_description}
            </Text>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row' }}>

                {mealtimes.map((i, key) => {
                  return <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.tag}>
                      {i}
                    </Text>
                    {(mealtimes.length !== key + 1) && (
                      <View style={styles.tagIcon} />
                    )}
                  </View>
                })}

              </View>

            </View>
          </View>
        </View>


        {address ? (
          <TouchableOpacity onPress={onAddress} style={styles.optionWrap}>
            <Image source={require('@assets/icons/maps.png')} style={styles.mapsIcon} />
            <Text style={styles.optionText} numberOfLines={1}>
              {address}
            </Text>
          </TouchableOpacity>
        ) : null}


        {website ? (
          <TouchableOpacity onPress={onWebsite} style={styles.optionWrap}>
            <Image source={require('@assets/icons/web.png')} style={{ width: 11.84, height: 11.53 }} />
            <Text style={styles.optionText} numberOfLines={1}>
              {website.replace('https://', '').replace('http://', '')}
            </Text>
          </TouchableOpacity>
        ) : null}


        {phone_number ? (
          <TouchableOpacity onPress={onPhone} style={styles.optionWrap}>
            <Image source={require('@assets/icons/phone.png')} style={{ width: 10, height: 10 }} />
            <Text style={styles.optionText} numberOfLines={1}>
              {phone_number?.title}
            </Text>
          </TouchableOpacity>
        ) : null}



        <View style={{ marginTop: 29, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            text='More Info'
            inverter
            onPress={onPress}
            style={{ width: '100%' }}
            textStyle={{ color: '#121212', fontWeight: '400', fontSize: 15 }}
          />
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7, maxWidth: '95%' },
  optionText: { fontFamily: 'Avenir', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10 },
  container: { width: '100%', borderBottomWidth: 2, borderBottomColor: '#E2E2E2', paddingTop: 16, paddingBottom: 16, justifyContent: 'space-between', paddingHorizontal: 17, backgroundColor: '#fff' },
  image: { width: 68, height: 68, marginRight: 15 },
  text: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 14, color: '#121212' },
  textCount: { fontFamily: 'Avenir', fontWeight: '600', fontSize: 13, color: '#848484' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 },
  moreIcon: { width: 4, height: 22 },
  mapsIcon: { width: 10, height: 13 },
  agendaIcon: { width: 12, height: 12 },
  image31: { width: '100%', height: 201 },
  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 },

  title: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 18, color: '#121212', maxWidth: '100%' },
  subTitle: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 12, color: '#121212', marginTop: 4, maxWidth: '88%' },
  tag: { fontFamily: 'Avenir', fontWeight: '400', fontSize: 12, color: '#626262', marginTop: 4 },
  tagIcon: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#F2A71D', marginHorizontal: 8, top: 3 },
});
