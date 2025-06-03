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
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CustomHeader currentRoute={currentRoute} navigationRef={navigationRef} />
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
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Adjust as needed or use your Colors file
  },
  navigator: {
    flex: 1,
  },
});
