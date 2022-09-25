import { combineReducers } from 'redux';

import mainReducer from './mainReducer';
import loaderReducer from './loaderReducer';
import userReducer from './userReducer';

export default combineReducers({
    mainReducer,
    loaderReducer,
    userReducer
});
