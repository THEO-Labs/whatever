import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Colors from '../design/colors';
import { DayPlan } from '../assets/trainingPlan';

interface LearningModalProps {
  visible: boolean;
  onRequestClose: () => void;
  dayPlan: DayPlan | null;
}

export const LearningModal: React.FC<LearningModalProps> = ({
                                                              visible,
                                                              onRequestClose,
                                                              dayPlan,
                                                            }) => {
  if (!dayPlan) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onRequestClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.heading}>
            Day {dayPlan.day}: {dayPlan.heading}
          </Text>

          <ScrollView style={styles.content}>
            {dayPlan.bullets.map((b, i) => (
              <View key={i} style={styles.bulletRow}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{b}</Text>
              </View>
            ))}

            {dayPlan.details ? (
              <>
                <Text style={styles.detailsTitle}>Details:</Text>
                <Text style={styles.detailsText}>{dayPlan.details}</Text>
              </>
            ) : null}
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={onRequestClose}>
            <Text style={styles.buttonText}>Let’s Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.red,
    marginBottom: 12,
  },
  content: {
    flexGrow: 0,
    marginBottom: 20,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.red,
    marginTop: 6,
    marginRight: 8,
  },
  bulletText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  detailsTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  detailsText: {
    marginTop: 4,
    fontSize: 15,
    color: '#444',
    lineHeight: 20,
  },
  button: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: Colors.red,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
