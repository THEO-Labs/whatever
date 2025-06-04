import React, { useRef, useEffect, useState } from 'react';
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
import { DayPlan } from '../assets/trainingPlan';
import { trainingPlan } from '../assets/trainingPlan';
import { LearningModal } from './LearningModal';

/* ---------- small divider component -------------------------------- */
const PhaseDivider = ({
                        label,
                        phase,
                      }: {
  label: string;
  phase: RowBlob['phase'];
}) => (
  <View
    style={[
      lpStyles.dividerOuter,
      { backgroundColor: phaseColors[phase].bg },
    ]}
  >
    <Text
      style={[
        lpStyles.dividerText,
        { color: phaseColors[phase].text },
      ]}
    >
      {label}
    </Text>
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
const phases = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];

const phaseColors: Record<RowBlob['phase'], { bg: string; text: string }> = {
  Menstruation: { bg: Colors.mendark,   text: Colors.menlight },
  Follicular:   { bg: Colors.follight,   text: Colors.foldark },
  Ovulation:    { bg: Colors.ovudark,   text: Colors.ovulight },
  Luteal:       { bg: Colors.luteallight, text: Colors.lutealdark },
};


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

  /* one phase spans seven rows → use that to drive colour cross‑fade */
  const PHASE_H = ITEM_H * 7;
  const TRANSITION = 60;          // px overlap for a soft blend

  const scrollY = useRef(new Animated.Value(0)).current;
  const bgColor = scrollY.interpolate({
    inputRange: [
      0,
      PHASE_H - TRANSITION,
      PHASE_H + TRANSITION,
      2 * PHASE_H - TRANSITION,
      2 * PHASE_H + TRANSITION,
      3 * PHASE_H - TRANSITION,
      3 * PHASE_H + TRANSITION,
      4 * PHASE_H,
    ],
    outputRange: [
      phaseColors.Menstruation.bg,
      phaseColors.Menstruation.bg,
      phaseColors.Follicular.bg,
      phaseColors.Follicular.bg,
      phaseColors.Ovulation.bg,
      phaseColors.Ovulation.bg,
      phaseColors.Luteal.bg,
      phaseColors.Luteal.bg,
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
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor, opacity: 0.1 }]} />
      <Animated.FlatList
        ref={flatListRef}
        data={rows}
        keyExtractor={(row) => String(row.id)}
        contentContainerStyle={[lpStyles.container, { paddingTop: 280 }]}
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
            return (
              <PhaseDivider
                label={`${item.phase} Phase`}
                phase={item.phase}
              />
            );
          }

          return (
            <View
                style={{
                    width: 100,
                    alignItems: 'center',
                    marginVertical: 12,
                    alignSelf: 'center',
                    transform: [{ translateX: waveX(index, AMP, PERIOD) }],
                }}
                >
                <LearningPathBlob
                    status={item.status}
                    phase={item.phase.toLowerCase()}
                    icon={item.icon}
                    label={item.label}
                    onPress={() => {
                    const dayPlan = trainingPlan.find(p => p.day === item.id) || null;
                    if (dayPlan && item.status !== 'locked') {
                        setSelectedPlan(dayPlan);
                        setModalVisible(true);
                    }
                    }}
            />
    </View>
          );
        }}
      />
      <LearningModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        dayPlan={selectedPlan}

      />
      {/* Show popup only if showPopup is true */}

    </View>
  );
};

/* ---------- helpers ------------------------------------------------- */
const waveX = (idx: number, amp: number, per: number) =>
  amp * Math.sin((2 * Math.PI * idx) / per);

/* ---------- styles -------------------------------------------------- */
const lpStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
},
  dividerOuter: {
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginVertical: 30,
    borderRadius: 30,
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
