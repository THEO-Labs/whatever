import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LearningPathBlob } from './LearningPathBlob';
import Colors from '../design/colors';

const lessons = [
  { id: 1, icon: '🔒', label: '1', status: 'locked' },         // top
  { id: 2, icon: '📘', label: '2', status: 'in-progress' },    // below
  { id: 3, icon: '✅', label: '3', status: 'completed' },
  { id: 4, icon: '✅', label: '4', status: 'completed' },
  { id: 5, icon: '✅', label: '5', status: 'completed' },
  { id: 6, icon: '✅', label: '6', status: 'completed' },
  { id: 7, icon: '✅', label: '7', status: 'completed' },
];

export const LearningPath = () => {
  return (
    <View style={styles.container}>
      {lessons.map((lesson, index) => (
        <View
          key={lesson.id}
          style={[
            styles.blobWrapper,
            index % 2 === 0 ? styles.left : styles.right,
          ]}
        >
          <LearningPathBlob
            status={lesson.status}
            icon={lesson.icon}
            label={lesson.label}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.weed,
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  blobWrapper: {
    width: '60%',
  },
  left: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  right: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});