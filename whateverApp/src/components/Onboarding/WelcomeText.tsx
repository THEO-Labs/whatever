import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

export default function WelcomeText() {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Unendliche Wink-Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: -1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500), // kleine Pause vor erneutem Winken
      ]),
    ).start();
  }, [waveAnim]);

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
          color: '#fff',
        }}>
        Hey! Schön, dass du da bist{' '}
        <Animated.Text style={{transform: [{rotate}]}}>👋</Animated.Text>
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          opacity: 0.9,
        }}>
        Erzähl uns ein wenig über dich – so kann die App dich besser begleiten.
      </Text>
    </View>
  );
}
