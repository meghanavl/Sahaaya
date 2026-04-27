import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

export default function VoiceAssistant() {
  const [result, setResult] = useState('');
  const [listening, setListening] = useState(false);

  // Speak function
  const speak = (message: string) => {
    Speech.speak(message, {
      language: 'en-IN',
      pitch: 1,
      rate: 0.9,
    });
  };

  // Simulated listening (Expo Go safe)
  const startListening = () => {
    setListening(true);

    speak("Listening...");

    // simulate user speech input
    setTimeout(() => {
      const fakeInput = "remind me to take medicine at 9 pm";

      setResult(fakeInput);
      setListening(false);

      processCommand(fakeInput);
    }, 2000);
  };

  // PROCESS COMMAND
  const processCommand = async (input: string) => {
    const lower = input.toLowerCase();

    const isReminder =
      lower.includes('remind') ||
      lower.includes('yaad') ||     // Hindi
      lower.includes('gurthu') ||   // Telugu
      lower.includes('ninaivu');    // Tamil

    if (isReminder) {
      const timeMatch = lower.match(/\d+\s*(am|pm)?/);
      const time = timeMatch ? timeMatch[0] : 'unknown';

      const newReminder = {
        id: Date.now().toString(),
        text: input,
        time,
      };

      const existing = await AsyncStorage.getItem('reminders');
      const reminders = existing ? JSON.parse(existing) : [];

      reminders.push(newReminder);

      await AsyncStorage.setItem('reminders', JSON.stringify(reminders));

      const response = `Reminder added for ${time}`;
      speak(response);
      alert(response);
    } else {
      const msg = "Sorry, I did not understand";
      speak(msg);
      alert(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Assistant</Text>

      <TouchableOpacity style={styles.button} onPress={startListening}>
        <Text style={styles.text}> Speak</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20 }}>
        {listening ? "Listening..." : result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { backgroundColor: '#b08b57', padding: 20, borderRadius: 10 },
  text: { color: 'white' },
  title: { fontSize: 22, marginBottom: 20 },
});