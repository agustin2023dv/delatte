import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginTabs from './LoginTabs';

export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginTabs />
    </SafeAreaView>
  );
}