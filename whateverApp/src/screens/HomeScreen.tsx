import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PoseEstimation from '../components/PoseEstimation';

export default function HomeScreen() {
  const [poseVisible, setPoseVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      {!poseVisible && (
        <TouchableOpacity
          style={styles.openPoseButton}
          onPress={() => setPoseVisible(true)}>
          <Text style={styles.openPoseText}>Open Pose</Text>
        </TouchableOpacity>
      )}

      <PoseEstimation
        visible={poseVisible}
        onRequestClose={() => setPoseVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, textAlign: 'center', marginVertical: 20 },
  openPoseButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    padding: 12,
    backgroundColor: 'lime',
    borderRadius: 8,
  },
  openPoseText: { color: '#fff', fontWeight: '600' },
});
