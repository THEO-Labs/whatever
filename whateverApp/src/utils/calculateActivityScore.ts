import AsyncStorage from '@react-native-async-storage/async-storage';

const activityWeights: Record<string, number> = {
  walking: 1,
  running: 2,
  cycling: 1.5,
  automotive: 0.3,
  stationary: 0,
  unknown: 0,
};

const restWeights: Record<string, number> = {
  stationary: 1,
  walking: -0.5,
  running: -1,
  cycling: -0.8,
  automotive: 0.3,
  unknown: 0,
};

const confidenceWeights: Record<string, number> = {
  low: 0.5,
  medium: 1.0,
  high: 1.5,
};

function formatDate(timestamp: number): string {
  return new Date(timestamp).toISOString().split('T')[0];
}

export const calculateDailyActivityScores = async (): Promise<
  Record<string, { activityScore: number; restScore: number }>
> => {
  try {
    const raw = await AsyncStorage.getItem('trackBuffer');
    const events = JSON.parse(raw || '[]')
      .filter((e: any) => e.type === 'native-activity')
      .sort((a: any, b: any) => a.timestamp - b.timestamp);
    console.log('Alle Events geladen:', events.length);
    const scores: Record<
      string,
      {
        activeTime: number;
        restTime: number;
      }
    > = {};

    for (let i = 0; i < events.length - 1; i++) {
      const curr = events[i];
      const next = events[i + 1];

      const durationMin = Math.min((next.timestamp - curr.timestamp) / 60000, 30); // max 30min window
      const date = formatDate(curr.timestamp);
      const activity = curr.data?.activity ?? 'unknown';
      const confidence = curr.data?.confidence ?? 'medium';

      const activityWeight = activityWeights[activity] ?? 0;
      const restWeight = restWeights[activity] ?? 0;
      const confidenceFactor = confidenceWeights[confidence] ?? 1;

      const weightedActive = durationMin * activityWeight * confidenceFactor;
      const weightedRest = durationMin * restWeight * confidenceFactor;

      if (!scores[date]) {
        scores[date] = { activeTime: 0, restTime: 0 };
      }

      scores[date].activeTime += weightedActive;
      scores[date].restTime += weightedRest;
    }

    const normalized: Record<
      string,
      {
        activityScore: number;
        restScore: number;
      }
    > = {};

    for (const date in scores) {
      const { activeTime, restTime } = scores[date];
      const activityScore = Math.min(parseFloat(((activeTime / 240) * 100).toFixed(2)), 100); // z.B. max 4h aktiv
      const restScore = Math.min(Math.max(parseFloat(((restTime / 180) * 100).toFixed(2)), 0), 100); // z.B. max 3h rest
      normalized[date] = { activityScore, restScore };
    }

    await AsyncStorage.setItem('dailyActivityScores', JSON.stringify(normalized));

    return normalized;
  } catch (err) {
    console.warn('Fehler beim Berechnen der Scores:', err);
    return {};
  }
};
