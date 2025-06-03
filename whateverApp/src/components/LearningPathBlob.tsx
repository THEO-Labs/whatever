import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from '../design/colors';


interface LearningPathBlobProps {
  status: 'locked' | 'in-progress' | 'completed';
  icon: React.ReactNode | string;
  label?: string;
  onPress?: () => void;
}

export const LearningPathBlob: React.FC<LearningPathBlobProps> = ({
  status,
  icon,
  label,
  onPress,
}) => {
  const statusStyle = {
    locked: styles.locked,
    "in-progress": styles.inProgress,
    completed: styles.completed,
  };

  

  const renderIcon = typeof icon === 'string'
    ? <Text style={styles.icon}>{icon}</Text>
    : icon;

  return (
    <Pressable onPress={onPress} disabled={status === 'locked'}>
      <View style={styles.container}>
        <View style={[styles.blob, statusStyle[status]]}>
          {renderIcon}
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </Pressable>

  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  blob: {
    width: 100,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowOffset: { width: 5, height: 5 },
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
  inProgress: {
    backgroundColor: Colors.red,
    borderWidth: 2,
    borderColor: "#B91C1C",
    shadowColor: "#991B1B",

  },
  completed: {
    backgroundColor: Colors.lime,
    borderWidth: 2,
    borderColor: "#A8D13B",
    shadowColor: "#7C9E2D",
  },
  icon: {
    fontSize: 32,
  },
 
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
});