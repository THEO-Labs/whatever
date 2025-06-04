import React from 'react';
import {Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeText from './WelcomeText.tsx';
import {RulerPicker} from 'react-native-ruler-picker';

export default function StepOne({
  name,
  setName,
  next,
}: {
  name: string;
  setName: (val: string) => void;
  next: () => void;
}) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const [age, setAge] = React.useState(32);
  const [height, setHeight] = React.useState(170);
  const [weight, setWeight] = React.useState(70);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem(
        'onboardingData',
        JSON.stringify({
          name,
          age,
          height,
          weight,
        }),
      );
      next();
    } catch (err) {
      console.error('Fehler beim Speichern der Onboarding-Daten:', err);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        gap: 10,
        alignContent: 'center',
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

      <WelcomeText />

      {/* Name */}
      <View
        style={{
          padding: 10,
          borderRadius: 15,
          borderColor: '#134016',
          borderWidth: 2,
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
      {/* Alter */}
      <View
        style={{
          padding: 10,
          borderRadius: 15,
          borderColor: '#134016',
          borderWidth: 2,
          minWidth: '95%',
        }}>
        <Text
          style={{
            fontWeight: '500',
          }}>
          Verrätst du uns dein Alter?
        </Text>
        <View style={{marginTop: 30}}>
          <RulerPicker
            min={16}
            max={99}
            step={1}
            fractionDigits={0}
            initialValue={age}
            onValueChangeEnd={val => setAge(Number(val))}
            unit="Jahre"
            height={150}
            width={300}
            indicatorColor="#F25E5E"
            longStepColor="#CEF249"
            shortStepColor="#134016"
          />
        </View>
      </View>
      {/* Gewicht */}
      <View
        style={{
          padding: 10,
          borderRadius: 15,
          borderColor: '#134016',
          borderWidth: 2,
          minWidth: '95%',
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: '#fff',
          }}>
          Verrätst du uns dein aktuelles Gewicht?
        </Text>
        <View style={{marginTop: 30}}>
          <RulerPicker
            min={30}
            max={150}
            step={1}
            fractionDigits={0}
            initialValue={weight}
            onValueChangeEnd={val => setWeight(Number(val))}
            unit="kg"
            height={150}
            width={300}
            indicatorColor="#F25E5E"
            longStepColor="#CEF249"
            shortStepColor="#134016"
          />
        </View>
      </View>
      {/* Größe */}
      <View
        style={{
          padding: 10,
          borderRadius: 15,
          borderColor: '#134016',
          borderWidth: 2,
          minWidth: '95%',
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: '#fff',
          }}>
          Und jetzt fehlt nur noch deine Körpergröße?
        </Text>
        <View style={{marginTop: 30}}>
          <RulerPicker
            min={100}
            max={220}
            step={1}
            fractionDigits={0}
            initialValue={height}
            onValueChangeEnd={val => setHeight(Number(val))}
            unit="cm"
            height={150}
            width={300}
            indicatorColor="#F25E5E"
            longStepColor="#CEF249"
            shortStepColor="#134016"
          />
        </View>
      </View>
      {/* Weiter */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
        activeOpacity={0.8}
        disabled={name.length < 2}>
        <Text style={styles.nextButtonText}>Weiter</Text>
      </TouchableOpacity>
    </ScrollView>
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
});
