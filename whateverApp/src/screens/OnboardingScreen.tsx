import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';
import LinearGradient from 'react-native-linear-gradient';
import StepOne from '../components/Onboarding/StepOne.tsx';
import StepTwo from '../components/Onboarding/StepTwo.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function OnboardingScreen({navigation}: Props) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const next = () => setStep(s => Math.min(s + 1, 2));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const finish = async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    navigation.replace('Home');
  };

  return (
    <LinearGradient
      colors={[
        'rgba(187, 217, 173, 0.9)',
        'rgba(19, 64, 22, 0.9)',
      ]}
      style={{flex: 1, padding: 0, justifyContent: 'center'}}>
      {step === 0 && (
        <View style={{padding: 20}}>
          <StepOne name={name} setName={setName} next={next} />
        </View>
      )}

      {step === 1 && (
        <View style={{flex: 1, padding: 20}}>
          <StepTwo next={next} back={back} />
        </View>
      )}

      {step === 2 && (
        <>
          <Text>Step 3: Permissions</Text>
          <Text>Hier könnten z. B. HealthKit-Permissions kommen.</Text>
          <Button title="Zurück" onPress={back} />
          <Button title="Fertig" onPress={finish} />
        </>
      )}
    </LinearGradient>
  );
}
