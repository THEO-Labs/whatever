import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Colors from '../design/colors';

type Props = {
  value: number;
  max: number;
  label: string;
  color: string;
  blink?: boolean; // neu!
};

export const ActivityCircle: React.FC<Props> = ({value, max, label, color, blink = false}) => {
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  // 🔁 Blinken via Animated.Value
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (blink) {
      const pulse = Animated.loop(
          Animated.sequence([
            Animated.timing(opacity, {toValue: 0.2, duration: 1000, useNativeDriver: true}),
            Animated.timing(opacity, {toValue: 1, duration: 1000, useNativeDriver: true}),
          ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      opacity.setValue(1);
    }
  }, [blink]);

  return (
      <View style={styles.container}>
        <Svg width={size} height={size}>
          {/* Hintergrund (dunkler, statisch) */}
          <Circle
              stroke="#2E2F31"
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
          />

          {/* Gefüllter, animierter Innenkreis */}
          {blink && (
              <AnimatedCircle
                  fill={color}
                  stroke="none"
                  cx={size / 2}
                  cy={size / 2}
                  r={radius - strokeWidth / 2}
                  opacity={opacity}
              />
          )}

          {/* Fortschritts-Kreis (immer sichtbar, NICHT animiert!) */}
          <Circle
              stroke={color}
              fill="none"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation={-90}
              origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>

        <Text style={styles.valueText}>
          {Number.isInteger(value) ? value : value.toFixed(1)}
        </Text>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
      </View>
  );
};

// 👇 für AnimatedCircle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 12,
  },
  valueText: {
    position: 'absolute',
    top: 39,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.green,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.green,
    letterSpacing: 1,
  },
});
