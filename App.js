import { TestWatcher } from 'jest';
import * as React from 'react';
import MainContainer from './navigation/screens/MainTabs';
import 'react-native-gesture-handler';

function App() {
  return(
    <MainContainer />
  );
}

export default App;

// npx react-native run-android - To run app