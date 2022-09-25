import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Header, ExploreListItem, LoginModal, CommentsModal, VideoModal, StatusBar, Text } from '@components'
import { mainApi } from '@api'
import { loaderAction } from '@redux/actions/loaderActions'
import helper from '@services/helper'
import AlertAsync from 'react-native-alert-async'
// import { ImageGallery } from '@georstat/react-native-image-gallery'
import * as Animatable from 'react-native-animatable'
import { setFeeds } from '@redux/actions/mainActions'

export default function Restaurants(props) {
  const dispatch = useDispatch()
  const [feed, setFeed] = useState(null)
  const [likes, setLikes] = useState(null)
  const [comments, setComments] = useState([])
  const [commentsCount, setCommentsCount] = useState(0)
  const [visibleComments, setVisibleComments] = useState(false)
  const [visibleVideoModal, setVisibleVideoModal] = useState(false)
  const [commentText, setCommentText] = useState(null)
  const [loadingSendComment, setLoadingSendComment] = useState(false)
  const [repliesCommentId, setRepliesCommentId] = useState(null)
  const token = useSelector(state => state.userReducer.token)
  const user = useSelector(state => state.userReducer.user)
  const refComments = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const [visibleLogin, setVisibleLogin] = useState(false)

  useEffect(()=>{
    const getData = async () => {
      await getFeed()
      await getPostComments()
    }
  }, []);

  const getFeed = async () => {
    try {
      // dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.getFeed({
        id: props.route.params.feed.id,
        user_id: user?.userId,
        token,
      })
      setFeed(data)
      setLikes(data?.likes)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const getFeeds = async () => {
    try {
      const data = await mainApi.getFeeds({
        page: 1,
        user_id: user?.userId,
        token,
      })
      dispatch(setFeeds(data?.articles))
    } catch (e) {
      console.log(e.message)
    }
  }

  const getPostComments = async () => {
    try {
      // dispatch(loaderAction({ isLoading: true }))
      const data = await mainApi.getPostComments({
        post_id: props.route.params.feed.id,
        user_id: user?.userId,
        token,
      })
      setComments(data?.comments)
      setCommentsCount(data?.comments_count)
      dispatch(loaderAction({ isLoading: false }))
    } catch (e) {
      console.log(e.message)
      dispatch(loaderAction({ isLoading: false }))
    }
  }

  const sendPostComment = async () => {
    try {
      if (!commentText?.length) return
      setLoadingSendComment(true)
      const data = await mainApi.sendPostComment({
        post_id: props.route.params.feed.id,
        user_id: user?.userId,
        token,
        comment: commentText,
        comment_id: repliesCommentId
      })
      setLoadingSendComment(false)
      if (data?.comment?.id) {
        setCommentText('')
        await getPostComments()
        await helper.sleep(300)
        refComments.current.scrollToEnd()
      } else {
        AlertAsync(data.message || 'Something went wrond')
      }
    } catch (e) {
      console.log(e.message)
      setLoadingSendComment(false)
      AlertAsync(e.message || 'Something went wrond')
    }
  }

  const onLikeComment = async comment => {
    if (!token) {
      setVisibleComments(false)
      await helper.sleep(1000)
      setVisibleLogin(true)
      return
    }
    try {
      setComments(comments.map(i => {
        if (i.id === comment.id) {
          return {
            ...i,
            likes: {
              count: i.likes.marked ? i.likes.count - 1 : i.likes.count + 1,
              marked: !i.likes.marked
            }
          }
        }

        return {
          ...i,
          children: i?.children?.length && i.children.map(child => {
            if (child.id === comment.id) {
              return {
                ...child,
                likes: {
                  count: child.likes.marked ? child.likes.count - 1 : child.likes.count + 1,
                  marked: !child.likes.marked
                }
              }
            }
            return child
          })
        }
      }))
      const data = await mainApi.likeComment({
        user_id: user?.userId,
        token,
        comment_id: comment.id
      })
      // await getPostComments()
    } catch (e) {
      console.log(e.message)
    }
  }

  const onLike = async () => {
    if (!token) {
      setVisibleLogin(true)
      return
    }
    try {
      setLikes({
        count: likes.marked ? likes.count - 1 : likes.count + 1,
        marked: !likes.marked
      })
      const data = await mainApi.likeExplore({
        user_id: user?.userId,
        token,
        id: feed?.id
      })
      await getFeeds()
    } catch (e) {
      console.log(e.message)
    }
  }

  const onLogin = () => {
    setVisibleLogin(false)
    props.navigation.navigate('Login')
  }

  const onEmail = () => {
    setVisibleLogin(false)
    props.navigation.navigate('Signup')
  }

  const logoSource = feed?.logo ? { uri: feed?.logo } : require('@assets/images/no_logo.png');
  const images = feed?.outro_gallery ? feed?.outro_gallery : []
  const likeIcon = likes?.marked ? require('@assets/icons/like.png') : require('@assets/icons/like-gray.png')
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Header
        title={feed?.title}
        goBack={props.navigation.goBack}
        showMenu
        showCrownIcon
        showNotificationsIcon
        navigation={props.navigation}
      />
      <ScrollView keyboardShouldPersistTaps='always'>

        <LoginModal
          isVisible={visibleLogin}
          onClose={() => setVisibleLogin(false)}
          onLogin={onLogin}
          onEmail={onEmail}
          renderHeader={() => <Image source={require('@assets/icons/comments.png')} style={{ width: 118, height: 118, marginTop: 39 }} />}
          text={`You need to register to \nleave likes and comments`}
        />

        <CommentsModal
          isVisible={visibleComments}
          onClose={() => setVisibleComments(false)}
          comments={comments}
          onChangeCommentText={commentText => setCommentText(commentText)}
          commentText={commentText}
          onSendComment={sendPostComment}
          onLike={onLikeComment}
          loadingSendComment={loadingSendComment}
          commentsCount={commentsCount}
          refComments={refComments}
          onReply={comment => setRepliesCommentId(comment?.id)}
          repliesCommentId={repliesCommentId}
          isloggedin={user}
        />

        <View>
          {feed?.intro_image ? (
            <View style={{ ...styles.image31, backgroundColor: '#E2E2E2' }}>
              <Image source={{ uri: feed?.intro_image }} style={styles.image31} resizeMode='contain' />
            </View>
          ) : null}
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.image}
                source={logoSource}
              />
              <View style={{ justifyContent: 'center' }}>
                <Text style={styles.title} numberOfLines={2}>
                  {feed?.title}
                </Text>

              </View>
            </View>

            {/* <TouchableOpacity style={styles.menuButton}>
              <Image source={require('@assets/icons/more.png')} style={styles.moreIcon} />
            </TouchableOpacity> */}

          </View>


          <View style={styles.wrapContacts}>

            {feed?.website ? (
              <TouchableOpacity onPress={() => Linking.openURL(feed?.website)} style={styles.optionWrap}>
                <Image source={require('@assets/icons/web.png')} style={styles.agendaIcon} />
                <Text style={styles.optionText} numberOfLines={1}>
                  {feed?.website}
                </Text>
              </TouchableOpacity>
            ) : null}

            <View style={{ flexDirection: 'row' }}>

              {feed?.phone?.title ? (
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${feed?.phone?.title}`)} style={styles.optionWrap}>
                  <Image source={require('@assets/icons/phone.png')} style={{ width: 10, height: 10 }} />
                  <Text style={styles.optionText} numberOfLines={1}>
                    {feed?.phone?.title}
                  </Text>
                </TouchableOpacity>
              ) : null}

              {feed?.location ? (
                <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/place/' + feed?.location)} style={styles.optionWrap}>
                  <Image source={require('@assets/icons/maps.png')} style={{ width: 10, height: 13 }} />
                  <Text style={styles.optionText}>
                    {feed?.location}
                  </Text>
                </TouchableOpacity>
              ) : null}


            </View>


          </View>




          <View style={{ paddingVertical: 12, paddingHorizontal: 18 }}>
            <Text style={styles.text}>
              {feed?.content}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, paddingHorizontal: 18 }}>


            <FlatList
              numColumns={2}
              showsVerticalScrollIndicator={false}
              data={images}
              keyExtractor={(item, index) => 'image-' + index}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={openGallery}>
                    <Image source={{ uri: item.thumb }} style={{ width: 162, height: 93 }} />
                  </TouchableOpacity>
                )
              }}
            />

          </View>


          {/* <ImageGallery close={closeGallery} isOpen={isOpen} images={images} /> */}



          <View style={styles.bottomWrap}>
            <TouchableOpacity
              onPress={() => setVisibleComments(true)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Image source={require('@assets/icons/chat-bubble.png')} style={styles.commentsIcon} />
              <Text style={styles.textCount}>
                {commentsCount}
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <TouchableOpacity
                onPress={onLike}
              >
                <Animatable.View animation={likes?.marked ? 'bounceIn' : null}>
                  <Image source={likeIcon} style={styles.likeIcon} resizeMode='contain' />
                </Animatable.View>
              </TouchableOpacity>

              <Text style={styles.textCount}>
                {likes?.count}
              </Text>
            </View>
          </View>



        </View>
      </ScrollView>


      {feed?.intro_video && (
        <VideoModal
          isVisible={visibleVideoModal}
          videoUrl={feed?.intro_video}
          onClose={() => setVisibleVideoModal(false)}
        />
      )}


      <View style={styles.button}>

        {feed?.intro_video ? (
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => setVisibleVideoModal(true)}
          >
            <Text style={styles.buttonText}>Features Video</Text>
            <Image source={require('@assets/icons/vid.png')} style={styles.vidIcon} />
          </TouchableOpacity>
        ) : null}

        {(feed?.website && feed?.intro_video) ? (
          <View style={styles.line2} />
        ) : null}

        {feed?.website ? (
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => Linking.openURL(feed?.website)}
          >
            <Text style={styles.buttonText}>Visit Web Site</Text>
            <Image source={require('@assets/icons/visit.png')} style={styles.visitIcon} />
          </TouchableOpacity>
        ) : null}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  optionWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 7, marginRight: 27 },
  optionText: { fontFamily: 'Montserrat', fontSize: 13, color: '#7A7A7A', fontWeight: '400', marginLeft: 10 },
  cardHeader: { width: '100%', flexDirection: 'row', paddingTop: 16, paddingBottom: 14, justifyContent: 'space-between', paddingHorizontal: 17 },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  title: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 18, color: '#121212', width: 250 },
  text: { fontFamily: 'Montserrat', fontWeight: '400', fontSize: 14, color: '#121212' },
  textCount: { fontFamily: 'Montserrat', fontWeight: '600', fontSize: 13, color: '#848484' },
  menuButton: { justifyContent: 'center', alignItems: 'center', width: 40 },
  moreIcon: { width: 4, height: 22 },
  mapsIcon: { width: 10, height: 13 },
  agendaIcon: { width: 12, height: 12 },
  image31: { width: '100%', height: 201 },
  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 },

  button: {
    paddingHorizontal: 23,
    height: 60,
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.22,

    elevation: 3,
  },
  buttonText: { fontFamily: 'Montserrat', fontWeight: '700', fontSize: 15, color: '#F2A71D' },

  bottomWrap: { paddingVertical: 14, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#E2E2E2', marginTop: 25, marginBottom: 21 },
  commentsIcon: { width: 25, height: 25, marginRight: 7 },
  likeIcon: { width: 28, height: 25, marginRight: 7 },
  footerButton: { flexDirection: 'row', alignItems: 'center' },
  vidIcon: { width: 15, height: 14, marginLeft: 9 },
  visitIcon: { width: 15, height: 15, marginLeft: 9 },
  line2: { height: 29, width: 1, backgroundColor: '#E2E2E2' },
  wrapContacts: { paddingHorizontal: 18, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 24 },
})