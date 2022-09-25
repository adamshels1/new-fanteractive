import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, Linking } from 'react-native';
import { Text } from '@components'
import moment from 'moment'

export default function RestauraintListItem(props) {
  const { title, content, logo, onPress, intro_image, address, post_date, comments, likes } = props
  const logoSource = logo ? { uri: logo } : require('@assets/images/no_logo.png')
  const likeIcon = likes?.marked ? require('@assets/icons/like.png') : require('@assets/icons/like-gray.png')
  return (
    <TouchableOpacity onPress={onPress} style={{ marginBottom: 5, backgroundColor: '#fff' }} >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '96%' }}>
          <Image
            style={styles.image}
            source={logoSource}
          />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>

            <View>
              {address ? (
                <View style={styles.optionWrap}>
                  <Image source={require('@assets/icons/maps.png')} style={styles.mapsIcon} />
                  <Text style={styles.optionText} numberOfLines={1}>
                    {address}
                  </Text>
                </View>
              ) : null}



              <View style={styles.optionWrap}>
                <Image source={require('@assets/icons/agenda.png')} style={styles.agendaIcon} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {moment(post_date).format('MMMM DD, YYYY')}
                </Text>
              </View>


            </View>

          </View>
        </View>

        {/* <Image source={require('@assets/icons/more.png')} style={styles.moreIcon} /> */}
      </View>

      {intro_image && (<View style={{ ...styles.image31, backgroundColor: '#E2E2E2' }}>
        <Image source={{ uri: intro_image }} style={styles.image31} resizeMode='contain' />
      </View>)}

      <View style={{ paddingTop: 12, paddingHorizontal: 18 }}>
        <Text style={styles.text} numberOfLines={5}>
          {content}
        </Text>
      </View>

      <View style={styles.bottomWrap}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('@assets/icons/chat-bubble.png')} style={styles.commentsIcon} />
          <Text style={styles.textCount}>
            {comments}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={likeIcon} style={styles.likeIcon} resizeMode='contain' />
          <Text style={styles.textCount}>
            {likes?.count}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7, paddingRight: 7 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10, maxWidth: 230 },
  container: { width: '100%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingTop: 16, paddingBottom: 16, justifyContent: 'space-between', paddingHorizontal: 17, alignItems: 'center' },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 17 },
  title: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 16, color: '#121212', maxWidth: 270 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 14, color: '#121212' },
  textCount: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 13, color: '#848484' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 },
  moreIcon: { width: 4, height: 22 },
  mapsIcon: { width: 10, height: 13 },
  agendaIcon: { width: 12, height: 12 },
  image31: { width: '100%', height: 201 },
  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#E2E2E2' },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 }
});
