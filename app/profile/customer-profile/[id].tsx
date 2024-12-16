import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileTabs from './ProfileTabs';
import { useAuth } from 'contexts/AuthContext';

//**Componente de perfil del cliente**
export default function CustomerProfile() {
  const { logout } = useAuth(); // Obtener el usuario autenticado y la función de logout del contexto


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Navegación por pestañas para la vista de perfil */}
      <ProfileTabs />
    </SafeAreaView>
  );
}
