import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import OnboardingNavigator from '../navigation/OnboardingNavigator.tsx';

export default function OnboardingScreen() {
  return (
      <LinearGradient colors={['#F4FCD9', '#FBC5D1']} style={{flex: 1}}>
        <OnboardingNavigator/>
      </LinearGradient>
  );
}
