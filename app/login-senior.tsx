import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function LoginSenior() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!phone || !password) {
      alert("Enter phone and password");
      return;
    }

    if (phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }

    try {
      const existing = await AsyncStorage.getItem('userAuth'); // ✅ FIXED

      if (existing) {
        const parsed = JSON.parse(existing);

        if (parsed.phone === phone && parsed.password === password) {
          router.replace('/home');
          return;
        } else {
          alert("Invalid credentials");
          return;
        }
      }

      // first time signup
      const user = {
        role: 'senior',
        phone,
        password,
      };

      await AsyncStorage.setItem('userAuth', JSON.stringify(user)); // ✅ FIXED

      router.replace('/home');

    } catch (e) {
      console.log("Login error:", e);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Senior Login</Text>

      <TextInput
        placeholder="Mobile Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login / Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#b08b57',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});