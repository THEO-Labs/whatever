import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { LearningPathBlob } from './LearningPathBlob';
import { LockIcon, BookIcon, CheckIcon } from '../components/LessonIcons';

/* ------------------------------------------------------------------ */
/* ❑  Types                                                           */
/* ------------------------------------------------------------------ */
type LessonStatus = 'locked' | 'in-progress' | 'completed';

interface Lesson {
  id: number;
  date: string;
  label: string;
  icon: React.ReactNode;
  status: LessonStatus;
}

/* ------------------------------------------------------------------ */
/* ❑  Helper: build chronological lessons                             */
/* ------------------------------------------------------------------ */
const generateChronologicalLessons = (
  pastDays: number,
  futureDays: number,
): Lesson[] => {
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

/* ------------------------------------------------------------------ */
/* ❑  Wave helper                                                     */
/* ------------------------------------------------------------------ */
const waveOffset = (index: number, amplitude: number, period: number) =>
  amplitude * Math.sin((2 * Math.PI * index) / period);

/* ------------------------------------------------------------------ */
/* ❑  Data                                                            */
/* ------------------------------------------------------------------ */
const lessons = generateChronologicalLessons(89, 1); // 89 past + today + 1 future

/* ------------------------------------------------------------------ */
/* ❑  Component                                                       */
/* ------------------------------------------------------------------ */
export const LearningPath = () => {
  /* tweak these two numbers for a tighter/looser meander */
  const AMPLITUDE = 80; // px left ⟷ right from the centre line
  const PERIOD = 8;     // items per full sine wave

  return (
    <FlatList
      data={lessons}            /* ordered oldest → future            */
      inverted                  /* renders bottom-up (today near bottom) */
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => {
        const shiftX = waveOffset(index, AMPLITUDE, PERIOD);

        return (
          <View style={[styles.blobWrapper, { transform: [{ translateX: shiftX }] }]}>
            <LearningPathBlob
              status={item.status}
              icon={item.icon}
              label={item.label}
            />
          </View>
        );
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/* ❑  Styles                                                          */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 6,
  },
  blobWrapper: {
    alignSelf: 'center',   // base position: horizontal centre
    width: '75%',          // blob width
    marginVertical: 10,
  },
});
