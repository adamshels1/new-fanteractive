import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Input, Button, StatusBar, Text, SponsorModal } from '@components'
import { mainApi } from '@api';
import { loaderAction } from '@redux/actions/loaderActions'
// import YoutubePlayer from "react-native-youtube-iframe"
import helper from '@services/helper'
import * as Animatable from 'react-native-animatable'

export default function Questions({ route, navigation }) {

  const dispatch = useDispatch()
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const [visibleSponsorModal, setVisibleSponsorModal] = useState(false)
  const [firstShowSponsor, setFirstShowSponsor] = useState(true)

  const [trivia, setTrivia] = useState(null)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

  const question = trivia?.questions_answers ? trivia?.questions_answers.find(i => i.right !== true && i.right !== false) : null;
  console.log('question', question)
  console.log('points', question?.points)
  const points = question?.points
  const questionIndex = trivia?.questions_answers ? trivia?.questions_answers.indexOf(question) : null
  const isDone = trivia?.questions_answers && !Boolean(trivia?.questions_answers.find(i => i.right !== true && i.right !== false))
  let wonPoints = null
  if (isDone) {
    wonPoints = trivia?.questions_answers ? trivia?.questions_answers.reduce((prev, current) => {
      if (current.right) {
        return prev + current.points
      }
      return prev
    }, 0) : null
  }

  useEffect(() => {
    getTrivia(true)
  }, []);

  const getTrivia = async (showLoader) => {
    try {
      if (showLoader) {
        dispatch(loaderAction({ isLoading: true }))
      }

      const data = await mainApi.getTrivia({
        user_id: user?.userId,
        token,
        id: route?.params?.trivia.id
      })
      setTrivia(data)
      dispatch(loaderAction({ isLoading: false }))
      await helper.sleep(300)
      if (data?.sponsor && firstShowSponsor) {
        setVisibleSponsorModal(true)
        setFirstShowSponsor(false)
      }
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }


  const renderAnswer = (item, index) => {
    const checkboxIcon = selectedAnswerIndex === index ? require('@assets/icons/checkbox-active.png') : require('@assets/icons/checkbox.png');
    return (
      <TouchableOpacity
        onPress={() => setSelectedAnswerIndex(index)}
        style={styles.answerWrap}
        key={'questions-' + index}
      >
        <View style={styles.answerContent}>
          <Text>
            {item?.answer}
          </Text>
          <Image
            style={styles.checkboxIcon}
            source={checkboxIcon}
          />
        </View>
        <View style={styles.answerLine} />
      </TouchableOpacity>
    )
  }

  const onSubmitAnswer = async () => {
    try {
      dispatch(loaderAction({ isLoading: true }))

      const data = await mainApi.getTriviaPoints({
        user_id: user?.userId,
        token,
        id: trivia.id,
        question: questionIndex,
        answer: selectedAnswerIndex
      })
      setSelectedAnswerIndex(null)
      console.log('data', data)
      await getTrivia()
      // setTrivia(data)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }


  const renderCongratulations = () => {
    return (
      <Animatable.View
        animation={'bounceInRight'}
        style={styles.congWrap}
      >


        <View style={styles.listHeader}>

          {wonPoints ? (
            <Image style={{ width: 75, height: 75 }} resizeMode='contain' source={require('@assets/icons/star.png')} />
          ) : (
            <Image style={{ width: 70, height: 70 }} resizeMode='contain' source={require('@assets/icons/not_solved.png')} />
          )}
          {wonPoints ? (
            <Text style={styles.solve}>
              You have completed trivia with {`\n`}<Text style={{ color: '#F2A71D', fontWeight: '700' }}>{wonPoints} points</Text>
              {`\n`}
              Correct answers: {trivia?.questions_answers && trivia?.questions_answers?.filter(i => i.right).length} of {trivia?.questions_answers?.length}
            </Text>
          ) : (
            <Text style={styles.solve}>
              Unfortunately, you didn't answer any of the questions correctly
            </Text>
          )}

        </View>



        <View style={[styles.puzzleWrap, { marginTop: 0 }]}>
          {trivia?.featured_image && (
            <Image
              source={{ uri: trivia?.featured_image }}
              style={styles.image}
              resizeMode='contain'
            />
          )}


          {/* {trivia?.featured_video && (
            <View style={styles.image}>
              <YoutubePlayer
                videoId={helper.getYoutubeVideoId(trivia?.featured_video)}
                play={false}
                height={240}
                width={'100%'}
              />
            </View>
          )} */}
        </View>


        <Button
          text='Back to Mini Games'

          onPress={navigation.goBack}
        />

      </Animatable.View>

    )
  }

  const image = question?.review?.image ? question?.review?.image : trivia?.featured_image
  const video = question?.review?.video ? question?.review?.video : trivia?.featured_video
  const renderTrivia = () => {
    return (
      <View style={styles.contentWrap}>

        <View
          style={styles.content}
        >
          <View style={styles.questionHeader}>
            <View style={styles.resWrap}>
              <View style={{ flexDirection: 'row' }}>
                {trivia?.questions_answers && trivia?.questions_answers.map((i, key) => {
                  if (i.right) {
                    return <Image key={'img-' + key} source={require('@assets/icons/Process-success.png')} style={styles.processIcon} />
                  } else if (i.right === false) {
                    return <Image key={'img-' + key} source={require('@assets/icons/Process-filed.png')} style={styles.processIcon} />
                  } else {
                    return <Image key={'img-' + key} source={require('@assets/icons/Process-question.png')} style={styles.processIcon} />
                  }
                })}

              </View>

              <Text style={styles.pointsText}>POINTS: <Text style={styles.points}>{points}</Text></Text>
            </View>

            {image && (
              <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode='contain'
              />
            )}


            {/* {video && (
              <View style={styles.image}>
                <YoutubePlayer
                  videoId={helper.getYoutubeVideoId(video)}
                  play={false}
                  height={240}
                  width={'100%'}
                />
              </View>
            )} */}


            <Text style={styles.questionText}>
              {question?.question}
            </Text>
          </View>

          <View style={styles.line} />

          {question?.answers && question.answers.map((item, key) => {
            return renderAnswer(item, key)
          })}

          {question && (
            <View style={styles.buttonWrap}>
              <Button
                text='Submit'
                onPress={onSubmitAnswer}
                disabled={!selectedAnswerIndex && selectedAnswerIndex !== 0}
              />
            </View>
          )}


        </View>
      </View>
    )
  }

  const onSponsor = async () => {
    setVisibleSponsorModal(false)
    console.log('trivia?.sponsor', trivia?.sponsor)
    navigation.navigate('Sponsor', { sponsor: trivia?.sponsor })
    await analytics().logEvent('Sponsor_BTN_Trivia', {
      id: trivia?.sponsor?.id,
      title: trivia?.sponsor?.title
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={trivia?.title}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={navigation}
        goBack={navigation.goBack}
      />

      <SponsorModal
        isVisible={visibleSponsorModal}
        sponsor={trivia?.sponsor}
        onSponsor={onSponsor}
        onClose={() => setVisibleSponsorModal(false)}
      />


      <ScrollView keyboardShouldPersistTaps='always'>

        {isDone ? renderCongratulations() : renderTrivia()}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  processIcon: { width: 18, height: 18, marginRight: 5 },
  checkboxIcon: { width: 18, height: 18 },
  answerWrap: { paddingTop: 17, paddingHorizontal: 14 },
  answerContent: { flexDirection: 'row', justifyContent: 'space-between' },
  answerLine: { height: 1, width: '100%', backgroundColor: '#EAEAEA', marginTop: 20 },
  content: { backgroundColor: '#fff', borderRadius: 12, width: '100%' },
  contentWrap: { paddingHorizontal: 17, alignItems: 'center', marginTop: 20 },
  questionHeader: { paddingHorizontal: 18, paddingVertical: 18 },
  resWrap: { flexDirection: 'row', justifyContent: 'space-between' },
  pointsText: { fontSize: 13, fontWeight: '400', color: '#121212' },
  points: { fontWeight: '700', fontSize: 15, color: '#F2A71D' },
  image: { width: '100%', height: 240, borderRadius: 12, marginTop: 9 },
  questionText: { marginTop: 18, fontWeight: '600', fontSize: 14, lineHeight: 19.6, color: '#121212' },
  line: { height: 1, width: '100%', backgroundColor: '#EAEAEA', marginTop: 3 },
  buttonWrap: { marginHorizontal: 14, marginVertical: 18 },

  congWrap: { paddingHorizontal: 17, alignItems: 'center', backgroundColor: '#fff' },
  listHeader: { alignItems: 'center', marginTop: '5%', marginBottom: '5%' },
  puzzleWrap: { width: '100%', height: 260, borderRadius: 12, marginTop: 38, marginBottom: 40 },
  solve: { marginTop: 16, fontWeight: '400', fontSize: 18, color: '#121212', textAlign: 'center', lineHeight: 26.8 },
  solve2: { fontWeight: '600', fontSize: 16, color: '#121212' },
})