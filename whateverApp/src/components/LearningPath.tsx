import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';

import { LearningPathBlob } from './LearningPathBlob';
import { LockIcon, BookIcon, CheckIcon } from '../components/LessonIcons';
import Colors from '../design/colors';

/* ---------- small divider component -------------------------------- */
const PhaseDivider = ({ label }: { label: string }) => (
  <View style={styles.dividerOuter}>
    <Text style={styles.dividerText}>{label}</Text>
  </View>
);



/* ---------- types --------------------------------------------------- */
type Status = 'locked' | 'in-progress' | 'completed';
interface RowBlob {
  kind: 'blob';
  id: number;
  label: string;
  icon: React.ReactNode;
  status: Status;
  phase: 'Menstruation' | 'Follicular' | 'Ovulation' | 'Luteal';

}
interface RowDivider {
  kind: 'divider';
  id: number;
  phase: string;
}
type Row = RowBlob | RowDivider;

/* ---------- phases -------------------------------------------------- */
const phases = ['Menstruation', 'Follicular', 'Ovulation', 'Luteal'];

/* ---------- build 28 lessons + 4 dividers --------------------------- */
const rows: Row[] = (() => {
  const today = new Date();
  const arr: Row[] = [];

  phases.forEach((phase, phaseIdx) => {
    arr.push({ kind: 'divider', id: phaseIdx * 1000, phase }); // divider id >= 1000
    for (let i = 0; i < 7; i++) {
      const globalIdx = phaseIdx * 7 + i;
      const offset = globalIdx - 27;
      const date = new Date(today);
      date.setDate(today.getDate() + offset);
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      let status: Status = 'locked';
      let icon: React.ReactNode = <LockIcon />;
      if (offset < 0) { status = 'completed'; icon = <CheckIcon />; }
      else if (offset === 0) { status = 'in-progress'; icon = <BookIcon />; }

      arr.push({
        kind: 'blob',
        id: globalIdx + 1,
        label,
        icon,
        status,
        phase: phase.toLowerCase() as RowBlob['phase'],
        });
    }
  });
  return arr;
})();

/* ---------- scroll to beginning when loaded -------------------------------- */

const flatListRef = useRef<FlatList>(null);

const todayIndex = rows.findIndex(
  (item) => item.kind === 'blob' && item.status === 'in-progress'
);

useEffect(() => {
  const timeout = setTimeout(() => {
    if (todayIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ 
        index: todayIndex, 
        animated: false,
       });
    }
  }, 100); // wait for layout

  return () => clearTimeout(timeout);
}, []);



/* ---------- helpers ------------------------------------------------- */
const waveX = (idx: number, amp: number, per: number) =>
  amp * Math.sin((2 * Math.PI * idx) / per);

/* ---------- main component ----------------------------------------- */
export const LearningPath = () => {
  const { width } = useWindowDimensions();
  const AMP = width * 0.25;
  const PERIOD = 8;

  const ITEM_H = 110;
  const TOTAL_H = ITEM_H * rows.length;
  const Q = TOTAL_H / 4;
  const F = 40;

  const scrollY = useRef(new Animated.Value(0)).current;
  const bgColor = scrollY.interpolate({
    inputRange: [0, Q - F, Q + F, 2 * Q - F, 2 * Q + F, 3 * Q - F, 3 * Q + F, TOTAL_H],
    outputRange: [
      Colors.raspberry, Colors.raspberry,
      Colors.weed,      Colors.weed,
      Colors.green,     Colors.green,
      Colors.red,       Colors.red,
    ],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor, opacity: 0.3 }]} />
      <Animated.FlatList
        ref={flatListRef}
        data={rows}
        inverted
        keyExtractor={(row) => String(row.id)}
        contentContainerStyle={[styles.container, { paddingBottom: 280 }]}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        getItemLayout={(_, index) => ({
            length: 110,
            offset: 110 * index,
            index,
        })}
        renderItem={({ item, index }) => {
          if (item.kind === 'divider') {
            return <PhaseDivider label={`${item.phase} Phase`} />;
          }

          return (
            <View
              style={[
                styles.blobWrapper,
                { transform: [{ translateX: waveX(index, AMP, PERIOD) }] },
              ]}
            >
              <LearningPathBlob
                status={item.status}
                phase={item.phase}
                icon={item.icon}
                label={item.label}
                />
            </View>
          );
        }}
      />
    </View>
  );
};

/* ---------- styles -------------------------------------------------- */
const styles = StyleSheet.create({
  container: { 
    paddingVertical: 12,
},

  blobWrapper: {
    alignSelf: 'center',
    width: '70%',
    marginVertical: 12,
  },
  dividerOuter: {
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginVertical: 30,
    borderRadius: 40,
    backgroundColor: Colors.red,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  dividerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
