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

  const overlayIcon = {
    locked: <Text style={{ fontSize: 18 }}>🔒</Text>,
    "in-progress": null,
    completed: <Text style={{ fontSize: 18 }}>✔️</Text>,
  };

  const renderIcon = typeof icon === 'string'
    ? <Text style={styles.icon}>{icon}</Text>
    : icon;

  return (
    <Pressable onPress={onPress} disabled={status === 'locked'}>
      <View style={styles.container}>
        <View style={[styles.blob, statusStyle[status]]}>
          {renderIcon}
          {overlayIcon[status] && (
            <View style={styles.overlay}>
              {overlayIcon[status]}
            </View>
          )}
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
    shadowColor: "#FCA5A5",
    shadowOffset: { width: 10, height: -5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
  },

  locked: {
    backgroundColor: '#E5E7EB', 
  },
  inProgress: {
    backgroundColor: Colors.raspberry,
    borderWidth: 2,
    borderColor: Colors.red,
  },
  completed: {
    backgroundColor: '#BBF7D0', 
  },
  icon: {
    fontSize: 32,
  },
  overlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  overlayEmoji: {
    fontSize: 16,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
});