import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';

//**Componente para la configuración de la cuenta del usuario**
export default function AccountSettings() {
  const { user } = useAuth(); // Obtener el usuario autenticado del contexto

  const handleChangePassword = () => {
    Alert.alert("Cambiar Contraseña", "Función para cambiar la contraseña."); // Función de cambio de contraseña
  };

  const handleToggle2FA = () => {
    Alert.alert("Autenticación de Dos Factores", "Función para activar/desactivar 2FA."); // Función para activar/desactivar 2FA
  };

  const handleDisconnect = (platform: string) => {
    console.log(`Desconectar cuenta de ${platform}`); // Función para desconectar cuentas vinculadas
  };

  const handleConnect = (platform: string) => {
    console.log(`Conectar cuenta de ${platform}`); // Función para conectar cuentas vinculadas
  };

  // Estado de las cuentas conectadas (ejemplo)
  const connectedAccounts = {
    google: true,
    facebook: false,
    twitter: false,
  };

  return (
    <View style={styles.container}>
      {/* Información de la cuenta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Info</Text>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <Text style={styles.info}>Nombre: {user?.fullName || 'Full Name'}</Text>
        <Text style={styles.info}>Email: {user?.email || 'useremail@example.com'}</Text>
        <Text style={styles.info}>Date of Birth: {user?.dob || '01/01/1990'}</Text>
        <Text style={styles.info}>Phone: {user?.phone || '+032020202'}</Text>
      </View>

      {/* Sección de seguridad */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleToggle2FA}>
          <Text style={styles.buttonText}>2-Step Verification</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de cuentas conectadas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connected Accounts</Text>
        {/* Google */}
        <View style={styles.account}>
          <Text>Google</Text>
          {connectedAccounts.google ? (
            <TouchableOpacity style={styles.disconnectButton} onPress={() => handleDisconnect('Google')}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.connectButton} onPress={() => handleConnect('Google')}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Facebook */}
        <View style={styles.account}>
          <Text>Facebook</Text>
          {connectedAccounts.facebook ? (
            <TouchableOpacity style={styles.disconnectButton} onPress={() => handleDisconnect('Facebook')}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.connectButton} onPress={() => handleConnect('Facebook')}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Twitter */}
        <View style={styles.account}>
          <Text>Twitter</Text>
          {connectedAccounts.twitter ? (
            <TouchableOpacity style={styles.disconnectButton} onPress={() => handleDisconnect('Twitter')}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.connectButton} onPress={() => handleConnect('Twitter')}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// Estilos para el componente AccountSettings
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  connectButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  disconnectButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
});
