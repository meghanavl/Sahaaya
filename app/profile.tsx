import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import { router, useFocusEffect } from 'expo-router';

type ContactType = {
  name: string;
  phone: string;
};

export default function Profile() {
  const [age, setAge] = useState('');
  const [caretaker, setCaretaker] = useState('');
  const [doctor, setDoctor] = useState('');
  const [contacts, setContacts] = useState<ContactType[]>([
    { name: '', phone: '' },
  ]);

  // ✅ Load profile EVERY time screen opens
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const data = await AsyncStorage.getItem('userProfile');

          if (data) {
            const parsed = JSON.parse(data);

            setAge(parsed.age || '');
            setCaretaker(parsed.caretaker || '');
            setDoctor(parsed.doctor || '');
            setContacts(parsed.contacts || [{ name: '', phone: '' }]);
          }
        } catch (e) {
          console.log("Load error:", e);
        }
      };

      loadProfile();
    }, [])
  );

  // Add new contact
  const addContact = () => {
    setContacts([...contacts, { name: '', phone: '' }]);
  };

  // Update contact
  const updateContact = (index: number, field: 'name' | 'phone', value: string) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  // ✅ Save ONLY profile data (no overwriting login)
  const saveProfile = async () => {
    try {
      if (!age) {
        alert("Please enter age");
        return;
      }

      const profileData = {
        age,
        caretaker,
        doctor,
        contacts,
      };

      await AsyncStorage.setItem('userProfile', JSON.stringify(profileData));

      router.replace('/home');

    } catch (e) {
      console.log("Save error:", e);
    }
  };

  return (
    <>
      <Header />

      <View style={styles.container}>

        <Text style={styles.title}>User Profile</Text>

        {/* ✅ NO ROLE SWITCH */}
        <Text style={styles.roleText}>Senior Citizen</Text>

        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Caretaker Name (optional)"
          value={caretaker}
          onChangeText={setCaretaker}
          style={styles.input}
        />

        <TextInput
          placeholder="Preferred Doctor / Hospital"
          value={doctor}
          onChangeText={setDoctor}
          style={styles.input}
        />

        {/* CONTACTS */}
        <Text style={styles.section}>Emergency Contacts</Text>

        {contacts.map((contact, index) => (
          <View key={index} style={styles.contactBox}>
            <TextInput
              placeholder="Name"
              value={contact.name}
              onChangeText={(val) => updateContact(index, 'name', val)}
              style={styles.input}
            />

            <TextInput
              placeholder="Phone"
              value={contact.phone}
              onChangeText={(val) => updateContact(index, 'phone', val)}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={addContact}>
          <Text style={{ textAlign: 'center' }}>+ Add Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>

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
  roleText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#b08b57',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  contactBox: {
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});