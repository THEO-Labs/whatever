import React from 'react';
import { View, StyleSheet } from 'react-native';
import {LearningPath} from '../components/LearningPath';
import {TrackerManager} from '../utils/BackgroundTracker.ts';

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <TrackerManager />
      <LearningPath />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,               // ← critical
    backgroundColor: '#fff'/* or leave transparent if gradient covers */,
  },
});

