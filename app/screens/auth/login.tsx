import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';
import { Redirect } from 'expo-router';

//**Componente de pantalla de inicio de sesión**
export default function LoginScreen() {
  const [email, setEmail] = useState(''); // Estado para el email del usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña del usuario
  const [redirectToHome, setRedirectToHome] = useState(false); // Estado para manejar la redirección después de un login exitoso
  const { login, isLoading, error } = useAuth(); // Obtener el método de login, estado de carga y errores desde el contexto de autenticación

  const handleLogin = async () => {
    // Validar los campos del formulario
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      Alert.alert('Errores en el formulario', `${emailError || ''}\n${passwordError || ''}`);
      return;
    }

    try {
      // Intentar iniciar sesión
      await login(email, password);
      setRedirectToHome(true); // Redirigir si el inicio de sesión es exitoso
    } catch (err) {
      // Manejar errores
      if (err instanceof Error) {
        Alert.alert('Error', err.message);
      } else {
        Alert.alert('Error', 'Ocurrió un error desconocido.');
      }
    }
  };

  // Si el usuario debe ser redirigido después del login
  if (redirectToHome) {
    return <Redirect href="../" />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        {/* Campo de entrada de email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {/* Campo de entrada de contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* Mostrar un spinner de carga mientras se procesa el login */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Iniciar Sesión" onPress={handleLogin} />
        )}
        {/* Mostrar mensaje de error si existe */}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}

// Estilos para el componente LoginScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  safeContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
