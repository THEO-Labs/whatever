import React, {useEffect, useRef, useState} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {RulerPicker} from 'react-native-ruler-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    if (selectedDate) {
      setTempDate(new Date(selectedDate));
      setTempDate(new Date(selectedDate));
    }
  };
  const handleNext = async () => {
    try {
      const storedStepOne = await AsyncStorage.getItem('onboardingData');
      const stepOneData = storedStepOne ? JSON.parse(storedStepOne) : {};

      const fullData = {
        ...stepOneData,
        hasPeriod,
        cycleLength,
        lastPeriodDate: lastPeriodDate.toISOString(),
      };

      await AsyncStorage.setItem('onboardingData', JSON.stringify(fullData));
      next();
    } catch (err) {
      console.error(
        'Fehler beim Speichern der Onboarding-Daten (Step 2):',
        err,
      );
    }
  };

  const confirmDate = () => {
    setLastPeriodDate(new Date(tempDate));
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
    if (!showDatePicker) {
      setTempDate(new Date(lastPeriodDate));
    }
  };

  // Scroll to the confirm button when DatePicker opens
  useEffect(() => {
    if (showDatePicker && scrollViewRef.current && confirmButtonRef.current) {
      setTimeout(() => {
        confirmButtonRef.current?.measure(
          (x, y, width, height, pageX, pageY) => {
            scrollViewRef.current?.scrollTo({y: pageY, animated: true});
          },
        );
      }, 100); // Delay to ensure rendering
    }
  }, [showDatePicker]);

  return (
    <View style={{flex: 1, padding: 15, marginTop: 15}}>
      {/* Header mit Logo */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text style={{fontSize: 30, fontWeight: '600', color: '#fff'}}>
            🌸 Zyklus-Check
          </Text>
          <Image
              source={require('../../assets/pictures/logo.jpg')}
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
      </View>
      <View style={{flexGrow: 1, paddingBottom: 100, gap: 10}}>
        {/* Frage: Periode aktuell? */}
        <View
          style={{
            padding: 10,
            borderRadius: 15,
            borderColor: '#134016',
            borderWidth: 2,
          }}>
          <Text style={{color: '#fff', fontSize: 16, marginBottom: 12}}>
            Hast du aktuell deine Periode?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
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
        </View>
        {/* Zykluslänge */}
        <View
          style={{
            padding: 10,
            borderRadius: 15,
            borderColor: '#134016',
            borderWidth: 2,
          }}>
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
        </View>
        {/* Letzter Zyklustag */}
        <View
          style={{
            padding: 10,
            borderRadius: 15,
            borderColor: '#134016',
            borderWidth: 2,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              marginBottom: 8,
            }}>
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
                  paddingHorizontal: 40,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                <Text style={{color: '#fff', fontSize: 16}}>Confirm Date</Text>
              </TouchableOpacity>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={new Date()}
                onChange={handleDateChange}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 30,
                  width: '100%',
                  minHeight: 100,
                }}
                locale="de-DE"
              />
            </View>
          )}
        </View>
        {/* Navigation */}
        <View
          style={{
            marginTop: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={back}
            activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}>
            <Text style={styles.nextButtonText}>All done ✅</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    minWidth: 150,
  },
  nextButtonText: {
    color: '#134016',
    fontSize: 18,
    fontWeight: '600',
  },
});

