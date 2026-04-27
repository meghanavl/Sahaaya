import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import Header from '../components/Header';

type ProviderType = {
  id: string;
  name: string;
  specialization: string;
  location: string;
};

export default function FindCare() {

  const [query, setQuery] = useState('');
  const [providers, setProviders] = useState<ProviderType[]>([]);

  // Load data whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadProviders = async () => {
        const data = await AsyncStorage.getItem('providers');
        if (data) {
          setProviders(JSON.parse(data));
        } else {
          setProviders([]);
        }
      };

      loadProviders();
    }, [])
  );

  //  Filter logic (correct place)
  const filtered = providers.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.specialization.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
    <Header />
    <View style={styles.container}>

      <Text style={styles.title}>Find Care</Text>

      <TextInput
        placeholder="Search doctors, hospitals..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No providers found</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.specialization}</Text>
            <Text>{item.location}</Text>
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
    marginBottom: 15,
    color: '#8b6b3f',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});