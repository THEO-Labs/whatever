import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowLeft, ArrowRight, Check} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/OnboardingNavigator.tsx';

const GOALS = [
    'Staying active and healthy',
    'Building strength',
    'Having fun',
    'Weight reduction',
    'Stress reduction',
];

export default function Step4() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const toggleGoal = (goal: string) => {
        setSelectedGoals(prev =>
            prev.includes(goal)
                ? prev.filter(g => g !== goal)
                : [...prev, goal]
        );
    };

    return (
        <LinearGradient
            colors={['#F4FCD9', '#FBC5D1']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Fortschrittsleiste */}
                <View style={styles.progressBar}>
                    {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <View
                            key={i}
                            style={[styles.progressDot, i === 3 && styles.progressDotActive]}
                        />
                    ))}
                </View>

                {/* Title */}
                <Text style={styles.title}>
                    What are your{'\n'}personal goals when{'\n'}doing sports?
                </Text>

                {/* Goals */}
                <View style={styles.goalList}>
                    {GOALS.map(goal => {
                        const selected = selectedGoals.includes(goal);
                        return (
                            <TouchableOpacity
                                key={goal}
                                onPress={() => toggleGoal(goal)}
                                style={[styles.goalButton, selected && styles.goalButtonSelected]}
                            >
                                <Text
                                    style={[
                                        styles.goalText,
                                        selected && styles.goalTextSelected,
                                    ]}
                                >
                                    {goal}
                                </Text>
                                {selected && (
                                    <View style={styles.checkmark}>
                                        <Check color="#fff" size={14}/>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Navigation Buttons */}
                <View style={styles.navigation}>
                    <TouchableOpacity
                        style={styles.navButtonWhite}
                        onPress={() => {
                            navigation.navigate('Step3');
                        }}
                    >
                        <ArrowLeft color="#333"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navButtonRed}
                        onPress={() => {
                            navigation.navigate('Step5');
                        }}
                        disabled={selectedGoals.length === 0}
                    >
                        <Text style={styles.navButtonText}>next</Text>
                        <ArrowRight color="#fff" size={18}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {flex: 1, padding: 20, alignItems: 'center', gap: 20},
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
        marginTop: 75,
    },
    progressDot: {
        width: 30,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#D3D3D3',
    },
    progressDotActive: {
        backgroundColor: '#000',
    },
    navButtonRed: {
        backgroundColor: '#FB4F4F',
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 28,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        minWidth: 140,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: '#2C1E3F',
        marginBottom: 20,
    },
    goalButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#AAA',
        borderRadius: 18,
        backgroundColor: '#fff',
        padding: 20,
    },
    goalButtonSelected: {
        borderColor: '#1A1A2E',
    },
    goalText: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
    },
    goalTextSelected: {
        fontWeight: '600',
    },
    checkIcon: {
        backgroundColor: '#1A1A2E',
        borderRadius: 999,
        padding: 4,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginTop: 0,
    },
    navButtonWhite: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    navButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
    },
    goalList: {
        width: '100%',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 30,
    },

    checkmark: {
        backgroundColor: '#1A1A2E',
        borderRadius: 999,
        padding: 4,
    },
});
