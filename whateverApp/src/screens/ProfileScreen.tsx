import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../design/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../images/avatar.png')}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.name}>Mia Zyra</Text>
      <Text style={styles.username}>@mzyra • Seit März 2024</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Follower</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addFriendButton}>
        <Text style={styles.addFriendText}>+ ADD FRIENDS</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Overvivew</Text>
      <View style={styles.overviewRow}>
        <View style={styles.overviewBox}>
          <Text style={styles.overviewValue}>0</Text>
          <Text style={styles.overviewLabel}>Streak-Days</Text>
        </View>
        <View style={styles.overviewBox}>
          <Text style={styles.overviewValue}>1478</Text>
          <Text style={styles.overviewLabel}>Overall XP</Text>
        </View>
      </View>
      <View style={styles.overviewRow}>
        <View style={styles.overviewBox}>
          <Text style={styles.overviewValue}>🥉</Text>
          <Text style={styles.overviewLabel}>Bronce League</Text>
        </View>
        <View style={styles.overviewBox}>
          <Text style={styles.overviewValue}>1</Text>
          <Text style={styles.overviewLabel}>Top 3</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.weed,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.green,
  },
  gearIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  gearText: {
    fontSize: 24,
    color: Colors.green,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.green,
    textAlign: 'center',
  },
  username: {
    fontSize: 14,
    color: Colors.green,
    textAlign: 'center',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.red,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.green,
  },
  addFriendButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 24,
  },
  addFriendText: {
    color: Colors.green,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.green,
    marginBottom: 12,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  overviewBox: {
    flex: 1,
    backgroundColor: Colors.lime,
    marginHorizontal: 5,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.red,
  },
  overviewLabel: {
    fontSize: 12,
    color: Colors.green,
  },
});
