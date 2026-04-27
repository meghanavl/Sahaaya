import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import Header from '../components/Header';

export default function Provider() {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [license, setLicense] = useState<any>(null);

  // Pick document (PDF or image)
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setLicense(result.assets[0]);
    }
  };

  // Register provider
  const handleRegister = async () => {
  if (!name || !specialization || !location || !license) {
    alert('Please fill all fields and upload license');
    return;
  }

  const newProvider = {
    id: Date.now().toString(),
    name,
    specialization,
    experience,
    location,
    phone,
    licenseUri: license.uri,
  };

  try {
    const existing = await AsyncStorage.getItem('providers');
    const providers = existing ? JSON.parse(existing) : [];

    providers.push(newProvider);

    await AsyncStorage.setItem('providers', JSON.stringify(providers));

    alert('Provider Registered!');

    // reset
    setName('');
    setSpecialization('');
    setExperience('');
    setLocation('');
    setPhone('');
    setLicense(null);

  } catch (error) {
    console.log(error);
  }
};
  return (
    <>
    <Header />
    <View style={styles.container}>

      <Text style={styles.title}>Join Sahaaya Network</Text>

      <View style={styles.box}>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
          style={styles.input}
        />

        <TextInput
          placeholder="Experience (years)"
          value={experience}
          onChangeText={setExperience}
          style={styles.input}
        />

        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />

        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        {/* 📄 Upload License */}
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.uploadText}>
            {license ? 'License Selected!' : 'Upload License'}
          </Text>
        </TouchableOpacity>

        {license && (
          <Text style={styles.fileName}>{license.name}</Text>
        )}

        {/* 🔘 Register */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

      </View>

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
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  uploadButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },

  uploadText: {
    color: '#333',
    fontWeight: '500',
  },

  fileName: {
    marginBottom: 10,
    fontSize: 12,
    color: '#555',
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
});