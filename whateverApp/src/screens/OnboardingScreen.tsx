import React, {useState} from 'react';
import {View} from 'react-native';
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
  const next = () => setStep(s => Math.min(s + 1, 2));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const finish = async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    navigation.replace('Home');
  };

  return (
      <LinearGradient
          colors={['#F4FCD9', '#FBC5D1']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        {step === 0 && (
          <View style={{flex: 1, padding: 20}}>
            <StepOne name={name} setName={setName} next={next} />
          </View>
        )}
        {step === 1 && (
          <View style={{flex: 1, padding: 20}}>
            <StepTwo next={finish} back={back} />
          </View>
        )}
      </View>
    </LinearGradient>
  );
}
