import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {TrackerManager} from './src/utils/BackgroundTracker';
import {calculateDailyActivityScores} from './src/utils/calculateActivityScore';

LogBox.ignoreLogs(['new NativeEventEmitter']); // optional

const App: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      calculateDailyActivityScores().then(scores => {
        console.log('Tages-Score (alle 15s):', scores);
      });
    }, 15_000);

    // Clean-up bei Unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TrackerManager />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
