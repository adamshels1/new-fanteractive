import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '@redux/reducers/index'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'root',
    whitelist: ['mainReducer', 'userReducer'],
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    const store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    const persistor = persistStore(store);
    return { store, persistor };
};

