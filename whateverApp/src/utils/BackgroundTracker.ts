import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeEventEmitter, NativeModules} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {useActivity} from './ActivityContext.tsx';

const {PedometerModule} = NativeModules;

export const TrackerManager: React.FC = () => {
  const {setActivity} = useActivity();

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
        const type = event.activity;
        console.log('[TrackerManager] ActivityUpdate received:', type);
        if (
            (type === 'walking' || type === 'running' || type === 'cycling' || type === 'unknown')
        ) {
          setActivity('active');
        } else {
          setActivity('rest');
        }


        await saveToBuffer({
          type: 'native-activity',
          data: event,
          timestamp: Date.now(),
        });
      },
    );
    return () => {
      BackgroundGeolocation.removeAllListeners();
      activityListener.remove();
    };
  }, []);

  return null;
};

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
