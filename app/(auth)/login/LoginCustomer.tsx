import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateEmail, validatePassword } from 'shared/utils/auth.validation';
import { Link, router } from 'expo-router';
import { loginCustomerService } from 'services/auth/login.service';
import { useAuth } from 'hooks/useAuth';

export default function LoginCustomer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth(); 
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
      await loginCustomerService(email, password); // Llamada al método del contexto para iniciar sesión

      router.replace("/(profile)/customer-profile/ProfileTabs");
    } catch (err: any) {
      console.log("error");
      setError(err.message || 'Error al iniciar sesión como Customer.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión como Customer</Text>
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
          <>
            <Button title="Iniciar Sesión" onPress={handleLogin} />
            <View style={styles.buttonSpacing}>
              <Link href="/forgotPassword/ForgotPassword">
                ¿Olvidaste tu contraseña?
              </Link>
            
            </View>
          </>
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
  buttonSpacing: { marginTop: 10 },
});
