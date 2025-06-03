import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {TrackerManager} from './src/utils/BackgroundTracker';
import {calculateDailyActivityScores} from './src/utils/calculateActivityScore.ts';

LogBox.ignoreLogs(['new NativeEventEmitter']); // optional

const App: React.FC = () => {
  useEffect(() => {
    calculateDailyActivityScores().then(scores => {
      console.log('Tages-Score:', scores);
    });
  }, []);
  return <TrackerManager />;
};

export default App;
