import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { LearningPathBlob } from './LearningPathBlob';
import { LockIcon, BookIcon, CheckIcon } from '../components/LessonIcons';

type LessonStatus = 'locked' | 'in-progress' | 'completed';

interface Lesson {
  id: number;
  date: string;
  label: string;
  icon: React.ReactNode;
  status: LessonStatus;
}

const generateChronologicalLessons = (pastDays: number, futureDays: number): Lesson[] => {
  const today = new Date();

  return Array.from({ length: pastDays + 1 + futureDays }, (_, i) => {
    const dayOffset = i - pastDays;
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);

    const label = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    let status: LessonStatus = 'locked';
    let icon: React.ReactNode = <LockIcon />;

    if (dayOffset < 0) {
      status = 'completed';
      icon = <CheckIcon />;
    } else if (dayOffset === 0) {
      status = 'in-progress';
      icon = <BookIcon />;
    }

    return {
      id: i + 1,
      date: date.toISOString(),
      label,
      icon,
      status,
    };
  });
};

const lessons = generateChronologicalLessons(89, 1); // 89 past, today, 1 future

export const LearningPath = () => {
  return (
    <FlatList
      data={lessons}               // ordered oldest → future
      inverted                     // render from bottom up
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <View
          style={[
            styles.blobWrapper,
            {
              marginLeft: index % 2 === 0 ? 40 : undefined,
              marginRight: index % 2 !== 0 ? 40 : undefined,
              alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
            },
          ]}
        >
          <LearningPathBlob
            status={item.status}
            icon={item.icon}
            label={item.label}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 20,
  },
  blobWrapper: {
    marginVertical: 10,
    width: '75%',
    justifyContent: 'center',
  },
});