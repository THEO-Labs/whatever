import AsyncStorage from '@react-native-async-storage/async-storage';

const activityWeights: Record<string, number> = {
  walking: 2,
  running: 3,
  cycling: 2.5,
  automotive: 0.5,
  stationary: 0.01,
  unknown: 0,
};

const restWeights: Record<string, number> = {
  stationary: 1.5,
  walking: -0.5,
  running: -1,
  cycling: -0.7,
  automotive: 0.2,
  unknown: 0,
};

const confidenceWeights: Record<string, number> = {
  low: 0.5,
  medium: 1.0,
  high: 1.5,
};

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

export const calculateDailyActivityScores = async (): Promise<
  Record<string, {activityScore: number; restScore: number}>
> => {
  try {
    const raw = await AsyncStorage.getItem('trackBuffer');
    const events = JSON.parse(raw || '[]');

    const dailyActivity: Record<string, number> = {};
    const dailyRest: Record<string, number> = {};

    for (const e of events) {
      if (e.type !== 'native-activity') continue;

      const date = formatDate(e.timestamp);
      const activity = e.data?.activity ?? 'unknown';
      const confidence = e.data?.confidence ?? 'medium';

      const activityBase = activityWeights[activity] ?? 0;
      const restBase = restWeights[activity] ?? 0;
      const factor = confidenceWeights[confidence] ?? 1;

      dailyActivity[date] = (dailyActivity[date] || 0) + activityBase * factor;
      dailyRest[date] = (dailyRest[date] || 0) + restBase * factor;
    }

    // Normalisieren
    const scores: Record<string, {activityScore: number; restScore: number}> =
      {};

    for (const date of Object.keys(dailyActivity)) {
      const rawActivity = dailyActivity[date];
      const rawRest = dailyRest[date];

      const activityScore = Math.min(
        parseFloat(((rawActivity / 30) * 100).toFixed(2)),
        100,
      );
      const restScore = Math.min(
        Math.max(parseFloat(((rawRest / 20) * 100).toFixed(2)), 0),
        100,
      );

      scores[date] = {
        activityScore,
        restScore,
      };
    }

    await AsyncStorage.setItem('dailyActivityScores', JSON.stringify(scores));

    return scores;
  } catch (err) {
    console.warn('Fehler beim Berechnen der Scores:', err);
    return {};
  }
};
