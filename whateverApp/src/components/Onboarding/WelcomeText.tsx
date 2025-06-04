import React, {useRef} from 'react';
import {Animated, Text, View} from 'react-native';

export default function WelcomeText() {
  const waveAnim = useRef(new Animated.Value(0)).current;
  const rotate = waveAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-20deg', '20deg'],
  });

  return (
    <View style={{marginBottom: 24}}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: 8,
        }}>
        Welcome! We're glad you're here{' '}
        <Animated.Text style={{transform: [{rotate}]}}>👋</Animated.Text>
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          opacity: 0.9,
        }}>
        Tell us a bit about yourself - so we can tailor the experience just for you.
      </Text>
    </View>
  );
}
