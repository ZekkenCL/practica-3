import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import ProfileScreen from './ProfileScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ProfileScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
