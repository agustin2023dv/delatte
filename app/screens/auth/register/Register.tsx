import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RegisterTabs from './RegisterTabs';

export default function Register() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RegisterTabs />
    </SafeAreaView>
  );
}
