import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ActivityCircle } from './whoopCircles';
import Colors from '../design/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserIcon = () => <View><Text style={{fontSize: 24}}>👤</Text></View>;
const BackIcon = () => <View><Text style={{fontSize: 24}}>⬅️</Text></View>;

export const CustomHeader: React.FC = () => {
  const [steps, setSteps] = useState<number>(0);
  const [activityScore, setActivityScore] = useState<number>(0);
  const [restScore, setRestScore] = useState<number>(0);

  const navigation = useNavigation<any>();
  const currentRoute = navigation?.getState()?.routes?.[navigation.getState().index]?.name ?? '';

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const bufferRaw = await AsyncStorage.getItem('trackBuffer');
        const buffer = JSON.parse(bufferRaw || '[]');
        const today = new Date().toISOString().split('T')[0];
        let total = 0;

        for (const e of buffer) {
          if (
            e.type === 'steps' &&
            new Date(e.timestamp).toISOString().startsWith(today)
          ) {
            total += e.data?.steps ?? 0;
          }
        }

        setSteps(total);
      } catch (e) {
        console.warn('[CustomHeader] Error loading steps:', e);
      }
    };

    const getActivityScores = async () => {
      try {
        const rawScores = await AsyncStorage.getItem('dailyActivityScores');
        const parsed = JSON.parse(rawScores || '{}');
        const today = new Date().toISOString().split('T')[0];
        setActivityScore(parsed[today]?.activityScore ?? 0);
        setRestScore(parsed[today]?.restScore ?? 0);
      } catch (e) {
        console.warn('[CustomHeader] Error loading scores:', e);
      }
    };

    loadSteps();
    getActivityScores();

    const interval = setInterval(() => {
      loadSteps();
      getActivityScores();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          if (currentRoute === 'Profile') {
            navigation.navigate('Home' as never);
          } else {
            navigation.navigate('Profile');
          }
        }}
        style={styles.profileIcon}
      >
        {currentRoute === 'Profile' ? (
          <BackIcon />
        ) : (
          <UserIcon />
        )}
      </TouchableOpacity>
      <View style={styles.circles}>
        <ActivityCircle value={activityScore} max={100} label="Activity" color={Colors.lime} />
        <ActivityCircle value={restScore} max={100} label="Rest" color={Colors.red} />
        <ActivityCircle value={steps} max={10000} label="Steps" color={Colors.green} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.weed,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: Colors.green,
  },
  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileIcon: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
  },
});