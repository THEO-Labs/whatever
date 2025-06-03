import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {LearningPathBlob} from '../components/LearningPathBlob';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const blobs = [
  {icon: '🔤', label: 'Intro', status: 'completed'},
  {icon: '📚', label: 'Basics', status: 'completed'},
  {icon: '🧠', label: 'Memory', status: 'in-progress'},
  {icon: '🗣️', label: 'Speaking', status: 'locked'},
  {icon: '📝', label: 'Writing', status: 'locked'},
];

export default function HomeScreen({navigation}: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.profileButton}>
        <Text style={styles.profileText}>Profile</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Learning Path</Text>
      <View style={styles.path}>
        {blobs.map((blob, index) => (
          <View key={index} style={styles.blobWrapper}>
            <LearningPathBlob
              icon={blob.icon}
              label={blob.label}
              status={blob.status as any}
            />
            {index < blobs.length - 1 && <View style={styles.connector} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    paddingBottom: 100,
  },
  profileButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 10,
  },
  profileText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
  },
  path: {
    alignItems: 'center',
  },
  blobWrapper: {
    alignItems: 'center',
  },
  connector: {
    width: 4,
    height: 40,
    backgroundColor: '#ccc',
    marginVertical: 6,
  },
});