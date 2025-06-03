import React, {use, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ActivityCircle} from '../components/whoopCircles.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  const [steps, setSteps] = useState<number | null>(null);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const bufferRaw = await AsyncStorage.getItem('trackBuffer');
        const buffer = JSON.parse(bufferRaw || '[]');

        // Schritte des aktuellen Tages summieren
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

    loadSteps();
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <ActivityCircle value={80} max={100} label="Activityscore" color="#84B3DC" />
        <ActivityCircle value={86} max={100} label="Rest" color="#00D46F" />
        <ActivityCircle
          value={steps? steps : 0}
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
