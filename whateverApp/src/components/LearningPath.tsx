import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import { LearningPathBlob } from './LearningPathBlob';
import { LockIcon, BookIcon, CheckIcon } from '../components/LessonIcons';
import Colors from '../design/colors';
import { DayPlan } from '../assets/trainingPlan';
import { trainingPlan } from '../assets/trainingPlan';
import { LearningModal } from './LearningModal';

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

/* ---------- transform trainingPlan into rows ----------------------- */
const buildRows = (): Row[] => {

  return trainingPlan.flatMap((d, idx) => {
    const phaseIdx = phases.indexOf(d.phase);
    const needDivider = idx % 7 === 0;
    const blob: RowBlob = {
      kind: 'blob',
      id: idx + 1,
      label: `Day ${d.day}`,
      icon: d.active ? (d.isToday ? <BookIcon/> : <CheckIcon/>) : <LockIcon/>,
      status: d.isToday ? 'in-progress' : d.active ? 'completed' : 'locked',
      phase: d.phase,
    };
    return needDivider
      ? [
          { kind: 'divider', id: 1000 + phaseIdx, phase: d.phase },
          blob,
        ]
      : [blob];
  });
};
const rows: Row[] = buildRows();

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

  const flatListRef = useRef<FlatList>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DayPlan | null>(null);

  useEffect(() => {
    const index = rows.findIndex(r => r.kind==='blob' && r.status==='in-progress');
    if (index !== -1 && flatListRef.current) {
      const timeout = setTimeout(() =>
        flatListRef.current?.scrollToIndex({ index, animated: false }), 100);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor, opacity: 0.3 }]} />
      <Animated.FlatList
        ref={flatListRef}
        data={rows}
        keyExtractor={(row) => String(row.id)}
        contentContainerStyle={[styles.container, { paddingTop: 280 }]}
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                const dayNumber = item.id;
                const dayPlan = trainingPlan.find(p => p.day === dayNumber) || null;
                if (dayPlan && item.status !== 'locked') {
                  setSelectedPlan(dayPlan);
                  setModalVisible(true);
                }
              }}
              disabled={item.status === 'locked'}
            >
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
            </TouchableOpacity>
          );
        }}
      />
      <LearningModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        dayPlan={selectedPlan}
      />
    </View>
  );
};

/* ---------- helpers ------------------------------------------------- */
const waveX = (idx: number, amp: number, per: number) =>
  amp * Math.sin((2 * Math.PI * idx) / per);

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
