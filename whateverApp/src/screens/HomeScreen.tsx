import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ActivityCircle} from '../components/whoopCircles.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const [steps, setSteps] = useState<number>(0);
  const [activityScore, setActivityScore] = useState<number>(0);
  const [restScore, setRestScore] = useState<number>(0);

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
        console.warn('Fehler beim Laden der Schritte:', e);
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
        console.warn('Fehler beim Laden der Aktivitäts-Scores:', e);
      }
    };

    // Initial laden
    getActivityScores();
    loadSteps();

    // Automatisch alle 15 Sekunden neu laden
    const interval = setInterval(() => {
      getActivityScores();
      loadSteps();
    }, 15_000);

    // Aufräumen beim Verlassen
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <ActivityCircle
          value={activityScore}
          max={100}
          label="Activityscore"
          color="#84B3DC"
        />
        <ActivityCircle value={restScore} max={100} label="Rest" color="#00D46F" />
        <ActivityCircle
          value={steps}
          max={10000}
          label="Steps"
          color="#3F85E2"
        />
      </View>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}
