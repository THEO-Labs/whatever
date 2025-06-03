import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <View style={[styles.blob, statusStyle[status]]}>
        <Text style={styles.icon}>{icon}</Text>
        {overlayIcon[status] && (
          <View style={styles.overlay}>
            {overlayIcon[status]}
          </View>
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 4,
  },
  blob: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  locked: {
    backgroundColor: "#e5e7eb",
  },
  inProgress: {
    backgroundColor: "#fef9c3",
  },
  completed: {
    backgroundColor: "#bbf7d0",
  },
  icon: {
    fontSize: 28,
  },
  overlay: {
    position: "absolute",
    bottom: -6,
    right: -6,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    color: "#4b5563",
  },
});