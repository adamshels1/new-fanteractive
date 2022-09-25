import React from 'react'
import MainStackNavigator from './src/navigation/AppNavigator'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import getStore from './src/redux/store/index';
const { store, persistor } = getStore();
// import codePush from "react-native-code-push";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStackNavigator />
      </PersistGate>
    </Provider>
  )
}

// let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

export default App;