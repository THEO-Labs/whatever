import React, {useEffect, useState} from 'react';
import {TrackerManager} from '../utils/BackgroundTracker';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityCircle} from './whoopCircles';
import Colors from '../design/colors';
import {ArrowLeft, User} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useActivity} from '../utils/ActivityContext.tsx';

export const CustomHeader = ({ currentRoute, navigationRef }: { currentRoute?: string; navigationRef: any }) => {
  const onboardingScreens = ['Step1', 'Step2', 'Step3', 'Step4', 'Step5', 'Step6', 'Step7'];

  // ✅ Hooks immer unconditionally oben aufrufen
  const [focus, setFocus] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [steps, setSteps] = useState(0);
  const {activity} = useActivity();
  const isActive = activity === 'active';

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

  useEffect(() => {
    console.log(`[CustomHeader] Activity state changed: ${activity}`);
  }, [isActive]);

  const goBackOrProfile = () => {
    if (currentRoute === 'Profile') {
      navigationRef.navigate('Home');
    } else {
      navigationRef.navigate('Profile');
    }
  };

  // ✅ Danach render decision treffen
  if (currentRoute && onboardingScreens.includes(currentRoute)) {
    return null; // topbar ausblenden
  }

  return (
    <>
      <View style={styles.topBarContainer}>
        <LinearGradient
          colors={['#ffffff', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0)']}
          style={styles.topBarSolid}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <LinearGradient
          colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.99)', 'rgba(255,255,255,0)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          {currentRoute === 'Profile' ? (
            <TouchableOpacity onPress={goBackOrProfile} style={styles.topIconLeft}>
              <ArrowLeft color={Colors.green} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={goBackOrProfile} style={styles.topIconRight}>
              <User color={Colors.green} />
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>

      {currentRoute === 'Home' && (
        <View style={styles.header}>
          <TrackerManager />
          <View style={styles.circles}>
            <ActivityCircle value={focus} max={100} label="Rest" color={Colors.lime} blink={!isActive}/>
            <ActivityCircle value={energy} max={100} label="Activity" color={Colors.red} blink={isActive}/>
            <ActivityCircle value={steps} max={10000} label="Steps" color={Colors.lime} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 1001,
    justifyContent: 'center',
  },
  topBarSolid: {
    ...StyleSheet.absoluteFillObject,
  },
  topIconLeft: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  topIconRight: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  header: {
    position: 'absolute',
    top: 90,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,1.0)',
    borderRadius: 16,
    zIndex: 1000,
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
