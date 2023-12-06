import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileScreen from './ProfileScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileScreen />
    </SafeAreaProvider>
  );
}
