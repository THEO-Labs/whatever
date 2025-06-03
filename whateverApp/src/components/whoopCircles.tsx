import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from "../design/colors"

type Props = {
  value: number;
  max: number;
  label: string;
  color: string;
};

export const ActivityCircle: React.FC<Props> = ({value, max, label, color}) => {
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Hintergrund-Kreis */}
        <Circle
          stroke="#2E2F31"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Fortschritts-Kreis */}
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
      {/* Zahl/Wert in der Mitte */}
      <Text style={styles.valueText}>
        {Number.isInteger(value) ? value : value.toFixed(1)}
      </Text>
      {/* Label unten */}
      <Text style={styles.label}>{label.toUpperCase()}</Text>
    </View>
  );
};

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
    color: Colors.green, // updated to use brand color
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.green, // updated to use brand color
    letterSpacing: 1,
  },
});
