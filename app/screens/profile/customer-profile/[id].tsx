import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../contexts/AuthContext';
import ProfileTabs from './profile-tabs';

//**Componente de perfil del cliente**
export default function CustomerProfile() {
  const { user, logout } = useAuth(); // Obtener el usuario autenticado y la función de logout del contexto

  const handleSignOut = () => {
    logout(); // Cerrar sesión del usuario
  };

  const handleChangePassword = () => {
    // Lógica para cambiar la contraseña (aún no implementada)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Navegación por pestañas para la vista de perfil */}
      <ProfileTabs />
    </SafeAreaView>
  );
}
