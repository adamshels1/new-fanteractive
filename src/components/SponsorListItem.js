import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { Button, Text } from '@components'
import PropTypes from 'prop-types'
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function Sponsor(props) {
  const { title, intro_image, logo, rating, content, onPress, hideButton } = props;
  const logoSource = logo ? { uri: logo } : require('@assets/images/no_image.png');
  let color = '#B0B0B0'
  const label = rating?.label === 'Silver' ? content : rating?.label
  switch (rating?.label) {
    case 'Platinum':
      color = '#95C6FF'
      break;
    case 'Gold':
      color = '#FAB811'
      break;
  }
  return (
    <TouchableOpacity
      style={[styles.sponsor, { borderColor: color }]}
      onPress={onPress}
      // disabled={rating?.label === 'Silver'}
    >

      {intro_image && rating?.label !== 'Silver' && (
        <Image source={{ uri: intro_image }} style={styles.sponsorImage} />
      )}


      <View style={styles.sponsorHeader}>
        <Image
          style={styles.sponsorLogo}
          source={logoSource}
        />
        <View style={{ justifyContent: 'center', width: '75%' }}>
          <Text style={styles.sponsorName} numberOfLines={2}>
            {title}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...styles.sponsorType, color }} numberOfLines={2}>
              {label}
            </Text>
            {rating?.label !== 'Silver' && (
              <AirbnbRating
                defaultRating={rating?.value}
                count={rating?.value}
                isDisabled
                showRating={false}
                size={12}
                selectedColor={color}
              />
            )}
          </View>

        </View>

        {rating?.label === 'Silver' ? (
          <Image source={require('@assets/icons/web-gray.png')} style={styles.webIcon} />
        ) : (
          <Image source={require('@assets/icons/arrow-r-green.png')} style={styles.arrowGray} />
        )}

      </View>

      {content && rating?.label !== 'Silver' ? (
        <View style={styles.line} />
      ) : null}


      {(content && rating?.label !== 'Silver') ? (
        <View style={styles.sponsorFooter}>
          <Text style={styles.text} numberOfLines={4}>
            {content}
          </Text>
          {!hideButton && (
            <Button
              text='See More'
              inverter
              onPress={onPress}
              textStyle={{ color: '#121212', fontWeight: '400' }}
              color={color}
              style={{ marginTop: 13 }}
            />
          )}

        </View>
      ) : null}


    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  becom: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 12, color: '#121212' },
  platinum: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 16, color: '#121212', marginLeft: 14 },
  sponsorLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  sponsorName: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 18, color: '#121212', marginBottom: 4, maxWidth: '100%' },
  sponsorType: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 13, color: '#8EBCF2', paddingRight: 5 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 14, color: '#121212' },

  sponsor: { backgroundColor: '#fff', marginTop: 12, borderRadius: 15, borderColor: '#95C6FF', borderWidth: 1 },
  sponsorImage: { width: '100%', height: 204, borderTopRightRadius: 15, borderTopLeftRadius: 15 },
  sponsorHeader: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 18 },
  arrowGray: { width: 6, height: 10, position: 'absolute', right: 19, top: 38 },
  webIcon: { width: 14, height: 14, position: 'absolute', right: 19, top: 38 },
  line: { backgroundColor: '#E2E2E2', height: 1 },
  sponsorFooter: { marginTop: 2, padding: 12 },
});
