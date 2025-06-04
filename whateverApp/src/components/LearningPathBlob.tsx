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
  inProgress: {
    backgroundColor: "#F44336",
    shadowColor: "#FF8A80",

  },
  completed: {
    backgroundColor: "#D4FC3F",
    shadowColor: "#A4C600",
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
