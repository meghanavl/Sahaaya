import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import Header from '../components/Header';

type MedicineType = {
  id: string;
  name: string;
  dosage: string;
  time: string;
};

export default function Medicine() {

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [medicines, setMedicines] = useState<MedicineType[]>([]);
  

  const addMedicine = () => {
    if (!name || !dosage || !time) return;

    const newMed = {
      id: Date.now().toString(),
      name,
      dosage,
      time,
    };

    setMedicines([...medicines, newMed]);

    setName('');
    setDosage('');
    setTime('');
  };

  return (
      <>
    <Header />

    <View style={styles.container}>

      <Text style={styles.title}>Medicine Management</Text>

      {/* INPUT SECTION */}
      <View style={styles.inputBox}>

        <TextInput
          placeholder="Medicine Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Dosage (e.g. 1 tablet)"
          value={dosage}
          onChangeText={setDosage}
          style={styles.input}
        />

        <TextInput
          placeholder="Time (e.g. 08:00)"
          value={time}
          onChangeText={setTime}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addMedicine}>
          <Text style={styles.buttonText}>Add Medicine</Text>
        </TouchableOpacity>

      </View>

      {/* LIST */}
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No medicines added yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.dosage}</Text>
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

  inputBox: {
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