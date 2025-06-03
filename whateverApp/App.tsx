import React, { useEffect, useState } from 'react';
import { StatusBar, useColorScheme, View, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigator from './src/navigation/AppNavigator';
import { CustomHeader } from './src/components/CustomHeader';

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

  if (!initialRoute) {
    // Still loading AsyncStorage
    return null;
  }



  return (
    <View style={styles.container}>
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
