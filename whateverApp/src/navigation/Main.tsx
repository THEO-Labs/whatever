import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator, {RootStackParamList} from './AppNavigator.tsx';
import {calculateDailyActivityScores} from '../utils/calculateActivityScore.ts';
import {TrackerManager} from '../utils/BackgroundTracker.ts';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Main() {

  useEffect(() => {
    const interval = setInterval(() => {
      calculateDailyActivityScores().then(scores => {
        console.log('Tages-Score (alle 15s):', scores);
      });
    }, 15_000);
    return () => clearInterval(interval);
  }, []);

  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const done = await AsyncStorage.getItem('onboardingComplete');
      setInitialRoute(done === 'true' ? 'Home' : 'Onboarding');
    };
    checkOnboarding();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <AppNavigator initialRoute={initialRoute} />
      <TrackerManager />
    </NavigationContainer>
  );
}
