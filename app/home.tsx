import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function HomeScreen() {

  const { language, setLanguage, darkMode, setDarkMode } = useApp();
  const t = translations[language];

  return (
    <>
      <Header />

      <ScrollView style={[styles.container, { backgroundColor: darkMode ? '#000' : '#fff' }]}>

        {/* LANGUAGE + THEME CONTROLS */}
        <View style={styles.topControls}>
          <View style={styles.langRow}>
            <TouchableOpacity onPress={() => setLanguage('en')}>
              <Text style={[styles.langBtn, { color: darkMode ? '#fff' : '#000' }]}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('hi')}>
              <Text style={[styles.langBtn, { color: darkMode ? '#fff' : '#000' }]}>HI</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('te')}>
              <Text style={[styles.langBtn, { color: darkMode ? '#fff' : '#000' }]}>TE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('ta')}>
              <Text style={[styles.langBtn, { color: darkMode ? '#fff' : '#000' }]}>TA</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
            <Text style={[styles.darkBtn, { color: darkMode ? '#fff' : '#000' }]}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* HERO SECTION */}
        <ImageBackground source={require('../assets/images/hero.jpg')} style={styles.hero}>
          <View style={styles.overlay}>
            <Text style={styles.title}>{t.title}</Text>

            <Text style={styles.subtitle}>
              Empowering senior citizens with safe, smart and compassionate care solutions.
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/voice')}>
              <Text style={styles.buttonText}>{t.speak}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* SERVICES */}
        <Text style={[styles.sectionTitle, { color: darkMode ? '#fff' : '#000' }]}>
          Our Services
        </Text>

        {[
          { text: "Medicine Management", route: '/medicine' },
          { text: "Smart Reminders", route: '/reminders' },
          { text: "Health Records", route: '/records' },
          { text: "Emergency Support", route: '/sos' },
          { text: "Find Care", route: '/findcare' },
          { text: "Join as Provider", route: '/provider' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={[ styles.card,
              { backgroundColor: darkMode ? '#222' : '#f5f5f5' }
            ]}
            onPress={() => router.push(item.route as any)} >
            <Text style={{ color: darkMode ? '#fff' : '#000' }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}

        {/* RESET */}
        <TouchableOpacity
  style={{ padding: 10, backgroundColor: 'red', margin: 30 }}
  onPress={() => {
    Alert.alert(
      "Reset App",
      "This will delete all data",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              alert("Storage Cleared");
              router.replace('/login');
            } catch (e) {
              console.log("Reset error:", e);
            }
          }
        }
      ]
    );
  }}
>
  <Text style={{ color: 'white', textAlign: 'center' }}>
    Reset App
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={{ backgroundColor: 'blue', padding: 10, margin: 20 }}
  onPress={async () => {
    await Notifications.requestPermissionsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test",
        body: "It works!",
      },
      trigger: {
        type: 'timeInterval',
        seconds: 5,
        repeats: false,
      },
    });
  }}
>
  <Text style={{ color: 'white' }}>Test Notification</Text>
</TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topControls: {
    padding: 10,
  },

  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  langBtn: {
    fontWeight: 'bold',
  },

  darkBtn: {
    textAlign: 'center',
    marginBottom: 10,
  },

  hero: {
    height: 300,
    justifyContent: 'center',
  },

  overlay: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100%',
    justifyContent: 'center',
  },

  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    color: 'white',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#c79c60',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 18,
    margin: 15,
    fontWeight: 'bold',
  },

  card: {
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
});