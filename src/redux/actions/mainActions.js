import * as types from '@redux/types';

export const setRewardsAction = rewards => ({
    type: types.SET_REWARDS,
    payload: rewards
})

export const setEventAction = event => ({
    type: types.SET_EVENT,
    payload: event
})

export const setHideWelcomeAction = bool => ({
    type: types.SET_HIDE_WELCOME,
    payload: bool
})

export const setUnreadNotificationsCountAction = count => ({
    type: types.SET_UNREAD_NOTIFICATIONS_COUNT,
    payload: count
})

export const setFeeds = feeds => ({
    type: types.SET_FEEDS,
    payload: feeds
})
