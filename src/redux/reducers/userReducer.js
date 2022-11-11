import * as types from '@redux/types';

const initialState = {
    user: null,
    token: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            console.log('types.SET_USER', action.payload)
            return {
                ...state,
                user: action.payload
            }

        case types.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        case types.LOGOUT:
            console.log('types.LOGOUT')
            return {
                ...state,
                user: null,
                token: null
            }

        default:
            return state
    }
}

export default userReducer