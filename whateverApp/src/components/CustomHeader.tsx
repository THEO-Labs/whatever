// CustomHeader.tsx
import React, {useEffect, useState} from 'react';
import {TrackerManager} from '../utils/BackgroundTracker';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ActivityCircle} from './whoopCircles';
import Colors from '../design/colors';
import {ArrowLeft, User} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomHeader = ({ currentRoute, navigationRef }: { currentRoute?: string; navigationRef: any }) => {
  const [focus, setFocus] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const raw = await AsyncStorage.getItem('dailyActivityScores');
        const todayScores2 = await AsyncStorage.getItem('todayScores');
        const todayScores2Raw = JSON.parse(todayScores2 || '{}');
        const scores = JSON.parse(raw || '{}');
        const today = new Date().toISOString().split('T')[0];
        const todayScores = scores[today] || {};
        setFocus(todayScores.restScore ?? 0);
        setEnergy(todayScores.activityScore ?? 0);
        setSteps(todayScores2Raw.steps?.steps ?? 0);
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
      {currentRoute === 'Profile' ? (
        <View style={styles.iconLeft}>
          <TouchableOpacity onPress={goBackOrProfile}>
            <ArrowLeft color={Colors.green} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.iconRight}>
          <TouchableOpacity onPress={goBackOrProfile}>
            <User color={Colors.green} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.circles}>
        <ActivityCircle value={focus} max={100} label="Rest" color={Colors.lime} />
        <ActivityCircle value={energy} max={100} label="Activity" color={Colors.red} />
        <ActivityCircle value={steps} max={10000} label="Steps" color={Colors.lime}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 2,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
  },
  iconLeft: {
    position: 'absolute',
    top: 55,
    left: 15,
    zIndex: 10,
  },
  iconRight: {
    position: 'absolute',
    top: 55,
    right: 15,
    zIndex: 10,
  },
  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 2,
  },
});
