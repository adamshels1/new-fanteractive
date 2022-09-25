import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Input, Button, StatusBar, Text, ConfirmBuyPuzzleModal, SponsorModal, ConfirmPuzzleGiveUp, ConfirmPuzzleReset } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
import moment from 'moment'
// import { PicturePuzzle, PuzzlePieces } from 'react-native-picture-puzzle'
import * as Animatable from 'react-native-animatable'
import helper from '@services/helper'
import AlertAsync from 'react-native-alert-async'
// import analytics from '@react-native-firebase/analytics'
import { setUserAction } from '@redux/actions/userActions'

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default function Puzzle({ route, navigation }) {
  const dispatch = useDispatch()
  const [visibleConfirmBuyPuzzleModal, setVisibleConfirmBuyPuzzleModal] = useState(false)
  const [visibleCongratulations, setVisibleCongratulations] = useState(false)
  const [visibleOverlayPuzzle, setVisibleOverlayPuzzle] = useState(true)
  const [visibleSponsorModal, setVisibleSponsorModal] = useState(false)
  const [visiblePuzzleHint, setVisiblePuzzleHint] = useState(false)
  const [visiblePuzzleGiveUpModal, setVisiblePuzzleGiveUpModal] = useState(false)
  const [visibleNotSolved, setVisibleNotSolved] = useState(false)
  const [visiblePuzzleResetModal, setVisiblePuzzleResetModal] = useState(false)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const [puzzleSize, setPuzzleSize] = useState(354)
  const [puzzle, setPuzzle] = useState(null)
  const places = 9
  const originalPieces = React.useMemo(() => (
    [...Array(places)].map((_, i) => i)
  ), []);

  const shuffledPieces = React.useMemo(() => {
    const p = [...originalPieces];
    shuffle(p);
    return p;
  }, [originalPieces]);

  const [hidden, setHidden] = React.useState(0);
  const [pieces, setPieces] = React.useState(shuffledPieces);


  const renderLoading = React.useCallback(() => (
    <View style={[StyleSheet.absoluteFill, styles.center]}>
      <ActivityIndicator />
    </View>
  ), []);
  const onChange = React.useCallback((nextPieces, nextHidden) => {
    console.log('nextPieces', nextPieces)
    console.log('nextHidden', nextHidden)
    const isDone = nextPieces === [...Array(places)].map((_, i) => i)
    if (isDone) {
      donePlayPuzzle()
    }
    console.log('orig', [...Array(places)].map((_, i) => i))
    console.log('\n')
    setPieces([...nextPieces]);
    setHidden(nextHidden);
  }, [setPieces, setHidden]);
  const solve = React.useCallback(() => {
    setPieces(originalPieces);
    setHidden(null);
  }, [setPieces, originalPieces]);
  const retry = React.useCallback(() => {
    setPieces(shuffledPieces);
    setHidden(0);
  }, [setPieces, shuffledPieces]);

  const enoughPoints = user?.points?.total >= puzzle?.points.cost


  useEffect(() => {
    getPuzzle()
  }, []);

  const getPuzzle = async () => {
    try {
      // dispatch(loaderAction({ isLoading: true }))

      const data = await mainApi.getPuzzle({
        user_id: user?.userId,
        token,
        id: route.params.puzzle.id
      })
      console.log('puzzleset', data)
      setPuzzle(data)
      dispatch(loaderAction({ isLoading: false }))
      await helper.sleep(300)
      if (data?.sponsor) {
        setVisibleSponsorModal(true)
      }
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const buyPuzzle = async () => {
    try {
      await helper.sleep(300)
      setVisibleConfirmBuyPuzzleModal(false)
      dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.buyPuzzle({
        user_id: user?.userId,
        token,
        id: route.params.puzzle.id
      })
      if (data?.puzzle) {
        setVisibleOverlayPuzzle(false)
        setVisiblePuzzleHint(true)
      } else {
        AlertAsync(data.reason || 'Something went wrond')
      }
      if (data?.user) {
        dispatch(setUserAction({ ...user, ...data.user }))
      }
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
    }
  }

  const donePlayPuzzle = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))
      console.log('puzzle', puzzle)
      const data = await mainApi.getPuzzlePoints({
        user_id: user?.userId,
        token,
        id: route.params.puzzle.id
      })
      dispatch(loaderAction({ isLoading: false }))
      solve()
      if (data.id) {
        setVisibleCongratulations(true)
      } else {
        AlertAsync(data.reason || 'Something went wrond')
      }
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
      AlertAsync(e.message || 'Something went wrond')
    }
  }



  const renderPuzzle = () => {
    return (
      <View style={{ paddingHorizontal: 17, alignItems: 'center' }}>


        {/* <View style={styles.listHeader}>
          <Image style={styles.image} resizeMode='contain' source={require('@assets/icons/Puzzle.png')} />
          <Text style={styles.solve}>
            {puzzle?.title}
          </Text>
        </View> */}

        <View
          style={styles.button}
        >
          <Text style={styles.solve2}>Solve the puzzle and get extra points</Text>
          {/* <Image style={styles.icon} resizeMode='contain' source={item.icon} /> */}
          <View style={styles.line} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <View style={styles.optionWrap}>
                <Image source={require('@assets/icons/agenda.png')} style={styles.agendaIcon} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {moment(puzzle?.date_start).format('DD MMMM')} - {moment(puzzle?.date_end).format('DD MMMM')}
                </Text>
              </View>

              <View style={styles.optionWrap}>
                <Text style={styles.optionText} numberOfLines={1}>
                  Cost Points: <Text style={styles.optionValue}>
                    {puzzle?.points?.cost}
                  </Text>
                </Text>
              </View>

              <View style={styles.optionWrap}>
                <Text style={styles.optionText} numberOfLines={1}>
                  Reward Points: <Text style={styles.optionValue}>
                    {puzzle?.points?.reward}
                  </Text>
                </Text>
              </View>
            </View>
            <Image
              style={styles.smallImage}
              source={{ uri: puzzle?.image }}
            />
          </View>
        </View>


        <View style={[styles.puzzleWrap, { height: puzzleSize }]}
          onLayout={(event) => {
            var { x, y, width, height } = event.nativeEvent.layout;
            setPuzzleSize(parseInt(width))
          }}
        >
          {/* {puzzle?.image && (

            <PicturePuzzle
              style={styles.puzzle}
              renderLoading={renderLoading}
              pieces={pieces}
              hidden={hidden}
              onChange={onChange}
              size={puzzleSize}
              source={{ uri: puzzle?.image }}
            />
          )} */}

          {visibleOverlayPuzzle && renderPuzzleOverlay()}
        </View>

        {!visibleOverlayPuzzle && (
          <View style={styles.buttonsWrap}>
            <Button
              text='Give Up'
              inverter
              onPress={() => setVisiblePuzzleGiveUpModal(true)}
              style={styles.button2}
              textStyle={{ color: '#F2A71D' }}
            />
            <Button
              text='Reset'
              inverter
              onPress={() => setVisiblePuzzleResetModal(true)}
              style={styles.button2}
              textStyle={{ color: '#F2A71D' }}
            />
          </View>
        )}


      </View>

    )
  }

  const renderPuzzleOverlay = () => {
    return (
      <View style={styles.puzzleOverlay}>
        <Text style={styles.unlockText}>
          Unlock this Puzzle {`\n`}to win <Text style={{ color: '#F2A71D' }}>{puzzle?.points?.reward}</Text> reward points
        </Text>
        <Image style={styles.lockIcon} resizeMode='contain' source={require('@assets/icons/Lock.png')} />
        <Button
          text='Start Solving this Puzzle'
          style={{ width: 297 }}
          onPress={() => setVisibleConfirmBuyPuzzleModal(true)}
        />
      </View>
    )
  }

  const renderCongratulations = () => {
    return (
      <Animatable.View
        animation={'bounceInRight'}
        style={styles.congWrap}
      >


        <View style={styles.listHeader}>
          <Image style={{ width: 75, height: 75 }} resizeMode='contain' source={require('@assets/icons/star.png')} />
          <Text style={styles.solve}>
            Congratulations you have won {`\n`}<Text style={{ color: '#F2A71D', fontWeight: '700' }}>{puzzle?.points?.reward} points</Text>
          </Text>
        </View>



        <View style={[styles.puzzleWrap, { marginTop: 0 }]}>
          <Image style={styles.puzzleImage}
            // resizeMode='contain' 
            source={{ uri: puzzle?.image }}
          />
        </View>


        <Button
          text='Back to Mini Games'

          onPress={navigation.goBack}
        />

      </Animatable.View>

    )
  }

  const renderNotSolved = () => {
    return (
      <Animatable.View
        animation={'bounceInRight'}
        style={styles.congWrap}
      >


        <View style={styles.listHeader}>
          <Image style={{ width: 70, height: 70 }} resizeMode='contain' source={require('@assets/icons/not_solved.png')} />
          <Text style={styles.solve}>
            Puzzle was not solved. {`\n`}<Text style={{ color: '#F2A71D', fontWeight: '700' }}>0 points</Text>
          </Text>
        </View>



        <View style={[styles.puzzleWrap, { marginTop: 0 }]}>
          <Image style={styles.puzzleImage}
            // resizeMode='contain' 
            source={{ uri: puzzle?.image }}
          />
        </View>


        <Button
          text='Back to Mini Games'

          onPress={navigation.goBack}
        />

      </Animatable.View>

    )
  }

  const renderPuzzleHint = () => {
    return (
      <TouchableOpacity
        onPress={() => setVisiblePuzzleHint(false)}
        style={styles.hintWrap}
      >
        <View style={styles.hint}>
          <Image source={require('@assets/images/Union.png')} style={styles.hintBg} />
          <Text style={styles.hintText}>Click on a piece of puzzle in order to move it</Text>
        </View>
        <Image source={require('@assets/images/hint_bg.png')} style={{ width: '100%', height: '100%' }} />
      </TouchableOpacity>
    )
  }

  const onSponsor = async () => {
    setVisibleSponsorModal(false)
    console.log('puzzle?.sponsor', puzzle?.sponsor)
    navigation.navigate('Sponsor', { sponsor: puzzle?.sponsor })
    // await analytics().logEvent('Sponsor_BTN_Puzzle', {
    //   id: puzzle?.sponsor?.id,
    //   title: puzzle?.sponsor?.title
    // })
  }

  const onGiveUp = () => {
    setVisiblePuzzleGiveUpModal(false)
    setVisibleNotSolved(true)
  }

  const onReset = async () => {
    setVisiblePuzzleResetModal(false)
    await helper.sleep(300)
    retry()
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={puzzle?.title}
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
        goBack={navigation.goBack}
      />

      <ConfirmBuyPuzzleModal
        isVisible={visibleConfirmBuyPuzzleModal}
        onOk={buyPuzzle}
        onClose={() => setVisibleConfirmBuyPuzzleModal(false)}
        pointsRewards={puzzle?.points?.cost}
        enoughPoints={enoughPoints}
      />

      <SponsorModal
        isVisible={visibleSponsorModal}
        sponsor={puzzle?.sponsor}
        onSponsor={onSponsor}
        onClose={() => setVisibleSponsorModal(false)}
      />

      <ConfirmPuzzleGiveUp
        isVisible={visiblePuzzleGiveUpModal}
        onGiveUp={onGiveUp}
        onClose={() => setVisiblePuzzleGiveUpModal(false)}
      />

      <ConfirmPuzzleReset
        isVisible={visiblePuzzleResetModal}
        onReset={onReset}
        onClose={() => setVisiblePuzzleResetModal(false)}
      />

      {visiblePuzzleHint && renderPuzzleHint()}

      <ScrollView keyboardShouldPersistTaps='always'>

      {visibleCongratulations && renderCongratulations()}
      {visibleNotSolved && renderNotSolved()}
      {(!visibleNotSolved && !visibleCongratulations) && renderPuzzle()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  image: { width: 48, height: 47 },
  title: { fontFamily: 'Montserrat', color: '#121212', fontWeight: '400', fontSize: 24 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', color: '#121212', fontSize: 14, lineHeight: 18, paddingTop: 13 },
  button: { backgroundColor: '#fff', borderRadius: 12, width: '100%', paddingHorizontal: 18, paddingVertical: 18, marginTop: 20 },
  icon: { width: 36, height: 36, marginRight: 25 },
  listHeader: { alignItems: 'center', marginTop: '5%', marginBottom: '5%' },
  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 14, marginRight: 10 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400' },
  agendaIcon: { width: 12, height: 12, marginRight: 10 },
  optionValue: { fontWeight: '700', color: '#F2A71D' },

  puzzleWrap: { width: '100%', height: 360, borderRadius: 12, marginTop: 38, marginBottom: 33 },
  puzzleImage: { width: '100%', height: 340, position: 'absolute', borderRadius: 12 },
  puzzleOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)', flex: 1, width: '100%', height: '100%', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  unlockText: { color: '#fff', fontWeight: '700', fontSize: 22, textAlign: 'center' },
  lockIcon: { width: 58, height: 73, marginTop: 37, marginBottom: 40 },
  solve: { marginTop: 16, fontWeight: '400', fontSize: 18, color: '#121212', textAlign: 'center', lineHeight: 26.8 },
  solve2: { fontWeight: '600', fontSize: 16, color: '#121212' },
  line: { height: 1, width: '100%', backgroundColor: '#EAEAEA', marginTop: 15 },
  congWrap: { paddingHorizontal: 17, alignItems: 'center', backgroundColor: '#fff' },
  puzzle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10.0,
    borderRadius: 12,
    position: 'absolute'
  },
  hintWrap: { position: 'absolute', zIndex: 2, width: '100%', height: '100%' },
  hint: { width: 334, height: 83, position: 'absolute', zIndex: 3, top: 410, left: 30 },
  hintText: { zIndex: 4, marginTop: 14, marginLeft: 16, fontWeight: '600', fontSize: 15, color: '#fff', marginRight: 16 },
  hintBg: { width: 334, height: 83, position: 'absolute' },
  button2: { width: '48%', backgroundColor: 'rgba(0,0,0,0)' },
  smallImage: { width: 88, height: 88, borderRadius: 12, marginTop: 10 },
  buttonsWrap: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
})