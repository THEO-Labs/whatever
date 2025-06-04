import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator({
                                       initialRoute,
                                     }: {
  initialRoute: keyof RootStackParamList;
}) {
  return (
      <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
              headerShown: false,
          }}
      >
          <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{
                  headerShown: false,
              }}
          />
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                  gestureDirection: 'horizontal-inverted',
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  headerShown: false,
              }}
          />
          <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                  gestureDirection: 'horizontal',
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  headerShown: false,
              }}
          />
      </Stack.Navigator>
  );
}
