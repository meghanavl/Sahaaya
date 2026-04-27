import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import Header from '../components/Header';

type RecordType = {
  id: string;
  type: string;
  value: string;
  unit: string;
  date: string;
};

export default function Records() {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');
  const [records, setRecords] = useState<RecordType[]>([]);

  const addRecord = () => {
    if (!type || !value || !date) return;

    const newRecord = {
      id: Date.now().toString(),
      type,
      value,
      unit,
      date,
    };

    setRecords((prev) => [...prev, newRecord]);

    setType('');
    setValue('');
    setUnit('');
    setDate('');
  };

  return (
    <>
    <Header />
    <View style={styles.container}>

      <Text style={styles.title}>Health Records</Text>

      {/* INPUT BOX */}
      <View style={styles.box}>
        <TextInput
          placeholder="Type (e.g. BP, Sugar)"
          value={type}
          onChangeText={setType}
          style={styles.input}
        />

        <TextInput
          placeholder="Value (e.g. 120/80)"
          value={value}
          onChangeText={setValue}
          style={styles.input}
        />

        <TextInput
          placeholder="Unit (e.g. mmHg)"
          value={unit}
          onChangeText={setUnit}
          style={styles.input}
        />

        <TextInput
          placeholder="Date (dd-mm-yyyy)"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addRecord}>
          <Text style={styles.buttonText}>Save Record</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No records yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.type}</Text>
            <Text>{item.value} {item.unit}</Text>
            <Text>{item.date}</Text>
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