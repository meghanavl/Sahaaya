import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Header() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sahaaya</Text>

      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Text style={styles.profile}>👤</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#b08b57',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    fontSize: 20,
  },
});