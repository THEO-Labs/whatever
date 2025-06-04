import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RulerPicker} from 'react-native-ruler-picker';
import {ArrowLeft, ArrowRight} from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/OnboardingNavigator.tsx';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function Step3() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();
    return (
        <LinearGradient
            colors={['#F4FCD9', '#FBC5D1']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={{flex: 1}}>
            <View style={styles.container}>
                {/* Fortschrittsleiste */}
                <View style={styles.progressBar}>
                    {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <View
                            key={i}
                            style={[
                                styles.progressDot,
                                i === 2 && styles.progressDotActive,
                            ]}
                        />
                    ))}
                </View>

                <Text style={styles.title}>How old are{'\n'}you?</Text>

                {/* Gewichtsauswahl */}
                <View style={styles.rulerContainer}>
                    <RulerPicker
                        min={16}
                        max={99}
                        step={1}
                        unit=" "
                        fractionDigits={0}
                        indicatorColor="#000"
                        longStepColor="#000"
                        shortStepColor="#aaa"
                        height={200}
                        width={width * 0.9}
                    />
                </View>

                {/* Navigation Buttons */}
                <View style={styles.navigation}>
                    <TouchableOpacity style={styles.navButtonWhite} onPress={() => {
                        navigation.navigate('Step2');
                    }}>
                        <ArrowLeft color="#333"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButtonRed} onPress={() => {
                        navigation.navigate('Step4');
                    }}>
                        <Text style={styles.navButtonText}>next</Text>
                        <ArrowRight color="#fff" size={18}/>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, paddingTop: 40, alignItems: 'center', gap: 10, padding: 20},
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        gap: 10,
        padding: 20,
        marginTop: 30,
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
        marginBottom: 20,
        color: '#2C1E3F',
    },
    unitSwitch: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 50,
        overflow: 'hidden',
        borderColor: '#333',
        marginBottom: 20,
    },
    unitOption: {
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    unitActive: {
        backgroundColor: '#FB4F4F',
    },
    unitText: {
        color: '#333',
        fontWeight: '500',
    },
    unitTextActive: {
        color: '#fff',
        fontWeight: '600',
    },
    rulerContainer: {
        paddingTop: 70,
        width: '100%',
        backgroundColor: '#FFC8D2',
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 70,
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
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
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
