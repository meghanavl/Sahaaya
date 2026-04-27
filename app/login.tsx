import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to Sahaaya!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login-senior')}
      >
        <Text style={styles.text}>Senior Citizen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/login-caretaker')}
      >
        <Text style={styles.text}>Caretaker</Text>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#b08b57',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});