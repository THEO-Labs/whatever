import React, { cloneElement, isValidElement } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from '../design/colors';

const completedBgColor = {
  menstruation: Colors.mendark,
  follicular: '#CEF249',
  ovulation: Colors.ovudark,
  luteal: '#FFC1C8',
};

const completedShadowColor = {
  menstruation: Colors.menlight,
  follicular: '#a5ce10',
  ovulation: Colors.green,
  luteal: '#e7848f',
};

const completedIconColor = {
  menstruation: '#FFCFCF',
  follicular:   '#058849',
  ovulation:    '#CEF249',
  luteal:       '#F25E5E',
};

interface LearningPathBlobProps {
  status: 'locked' | 'in-progress' | 'completed';
  phase: 'menstruation' | 'follicular' | 'ovulation' | 'luteal';
  icon: React.ReactNode | string;
  label?: string;
  onPress?: () => void;
}

export const LearningPathBlob: React.FC<LearningPathBlobProps> = ({
  status,
  phase,
  icon,
  label,
  onPress,
}) => {
/*   const [isPressed, setIsPressed] = useState(false);
 */  const getBlobStyle = (pressed: boolean) => {
  if (status === 'locked') {
    return {
      ...styles.blob,
      backgroundColor: Colors.comlight,
      shadowColor: Colors.comdark,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 0,
    };
  }

  if (status === 'completed') {
    return {
      ...styles.blob,
      backgroundColor: pressed ? '#E6E9DC' : completedBgColor[phase] || '#ccc',
      shadowColor: completedShadowColor[phase],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 0,
    };
  }

  // For in-progress
    return {
      ...styles.blob,
      backgroundColor: '#C9F3E2', // ← your specific BG color
      shadowColor: '#05A680',     // ← your specific shadow color
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 0,
      shadowOpacity: 1,
    };
}

  const iconColor = (() => {
    if (status === 'in-progress') return '#1C3D36';
    if (status === 'completed')   return completedIconColor[phase];
    return Colors.comdark; // locked
  })();

  const renderIcon =
    isValidElement(icon)
      ? cloneElement(icon as React.ReactElement<any>, { color: iconColor } as any)
      : <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>;

  return (
    <View style={styles.container}>
     <Pressable
        onPress={onPress}
        disabled={status === 'locked'}
        style={({ pressed }) => getBlobStyle(pressed)}
      >
        {renderIcon}
      </Pressable>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  blob: {
  width: 100,
  height: 80,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
},
  icon: {
    fontSize: 32,
  },
  label: {
    marginTop: 10,
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
});
