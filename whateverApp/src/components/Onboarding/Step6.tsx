import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowLeft, ArrowRight} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/OnboardingNavigator.tsx';
import colors from '../../design/colors.ts';

export default function Step6() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<NavigationProp>();

    const [cycleLength, setCycleLength] = useState<number>(28);

    return (
        <LinearGradient
            colors={['#F4FCD9', '#FBC5D1']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={{flex: 1}}>
            <View style={styles.container}>
                {/* Progress Bar */}
                <View style={styles.progressBar}>
                    {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <View
                            key={i}
                            style={[styles.progressDot, i === 5 && styles.progressDotActive]}
                        />
                    ))}
                </View>

                {/* Title */}
                <Text style={styles.title}>How long is your{'\n'}regular menstrual cycle?</Text>

                {/* Slider UI */}
                <View style={styles.sliderBox}>
                    <Text style={styles.cycleNumber}>{cycleLength} days</Text>
                    <Slider
                        style={{width: '100%', height: 40}}
                        minimumValue={21}
                        maximumValue={45}
                        step={1}
                        minimumTrackTintColor={colors.red}
                        maximumTrackTintColor="#ddd"
                        thumbTintColor={colors.red}
                        value={cycleLength}
                        onValueChange={setCycleLength}
                    />
                    <View style={styles.sliderLabels}>
                        <Text style={styles.sliderLabel}>21</Text>
                        <Text style={styles.sliderLabel}>33</Text>
                        <Text style={styles.sliderLabel}>45</Text>
                    </View>
                </View>

                {/* Navigation */}
                <View style={styles.navigation}>
                    <TouchableOpacity
                        style={styles.navButtonWhite}
                        onPress={() => navigation.navigate('Step5')}>
                        <ArrowLeft color="#333"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navButtonRed}
                        onPress={() => navigation.navigate('Step7')}
                    >
                        <Text style={styles.navButtonText}>next</Text>
                        <ArrowRight color="#fff" size={18}/>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        marginTop: 40,
        gap: 20,
    },
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
        marginTop: 40,
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
    title: {
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        color: '#2C1E3F',
        marginBottom: 20,
    },
    sliderBox: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: '100%',
        alignItems: 'center',
    },
    cycleNumber: {
        fontSize: 36,
        fontWeight: '700',
        color: colors.red,
        marginBottom: 10,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 4,
    },
    sliderLabel: {
        fontSize: 12,
        color: '#555',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginTop: 40,
    },
    navButtonWhite: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
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
    navButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
    },
});
