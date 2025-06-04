import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import WelcomeText from './WelcomeText.tsx';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../../navigation/OnboardingNavigator.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export default function Step1() {
    const [name, setName] = useState('');
    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();
    return (
        <LinearGradient
            colors={['#F4FCD9', '#FBC5D1']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={{flex: 1}}>
            <View
                style={{
                    flexGrow: 1,
                    alignItems: 'center',
                    marginTop: 50,
                    alignContent: 'center',
                    padding: 20,
                }}>
                {/* Logo */}
                <View style={{alignItems: 'center', marginBottom: 24}}>
                    <Image
                        source={require('../../assets/pictures/logo.jpg')}
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 30,
                            resizeMode: 'contain',
                        }}
                    />
                </View>

                <WelcomeText/>

                {/* Name */}
                <View
                    style={{
                        padding: 10,
                        borderRadius: 15,
                        minWidth: '95%',
                    }}>
                    <Text style={{marginBottom: 8, fontWeight: '500'}}>
                        Wie dürfen wir dich nennen?
                    </Text>
                    <TextInput
                        placeholder="Charlie"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                        style={{
                            backgroundColor: '#fff',
                            padding: 12,
                            borderRadius: 10,
                            marginBottom: 20,
                            textAlignVertical: 'center',
                        }}
                    />
                </View>
                {/* Weiter */}
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        navigation.navigate('Step2');
                    }}
                    activeOpacity={0.8}
                    disabled={name.length < 2}>
                    <Text style={styles.nextButtonText}>Weiter</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                    {Array.from({length: 7}).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === 0 ? styles.activeDot : styles.inactiveDot, // Nur der erste ist aktiv
                            ]}
                        />
                    ))}
                </View>
            </View>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        marginTop: 20,
    },
    nextButtonText: {
        color: '#134016',
        fontSize: 18,
        fontWeight: '600',
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
        marginBottom: 40,
        gap: 10,
    },
    dot: {
        width: 30,
        height: 6,
        borderRadius: 3,
    },
    activeDot: {
        backgroundColor: 'darkgray',
    },
    inactiveDot: {
        backgroundColor: '#ffffff',
    },
});
