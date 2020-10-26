import 'react-native-gesture-handler';
import * as React from 'react';
import MyStack from './Components/Navigation/StackNavigatipon/Navigation';

const App = () => {
  return <MyStack uriPrefix={'mytestapp://'}></MyStack>;
};

export default App;
