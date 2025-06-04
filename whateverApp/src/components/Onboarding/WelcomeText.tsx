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
        Hey! Schön, dass du da bist{' '}
        <Animated.Text style={{transform: [{rotate}]}}>👋</Animated.Text>
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          opacity: 0.9,
        }}>
        Erzähl uns ein wenig über dich – so kann die App dich besser begleiten.
      </Text>
    </View>
  );
}
