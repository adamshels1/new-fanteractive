import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Input } from '@components'
import { colors } from '@constants'
import * as Animatable from 'react-native-animatable';
import { Text } from '@components'

export default function CommentsModal(props) {
  const { onClose, comments = [], onChangeCommentText, commentText, onSendComment, loadingSendComment, commentsCount, refComments, repliesCommentId, onReply, onLike, isloggedin } = props;
  const replyComment = comments.find(i => i.id === repliesCommentId)
  const replyChildrenComments = replyComment?.children ? replyComment.children : []
  const renderComment = ({ item, index }) => {
    const likeIcon = item.likes.marked ? require('@assets/icons/like.png') : require('@assets/icons/like-gray.png')
    const userName = !item?.user?.first_name ? 'Arhived user' : item?.user?.first_name + ' ' + item?.user?.last_name
    return (

      <Animatable.View
        animation={repliesCommentId ? 'bounceInRight' : null}
        style={[styles.commentWrap, { marginLeft: (repliesCommentId && index !== 0) ? 15 : 0 }]}
      >
        <View style={styles.commentHeader}>

          <Text style={styles.commentUser} numberOfLines={3}>
            {userName} • {item?.human_date}
          </Text>

          <View style={styles.commentLikes}>
            <Text style={styles.commentUser} numberOfLines={1}>
              {item?.likes?.count}
            </Text>
            <TouchableOpacity
              onPress={() => onLike(item)}
            >
              <Animatable.View animation={item.likes.marked ? 'bounceIn' : null}>
                <Image source={likeIcon} style={styles.likeIcon} resizeMode='contain' />
              </Animatable.View>
            </TouchableOpacity>
          </View>

        </View>

        <Text style={styles.commentText}>
          {item?.content}
        </Text>

        {!repliesCommentId ? (
          <TouchableOpacity
            onPress={() => onReply(item)}
            style={styles.commentRepliesWrap}
          >
            <View style={styles.commentReplies}>
              <Text style={styles.commentRepliesText}>
                {item?.children && item?.children?.length} replies
              </Text>
              <Image source={require('@assets/icons/arrow.png')} style={styles.arrowIcon} />
            </View>
          </TouchableOpacity>
        ) : <View style={{ height: 10 }} />}

      </Animatable.View>
    )
  }

  return (
    <Modal
      style={styles.modal}
      onSwipeComplete={onClose}
      // swipeDirection={['down', 'up']}
      onBackdropPress={onClose}
      avoidKeyboard={true}
      {...props}
    >

      <View style={styles.container}>

        {repliesCommentId ? (
          <View
            animation={'bounceInRight'}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, paddingLeft: 18, height: 40 }}>
            <TouchableOpacity
              onPress={() => onReply(null)}
              style={styles.leftWrap}
            >
              <Image style={{ width: 10, height: 16 }} source={require('@assets/icons/back.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>
              Replies <Text style={styles.commentCount}>{replyComment?.children?.length}</Text>
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, paddingLeft: 18, height: 40 }}>
            <Text style={styles.title}>
              Comments <Text style={styles.commentCount}>{commentsCount}</Text>
            </Text>
          </View>
        )}


        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Image source={require('@assets/icons/x.png')} style={styles.closeIcon} />
        </TouchableOpacity>

        <View style={styles.line} />

        {repliesCommentId ? (
          <FlatList
            ref={refComments}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            data={[replyComment, ...replyChildrenComments]}
            keyExtractor={(item, index) => 'comment-children-' + item.id}
            renderItem={renderComment}
          />
        ) : (
          <FlatList
            ref={refComments}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            data={comments}
            keyExtractor={(item, index) => 'comment-' + item.id}
            renderItem={renderComment}
          />
        )}


        {isloggedin && (
          <View style={styles.inputWrap}>

            <TextInput
              style={{ height: 61, width: '89%', textAlignVertical: 'top', }}
              placeholder='Write your comment here'
              multiline={true}
              maxLength={500}
              onChangeText={onChangeCommentText}
              value={commentText}
            />
            <TouchableOpacity
              disabled={loadingSendComment || !commentText?.length}
              onPress={onSendComment}
              style={{ ...styles.sendButton, opacity: commentText?.length ? 1 : 0.5 }}
            >
              {loadingSendComment ? (
                <ActivityIndicator color='#000' />
              ) : (
                <Image source={require('@assets/icons/paper-plane.png')} style={styles.sendIcon} />
              )}

            </TouchableOpacity>
          </View>
        )}


      </View>
    </Modal>
  );

}


const styles = StyleSheet.create({
  modal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.001)', margin: 0, padding: 0, justifyContent: 'flex-end' },
  container: { backgroundColor: '#FFF', borderRadius: 12, bottom: 0 },

  day: { fontWeight: '400', fontFamily: 'Avenir', fontSize: 12, color: '#121212', textAlign: 'center' },
  image: { width: '100%', height: 251, borderTopRightRadius: 12, borderTopLeftRadius: 12 },

  title: { fontWeight: '600', fontFamily: 'Avenir', fontSize: 20, color: '#121212' },

  likeIcon: { width: 20, height: 17, marginLeft: 5 },
  arrowIcon: { width: 6, height: 10, marginLeft: 17 },
  sendIcon: { width: 23, height: 22 },
  inputWrap: {
    paddingBottom: 30,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: 'white',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.22,

    elevation: 3,
  },
  line: { backgroundColor: '#CFCFCF', height: 1, marginTop: 13 },
  closeButton: { position: 'absolute', right: 10, top: 10, flex: 1 },

  commentWrap: { paddingHorizontal: 18, marginBottom: 19, borderBottomWidth: 1, borderBottomColor: '#CFCFCF', paddingBottom: 6, marginBottom: 19 },
  commentHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  commentUser: { fontWeight: '400', color: '#7A7A7A', fontSize: 13, maxWidth: '85%' },
  commentLikes: { flexDirection: 'row', alignItems: 'center' },
  commentText: { fontWeight: '400', color: '#121212', fontSize: 14, marginTop: 9 },
  commentRepliesWrap: { width: 90, height: 42, justifyContent: 'center', alignItems: 'flex-start' },
  commentReplies: { flexDirection: 'row', alignItems: 'center' },
  commentRepliesText: { fontWeight: '700', color: '#F2A71D', fontSize: 15 },
  sendButton: { height: 61, width: 61, justifyContent: 'center', alignItems: 'center' },
  closeIcon: { width: 38, height: 34 },
  commentCount: { color: '#848484', fontWeight: '600', fontSize: 15 },

  leftWrap: { width: 43, height: 40, justifyContent: 'center', paddingLeft: 18, marginLeft: -18 },
  list: { height: '60%', paddingTop: 15 },
});
