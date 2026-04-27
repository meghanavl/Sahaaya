import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await AsyncStorage.getItem('userProfile');
        setHasProfile(!!data);
      } catch (e) {
        console.log("AsyncStorage error:", e);
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  // Show loader instead of blank screen
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={hasProfile ? '/home' : '/login'} />;
}