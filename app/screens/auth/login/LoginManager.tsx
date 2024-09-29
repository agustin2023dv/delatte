import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateEmail, validatePassword } from '../../../../shared/utils/auth.validation';
import { loginManagerService } from '@/app/services/user.service';
import { Redirect } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';

export default function LoginManager() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // Validar campos
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      Alert.alert('Errores en el formulario', `${emailError || ''}\n${passwordError || ''}`);
      return;
    }

    try {
      setIsLoading(true);
      const data = await loginManagerService(email, password); // Llamada a la API a través del servicio
      setAuthState(data); // Actualiza el estado de autenticación en el contexto
      return <Redirect href='/'/>; // Redirige al home después del login
    } catch (err) {
      setError('Error al iniciar sesión como Manager.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión como Manager</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Iniciar Sesión" onPress={handleLogin} />
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  safeContainer: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
});
