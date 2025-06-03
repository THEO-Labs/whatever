// CustomHeader.tsx
import React, { useEffect, useState } from 'react';
import { TrackerManager } from '../utils/BackgroundTracker';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityCircle } from './whoopCircles';
import Colors from '../design/colors';
import { ArrowLeft, User } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomHeader = ({ currentRoute, navigationRef }: { currentRoute?: string; navigationRef: any }) => {
  const [focus, setFocus] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [mood, setMood] = useState(0);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const raw = await AsyncStorage.getItem('dailyActivityScores');
        const scores = JSON.parse(raw || '{}');
        const today = new Date().toISOString().split('T')[0];
        const todayScores = scores[today] || {};
        setFocus(todayScores.activityScore ?? 0);
        setEnergy(todayScores.restScore ?? 0);
        setMood(todayScores.steps ?? 0);
      } catch (e) {
        console.warn('[CustomHeader] Failed to load scores:', e);
      }
    };

    loadScores();
    const interval = setInterval(loadScores, 15000);
    return () => clearInterval(interval);
  }, []);

  const goBackOrProfile = () => {
    if (currentRoute === 'Profile') {
      navigationRef.navigate('Home');
    } else {
      navigationRef.navigate('Profile');
    }
  };

  return (
    <View style={styles.header}>
      <TrackerManager />
      <View style={styles.leftIcon}>
        <TouchableOpacity onPress={goBackOrProfile}>
          {currentRoute === 'Profile' ? <ArrowLeft color={Colors.green} /> : <User color={Colors.green} />}
        </TouchableOpacity>
      </View>
      <View style={styles.circles}>
        <ActivityCircle value={focus} max={100} label="Focus" color={Colors.lime} />
        <ActivityCircle value={energy} max={100} label="Energy" color={Colors.red} />
        <ActivityCircle value={mood} max={10000} label="Mood" color={Colors.green} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leftIcon: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 10,
  },
  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
