import * as types from '@redux/types';

const initialState = {
    rewards: [],
    event: null,
    hideWelcome: false,
    unreadNotificationsCount: 0,
    feeds: []
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_REWARDS:
            console.log('types.SET_REWARDS', types.SET_REWARDS)
            const { payload } = action;
            return {
                ...state,
                rewards: Object.keys(payload).map(key => ({ date: key, value: payload[key] }))
            }
        case types.SET_EVENT:
            console.log('types.SET_EVENT', action.payload)
            return {
                ...state,
                event: action.payload
            }
        case types.SET_HIDE_WELCOME:
            console.log('types.SET_HIDE_WELCOME', action.payload)
            return {
                ...state,
                hideWelcome: action.payload
            }
        case types.SET_UNREAD_NOTIFICATIONS_COUNT:
            console.log('types.SET_UNREAD_NOTIFICATIONS_COUNT', action.payload)
            return {
                ...state,
                unreadNotificationsCount: action.payload
            }

        case types.SET_FEEDS:
            console.log('types.SET_FEEDS', action.payload)
            return {
                ...state,
                feeds: action.payload
            }

        default:
            return state
    }
}

export default mainReducer