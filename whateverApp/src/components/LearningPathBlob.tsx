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
  onPress,
}) => {
/*   const [isPressed, setIsPressed] = useState(false);
 */  const getBlobStyle = (pressed: boolean) => {
  if (status === 'locked') {
    return {
      ...styles.blob,
      backgroundColor: Colors.comdark,
      shadowColor: Colors.comlight,
    };
  }

  if (status === 'completed') {
    const completedBgColor = {
      menstruation: Colors.mendark,
      follicular: Colors.foldark,
      ovulation: Colors.ovudark,
      luteal: Colors.lutealdark,
    };

    const completedShadowColor = {
      menstruation: Colors.menlight,
      follicular: Colors.follight,
      ovulation: Colors.ovulight,
      luteal: Colors.luteallight,
    };

    return {
      ...styles.blob,
      backgroundColor: pressed ? '#E6E9DC' : completedBgColor[phase] || '#ccc',
      shadowColor: completedShadowColor[phase],
      shadowOffset: { width: 0, height: 7 },
      shadowOpacity: 1,
      shadowRadius: 6,
      elevation: 5,
    };
  }

  // For in-progress
  return {
    ...styles.blob,
    backgroundColor: Colors.mendark,
    shadowColor: Colors.menlight,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
  };
};



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

 

  const renderIcon = typeof icon === 'string'
    ? <Text style={styles.icon}>{icon}</Text>
    : icon;

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
