import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RulerPicker} from 'react-native-ruler-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const confirmButtonRef = useRef<View>(null);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    console.log('DatePicker event triggered:', selectedDate);
    if (selectedDate) {
      setTempDate(new Date(selectedDate));
      setTempDate(new Date(selectedDate));
    }
  };

  const confirmDate = () => {
    setLastPeriodDate(new Date(tempDate));
    console.log('Confirmed date:', tempDate.toLocaleDateString('de-DE'));
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    console.log('Toggling DatePicker, current showDatePicker:', showDatePicker);
    setShowDatePicker(!showDatePicker);
    if (!showDatePicker) {
      setTempDate(new Date(lastPeriodDate));
      console.log(
        'Temp date reset to:',
        lastPeriodDate.toLocaleDateString('de-DE'),
      );
    }
  };

  // Scroll to the confirm button when DatePicker opens
  useEffect(() => {
    if (showDatePicker && scrollViewRef.current && confirmButtonRef.current) {
      setTimeout(() => {
        confirmButtonRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            console.log('Confirm button position:', {x, y, pageX, pageY});
            scrollViewRef.current?.scrollTo({y: pageY, animated: true});
            console.log('Scrolling to confirm button at y:', pageY);
          },
        );
      }, 100); // Delay to ensure rendering
    }
  }, [showDatePicker]);

  return (
    <View style={{flex: 1, padding: 15, marginTop: 15}}>
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
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
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
          onPress={toggleDatePicker}
          style={{
            backgroundColor: '#fff',
            padding: 12,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text style={{color: '#000', fontSize: 16}}>
            {lastPeriodDate.toLocaleDateString('de-DE')}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <View
            style={{
              minHeight: 260,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              ref={confirmButtonRef}
              onPress={confirmDate}
              style={{
                backgroundColor: '#F25E5E',
                padding: 12,
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 12,
                width: 120,
              }}>
              <Text style={{color: '#fff', fontSize: 16}}>Bestätigen</Text>
            </TouchableOpacity>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={handleDateChange}
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                width: '100%',
                minHeight: 200,
                zIndex: 1000,
              }}
              locale="de-DE"
            />
          </View>
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
