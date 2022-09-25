import * as types from '@redux/types';

const initialState = {
    isLoading: false,
    message: null
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_LOADER:
            const { isLoading, message = '' } = action.payload;
            return {
                ...state,
                isLoading,
                message,
            }

        default:
            return state
    }
}

export default mainReducer