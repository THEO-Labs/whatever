import React from 'react';
import {
  Animated,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import WelcomeText from './WelcomeText.tsx';
import {RulerPicker} from 'react-native-ruler-picker';

export default function StepOne({
  name,
  setName,
  next,
}: {
  name: string;
  setName: (val: string) => void;
  height: number;
  setHeight: (val: number) => void;
  next: () => void;
}) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [, setAge] = React.useState(35);
  const [, setHeight] = React.useState(170);
  const [, setWeight] = React.useState(60);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 24,
        }}>
        {/* Logo */}
        <View style={{alignItems: 'center', marginBottom: 24}}>
          <Image
            source={require('../../assets/pictures/logo.png')}
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
        <Text style={{marginBottom: 8, fontWeight: '500', color: '#fff'}}>
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
          }}
        />

        {/* Alter */}
        <Text
          style={{
            marginBottom: 8,
            fontWeight: '500',
            color: '#fff',
            marginTop: 20,
          }}>
          Verrätss du uns dein Alter?
        </Text>
        <View style={{marginTop: 30}}>
          <RulerPicker
            min={16}
            max={99}
            step={1}
            fractionDigits={0}
            initialValue={29}
            onValueChangeEnd={val => setAge(Number(val))}
            unit="Jahre"
            height={150}
            width={300}
            indicatorColor="#F25E5E"
            longStepColor="#CEF249"
            shortStepColor="#134016"
          />
        </View>

        {/* Gewicht */}
        <Text
          style={{
            marginBottom: 8,
            fontWeight: '500',
            color: '#fff',
            marginTop: 10,
          }}>
          Verrätst du uns dein aktuelles Gewicht?
        </Text>
        <View style={{marginTop: 30}}>
          <RulerPicker
            min={16}
            max={99}
            step={1}
            fractionDigits={0}
            initialValue={51}
            onValueChangeEnd={val => setWeight(Number(val))}
            unit="kg"
            height={150}
            width={300}
            indicatorColor="#F25E5E"
            longStepColor="#CEF249"
            shortStepColor="#134016"
          />
        </View>
        {/* Größe */}
        <Text
          style={{
            marginBottom: 8,
            fontWeight: '500',
            color: '#fff',
            marginTop: 10,
          }}>
          Und jetzt fehlt nur noch deine Körpergröße?
        </Text>
        <View style={{marginTop: 30}}>
          <RulerPicker
            min={100}
            max={220}
            step={1}
            fractionDigits={0}
            initialValue={165}
            onValueChangeEnd={val => setHeight(Number(val))}
            unit="cm"
            height={150}
            width={300}
            indicatorColor="#F25E5E"
            longStepColor="#CEF249"
            shortStepColor="#134016"
          />
        </View>
        {/* Weiter */}
        <Button title="Weiter" onPress={next} />
      </View>
    </ScrollView>
  );
}
