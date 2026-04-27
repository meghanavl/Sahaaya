import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import Header from '../components/Header';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

type ReminderType = {
  id: string;
  text: string;
  time: string;
};

export default function Reminders() {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [reminders, setReminders] = useState<ReminderType[]>([]);

  // ✅ CORRECT PLACE
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await AsyncStorage.getItem('reminders');
        if (data) {
          setReminders(JSON.parse(data));
        }
      };
      load();
    }, [])
  );

 const addReminder = async () => {
  if (!text || !time) return;

  const newReminder = {
    id: Date.now().toString(),
    text,
    time,
  };

  const existing = await AsyncStorage.getItem('reminders');
  const updated = existing ? JSON.parse(existing) : [];

  updated.push(newReminder);

  await AsyncStorage.setItem('reminders', JSON.stringify(updated));
  setReminders(updated);

  setText('');
  setTime('');

  // 🔥 REAL NOTIFICATION
  await Notifications.requestPermissionsAsync();

  const triggerDate = getNextTriggerDate(time);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: newReminder.text,
    },
    trigger: {
      type: 'date',
      date: triggerDate,
    },
  });
};

  return (
    <>
      <Header />
      <View style={styles.container}>

        <Text style={styles.title}>Smart Reminders</Text>

        <View style={styles.box}>
          <TextInput
            placeholder="Enter reminder"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />

          <TextInput
            placeholder="Time (e.g. 09:00)"
            value={time}
            onChangeText={setTime}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={addReminder}>
            <Text style={styles.buttonText}>Add Reminder</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No reminders yet</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>{item.text}</Text>
              <Text>{item.time}</Text>
            </View>
          )}
        />

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f0e6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8b6b3f',
  },
  box: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#b08b57',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});