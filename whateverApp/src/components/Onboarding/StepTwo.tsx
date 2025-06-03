import React, {useState} from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RulerPicker} from 'react-native-ruler-picker';

export default function StepTwo({
  next,
  back,
}: {
  next: () => void;
  back: () => void;
}) {
  const [hasPeriod, setHasPeriod] = useState<boolean | null>(null);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setLastPeriodDate(selectedDate);
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      {/* Header mit Logo */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30, fontWeight: '600', color: '#fff'}}>
          🌸 Zyklus-Check
        </Text>
        <Image
          source={require('../../assets/pictures/logo.png')}
          style={{width: 48, height: 48, borderRadius: 12}}
        />
      </View>

      {/* Einleitung */}
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          marginTop: 10,
          marginBottom: 30,
        }}>
        Nur ein paar Infos, damit wir dich besser verstehen können 💚
      </Text>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* Frage: Periode aktuell? */}
        <Text style={{color: '#fff', fontSize: 16, marginBottom: 12}}>
          Hast du aktuell deine Periode?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 24,
          }}>
          <TouchableOpacity
            onPress={() => setHasPeriod(true)}
            style={{
              backgroundColor: hasPeriod ? '#F25E5E' : '#fff',
              padding: 12,
              borderRadius: 10,
              width: 100,
              alignItems: 'center',
            }}>
            <Text style={{color: hasPeriod ? '#fff' : '#000'}}>Ja</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setHasPeriod(false)}
            style={{
              backgroundColor: hasPeriod === false ? '#F25E5E' : '#fff',
              padding: 12,
              borderRadius: 10,
              width: 100,
              alignItems: 'center',
            }}>
            <Text style={{color: hasPeriod === false ? '#fff' : '#000'}}>
              Nein
            </Text>
          </TouchableOpacity>
        </View>

        {/* Zykluslänge */}
        <Text style={{color: '#fff', fontSize: 16, marginBottom: 25}}>
          Wie lang ist dein Zyklus ungefähr?
        </Text>
        <RulerPicker
          min={21}
          max={40}
          step={1}
          fractionDigits={0}
          initialValue={cycleLength}
          onValueChangeEnd={val => setCycleLength(Number(val))}
          unit="Tage"
          height={150}
          width={300}
          indicatorColor="#F25E5E"
          longStepColor="#CEF249"
          shortStepColor="#134016"
        />

        {/* Letzter Zyklustag */}
        <Text
          style={{color: '#fff', fontSize: 16, marginTop: 24, marginBottom: 8}}>
          Wann war der erste Tag deiner letzten Periode?
        </Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 10,
            marginBottom: 32,
          }}>
          <Text>{lastPeriodDate.toLocaleDateString('de-DE')}</Text>
        </TouchableOpacity>

        {/* Date Picker anzeigen */}
        {Platform.OS === 'ios' && showDatePicker && (
          <DateTimePicker
            value={lastPeriodDate}
            mode="date"
            display="inline"
            onChange={handleDateChange}
          />
        )}

        {/* Navigation */}
        <View
          style={{
            marginTop: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button title="Zurück" onPress={back} />
          <Button title="Weiter" onPress={next} />
        </View>
      </ScrollView>
    </View>
  );
}
