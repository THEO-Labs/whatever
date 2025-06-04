import React, {useEffect, useState} from 'react';
import {NativeModules, StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './src/navigation/AppNavigator';
import {CustomHeader} from './src/components/CustomHeader';
import {TrackerManager} from './src/utils/BackgroundTracker';
import {calculateDailyActivityScores} from './src/utils/calculateActivityScore.ts';

const {PedometerModule} = NativeModules;

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState<string>();
  const [initialRoute, setInitialRoute] = useState<'Onboarding' | 'Home' | null>(null);

  // Determine initial screen based on onboarding
  useEffect(() => {
    (async () => {
      const completed = await AsyncStorage.getItem('onboardingComplete');
      setInitialRoute(completed === 'true' ? 'Home' : 'Onboarding');
    })();
  }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (
                !PedometerModule ||
                typeof PedometerModule.getTodaySteps !== 'function'
            ) {
                console.warn(
                    '[StepsPoller] PedometerModule.getTodaySteps nicht verfügbar.',
                );
                return;
            }

            try {
                const steps = await PedometerModule.getTodaySteps();
                const raw = await AsyncStorage.getItem('todayScores');
                const existing = JSON.parse(raw || '{}');
                const updated = {...existing, steps};
                await AsyncStorage.setItem('todayScores', JSON.stringify(updated));
            } catch (err) {
                console.warn(
                    '[StepsPoller] Fehler beim Abrufen oder Speichern der Schritte:',
                    err,
                );
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            calculateDailyActivityScores().catch(err => {
                console.warn('[Recalc] Fehler beim Berechnen der Scores:', err);
            });
        }, 10_000);
        return () => clearInterval(interval);
    }, []);


  if (!initialRoute) {
    return null;
  }



  return (
    <View style={styles.container}>
      <TrackerManager/>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {currentRoute !== 'Onboarding' && (
        <CustomHeader currentRoute={currentRoute} navigationRef={navigationRef} />
      )}
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          setCurrentRoute(navigationRef.getCurrentRoute()?.name);
        }}
        onStateChange={() => {
          setCurrentRoute(navigationRef.getCurrentRoute()?.name);
        }}
      >
        <SafeAreaView style={styles.navigator}>
          <AppNavigator initialRoute={initialRoute} />
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  navigator: { flex: 1 },
});
