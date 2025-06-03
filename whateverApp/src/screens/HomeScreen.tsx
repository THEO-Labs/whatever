import React from 'react';
import {View} from 'react-native';
import {LearningPath} from '../components/LearningPath';
import {TrackerManager} from '../utils/BackgroundTracker.ts';

export default function HomeScreen() {
  return (
    <View>
      <TrackerManager />
      <LearningPath />
    </View>
  );
}
