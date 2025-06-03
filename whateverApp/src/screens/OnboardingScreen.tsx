import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator.tsx';

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
    <View style={{padding: 20, flex: 1, justifyContent: 'center'}}>
      {step === 0 && (
        <>
          <Text>Step 1: Personal Info</Text>
          <TextInput placeholder="Name" value={name} onChangeText={setName} />
          <Button title="Weiter" onPress={next} />
        </>
      )}

      {step === 1 && (
        <>
          <Text>Step 2: Health Data</Text>
          <TextInput
            placeholder="Alter"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <Button title="Zurück" onPress={back} />
          <Button title="Weiter" onPress={next} />
        </>
      )}

      {step === 2 && (
        <>
          <Text>Step 3: Permissions</Text>
          <Text>Hier könnten z. B. HealthKit-Permissions kommen.</Text>
          <Button title="Zurück" onPress={back} />
          <Button title="Fertig" onPress={finish} />
        </>
      )}
    </View>
  );
}
