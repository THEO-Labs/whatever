import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from '../design/colors';

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
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const getBlobStyle = () => {
  if (status === 'locked') {
    return {
      ...styles.blob,
      ...styles.locked,
    };
  }

  if (status === 'completed') {
    return {
      ...styles.blob,
      ...styles.completed,
      borderWidth: isPressed ? 2 : 0,
      borderColor: isPressed ? '#00000030' : 'transparent',
    };
  }

  const phaseShadowColor = {
    menstruation: Colors.menlight,
    follicular: Colors.follight,
    ovulation: Colors.ovulight,
    luteal: Colors.luteallight,
  };

  const phaseBgColor = {
    menstruation: Colors.mendark,
    follicular: Colors.foldark,
    ovulation: Colors.ovudark,
    luteal: Colors.lutealdark,
  };

  return {
    ...styles.blob,
    backgroundColor: phaseBgColor[phase],
    shadowColor: phaseShadowColor[phase],
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: isPressed ? 2 : 0,
    borderColor: isPressed ? '#00000030' : 'transparent',
  };
};

  const renderIcon = typeof icon === 'string'
    ? <Text style={styles.icon}>{icon}</Text>
    : icon;

  return (
    <View style={styles.container}>
      <View
        style={getBlobStyle()}
        onStartShouldSetResponder={() => {
          if (status !== 'locked') setIsPressed(true);
          return false;
        }}
        onResponderRelease={() => setIsPressed(false)}
      >
        {renderIcon}
      </View>
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
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  locked: {
    backgroundColor: "#D1D5DB",
    borderWidth: 2,
    borderColor: "#9CA3AF",
    shadowColor: "#6B7280",
  },
  completed: {
    backgroundColor: Colors.comdark,
    shadowColor: Colors.comlight,
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
