import React from 'react';
import {StatusBar, useColorScheme, View, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {CustomHeader} from './src/components/CustomHeader';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = React.useState<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setCurrentRoute(navigationRef.getCurrentRoute()?.name);
      }}
      onStateChange={() => {
        setCurrentRoute(navigationRef.getCurrentRoute()?.name);
      }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container}>
        <CustomHeader currentRoute={currentRoute} navigationRef={navigationRef} />
        <View style={styles.navigator}>
          <AppNavigator />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigator: {
    flex: 1,
  },
});