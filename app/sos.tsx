import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';

type Contact = {
  name: string;
  phone: string;
};

export default function SOS() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        const parsed = JSON.parse(data);
        setContacts(parsed.contacts || []);
      }
    };

    loadProfile();
  }, []);

  const handleSOS = async () => {
    if (contacts.length === 0) {
      Alert.alert("Error", "No emergency contacts found");
      return;
    }

    // 📍 Get location permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "Location access is required");
      return;
    }

    // 📍 Get current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // 📩 Prepare message
    let message = `🚨 EMERGENCY!\nI need help.\nMy location:\n${mapLink}`;

    const phoneNumbers = contacts.map((c) => c.phone);

    // 📩 Send SMS
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync(phoneNumbers, message);
    } else {
      Alert.alert("Error", "SMS not available on this device");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Emergency SOS</Text>

      <Text style={styles.subtitle}>
        Press the SOS button only during an emergency.
      </Text>

      <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
        <Text style={styles.sosText}>🚑 SOS</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f0e6',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8b6b3f',
  },

  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  sosButton: {
    backgroundColor: 'red',
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sosText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});