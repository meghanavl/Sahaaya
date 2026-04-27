import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: any) => {
  type Language = 'en' | 'hi' | 'te' | 'ta';
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);

  // Load saved settings
  useEffect(() => {
    const load = async () => {
      const lang = await AsyncStorage.getItem('language');
      const theme = await AsyncStorage.getItem('darkMode');

      if (lang) setLanguage(lang);
      if (theme) setDarkMode(JSON.parse(theme));
    };
    load();
  }, []);

  // Save settings
  useEffect(() => {
    AsyncStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <AppContext.Provider value={{ language, setLanguage, darkMode, setDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext)!;