import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {calculateDailyActivityScores} from './src/utils/calculateActivityScore.ts';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    calculateDailyActivityScores().then(scores => {
      console.log('Tages-Score:', scores);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: isDarkMode ? Colors.black : Colors.white}}>
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;