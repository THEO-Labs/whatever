import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://via.placeholder.com/120'}}
        style={styles.avatar}
      />
      <Text style={styles.name}>Max Mustermann</Text>
      <Text style={styles.email}>max@example.com</Text>

      <View style={styles.section}>
        <Button title="Bearbeiten" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Button title="Abmelden" onPress={() => {}} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 24,
  },
  section: {
    width: '80%',
    marginTop: 12,
  },
});
