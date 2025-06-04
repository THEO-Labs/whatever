import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import Colors from '../design/colors';

export default function ProfileScreen({ navigation }: any) {
  return (
    <LinearGradient
      colors={['#F5FFD4', '#FFDFDF']}
      style={styles.gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* back arrow */}
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={28} color={Colors.green} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Image
            source={require('../images/avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Mia Zyra</Text>
          <Text style={styles.username}>@mzyra · Since March 2024</Text>

          {/* follower / following */}
          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Follower</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ ADD FRIENDS</Text>
          </TouchableOpacity>
        </View>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.overviewRow}>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewValue}>0</Text>
            <Text style={styles.overviewLabel}>Streak Days</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewValue}>1478</Text>
            <Text style={styles.overviewLabel}>Overall XP</Text>
          </View>
        </View>
        <View style={styles.overviewRow}>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewValue}>🥉</Text>
            <Text style={styles.overviewLabel}>Bronze League</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewValue}>1</Text>
            <Text style={styles.overviewLabel}>Top 3</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ------------------------ styles ------------------------ */
const BOX_BG = '#FFFFFFAA';          // translucent white for overview cards
const SHADOW = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 3,
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  backIcon: {
    position: 'absolute',
    top: 12,
    left: 20,
    zIndex: 10,
  },

  header: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 32,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#000000',
    marginBottom: 12,
  },

  name: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.green,
  },
  username: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },

  statsRow: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statBlock: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.green,
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },

  addBtn: {
    marginTop: 24,
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#fff',
    ...SHADOW,
  },
  addBtnText: {
    color: Colors.green,
    fontWeight: '700',
    letterSpacing: 1,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.green,
    marginLeft: 24,
    marginBottom: 12,
  },

  overviewRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  overviewBox: {
    flex: 1,
    backgroundColor: BOX_BG,
    borderRadius: 18,
    marginHorizontal: 6,
    paddingVertical: 24,
    alignItems: 'center',
    ...SHADOW,
  },
  overviewValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  overviewLabel: {
    fontSize: 13,
    color: '#555',
  },
});
