import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
    value: number;
    max: number;
    label: string;
    color: string;
    blink?: boolean;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ActivityCircle: React.FC<Props> = ({ value, max, label, color, blink = false }) => {
    const size = 100;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(value / max, 1);
    const strokeDashoffset = circumference * (1 - percentage);

    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (blink) {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, { toValue: 0.2, duration: 1000, useNativeDriver: true }),
                    Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
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
                {/* Hintergrund-Kreis */}
                <Circle
                    stroke="#E5E5E5"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />

                {/* Blinkende Füllung (nur wenn aktiv) */}
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

                {/* Fortschritts-Ring */}
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

            <Text style={styles.valueText}>{Math.round(percentage * 100)}%</Text>
            <Text style={styles.label}>{label}</Text>
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
        top: 36,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888',
    },
    label: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
});
