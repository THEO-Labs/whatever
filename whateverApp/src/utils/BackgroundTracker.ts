import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeEventEmitter, NativeModules} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

const {PedometerModule} = NativeModules;

export const TrackerManager: React.FC = () => {
  useEffect(() => {
    if (!PedometerModule) {
      console.warn('[TrackerManager] PedometerModule is undefined. NativeEventEmitter cannot be initialized.');
      return;
    }

    try {
      PedometerModule.startActivityUpdates();
    } catch (e) {
      console.warn('[TrackerManager] startActivityUpdates failed:', e);
    }

    const pedometerEmitter = new NativeEventEmitter(PedometerModule);
    const activityListener = pedometerEmitter.addListener(
      'ActivityUpdate',
      async event => {
        console.log('[Native Activity]', event);
        await saveToBuffer({
          type: 'native-activity',
          data: event,
          timestamp: Date.now(),
        });
      },
    );

    // 3. BackgroundGeolocation Activity Listener
    BackgroundGeolocation.onActivityChange(async activity => {
      console.log('[Geolocation Activity]', activity);
      await saveToBuffer({
        type: 'geo-activity',
        data: activity,
        timestamp: Date.now(),
      });
    });

    // 4. Schrittzähler alle 60 Sek.
    const intervalMs = 60_000;
    const pedometerInterval = setInterval(async () => {
      const now = Date.now();
      const oneMinuteAgo = now - intervalMs;
      try {
        const steps = await PedometerModule.getStepsInRange(oneMinuteAgo, now);
        console.log('[Steps]', steps);
        await saveToBuffer({
          type: 'steps',
          data: steps,
          timestamp: now,
        });
      } catch (e) {
        console.warn('[Pedometer] Fehler beim Abrufen der Schritte:', e);
      }
    }, intervalMs);

    return () => {
      BackgroundGeolocation.removeAllListeners();
      activityListener.remove();
      clearInterval(pedometerInterval);
    };
  }, []);

  return null; // Unsichtbare Komponente
};

// 🔁 Buffer speichern
const saveToBuffer = async (event: object) => {
  try {
    const existing = await AsyncStorage.getItem('trackBuffer');
    const buffer = JSON.parse(existing || '[]');
    buffer.push(event);
    await AsyncStorage.setItem('trackBuffer', JSON.stringify(buffer));
  } catch (e) {
    console.warn('[TrackerManager] Fehler beim Schreiben in den Buffer:', e);
  }
};
