import React from 'react';
import {LogBox} from 'react-native';
import Main from './src/navigation/Main.tsx';

LogBox.ignoreLogs(['new NativeEventEmitter']); // optional

export default function App() {
  return <Main />;
}

