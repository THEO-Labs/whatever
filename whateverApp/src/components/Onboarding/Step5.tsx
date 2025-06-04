import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowLeft, ArrowRight} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar} from 'react-native-calendars';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/OnboardingNavigator.tsx';
import colors from '../../design/colors.ts';

export default function Step5() {
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();

    const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
                                i === 4 && styles.progressDotActive,
                            ]}
                        />
                    ))}
                </View>

                {/* Titel */}
                <Text style={styles.title}>When was the first{'\n'}day of your last period?</Text>

                {/* Kalender */}
                <View style={styles.calendarContainer}>
                    <Calendar
                        onDayPress={day => setSelectedDate(day.dateString)}
                        markedDates={
                            selectedDate
                                ? {
                                    [selectedDate]: {
                                        selected: true,
                                        selectedColor: colors.red,
                                        selectedTextColor: '#fff',
                                    },
                                }
                                : {}
                        }
                        theme={{
                            arrowColor: '#000',
                            todayTextColor: '#000',
                            textDayFontWeight: '500',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '600',
                            selectedDayBackgroundColor: '#059941',
                            selectedDayTextColor: '#fff',
                        }}
                    />
                </View>

                {/* Navigation */}
                <View style={styles.navigation}>
                    <TouchableOpacity
                        style={styles.navButtonWhite}
                        onPress={() => navigation.navigate('Step4')}>
                        <ArrowLeft color="#333"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.navButtonRed,
                            !selectedDate && {opacity: 0.5},
                        ]}
                        onPress={() => navigation.navigate('Step6')}
                        disabled={!selectedDate}>
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
    calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 10,
        width: '100%',
        marginBottom: 40,
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
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
    },
});
