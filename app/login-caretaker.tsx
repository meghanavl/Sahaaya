import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function LoginSenior() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const login = async () => {
    const user = {
      role: 'caretaker',
      name,
      phone,
    };

    await AsyncStorage.setItem('user', JSON.stringify(user));

    router.replace('/findcare'); // go to findcare or maybe dashboard??? lets see what to do
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={{ color: 'white' }}>Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#b08b57',
    padding: 12,
  },
});