import AsyncStorage from '@react-native-async-storage/async-storage';

const activityWeights: Record<string, number> = {
  walking: 2,
  running: 3,
  cycling: 2.5,
  automotive: 0.5,
  stationary: 0.01,
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
  Record<string, number>
> => {
  try {
    const raw = await AsyncStorage.getItem('trackBuffer');
    const events = JSON.parse(raw || '[]');

    const dailyScores: Record<string, number> = {};

    for (const e of events) {
      if (e.type !== 'native-activity') continue;

      const date = formatDate(e.timestamp);
      const activity = e.data?.activity ?? 'unknown';
      const confidence = e.data?.confidence ?? 'medium';

      const base = activityWeights[activity] ?? 0;
      const factor = confidenceWeights[confidence] ?? 1;

      dailyScores[date] = (dailyScores[date] || 0) + base * factor;
    }

    // Normalisieren auf Skala 0–100 mit Nachkommastellen
    const normalizedScores: Record<string, number> = {};
    for (const date in dailyScores) {
      const rawScore = dailyScores[date];
      const normalized = (rawScore / 30) * 100;
      normalizedScores[date] = Math.min(parseFloat(normalized.toFixed(2)), 100);
    }

    await AsyncStorage.setItem(
      'dailyActivityScores',
      JSON.stringify(normalizedScores),
    );

    return normalizedScores;
  } catch (err) {
    console.warn('Fehler beim Berechnen der Aktivitäts-Scores:', err);
    return {};
  }
};
