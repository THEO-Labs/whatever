import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { LearningPathBlob } from './LearningPathBlob';
import Colors from '../design/colors';

type LessonStatus = 'locked' | 'in-progress' | 'completed';

interface Lesson {
  id: number;
  label: string;
  icon: React.ReactNode | string;
  status: LessonStatus;
}

// Generate 28 lessons for example
const lessons: Lesson[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 1,
  label: `${i + 1}`,
  icon: i === 0 ? '🔒' : i === 1 ? '📘' : '✅',
  status: i === 0 ? 'locked' : i === 1 ? 'in-progress' : 'completed',
}));

export const LearningPath = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {lessons.map((lesson, index) => (
        <View
            key={lesson.id}
            style={[
                styles.blobWrapper,
                {
                marginLeft: index % 2 === 0
                    ? 20 + Math.floor(Math.random() * 70) // 20–29 px
                    : undefined,
                marginRight: index % 2 !== 0
                    ? 20 + Math.floor(Math.random() * 70) // 20–29 px
                    : undefined,
                alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                },
            ]}
        >
          <LearningPathBlob
            status={lesson.status}
            icon={lesson.icon}
            label={lesson.label}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.weed,
    paddingBottom: 10,
  },
  blobWrapper: {
    height: '4%', // 100% / 7 = one-seventh of screen height
    justifyContent: 'center',
    width: '75%',
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