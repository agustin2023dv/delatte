import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestPasswordResetService } from '@/app/services/user.service'; 

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor, ingresa un correo válido.');
      return;
    }
  
    try {
      setIsLoading(true);
      console.log('Enviando solicitud para:', email); // Agrega un log aquí
      await requestPasswordResetService(email);
      setSuccessMessage('Hemos enviado un enlace de restablecimiento a tu correo.');
      setEmail(''); // Limpiar el campo de correo
    } catch (err: any) {
      console.error('Error en el proceso:', err); // Agrega un log aquí
      setError(err.message || 'Error al procesar la solicitud.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.instructions}>
          Ingresa tu correo electrónico para recibir un enlace de restablecimiento.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Enviar enlace" onPress={handleForgotPassword} />
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  safeContainer: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  instructions: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
  successText: { color: 'green', textAlign: 'center', marginTop: 10 },
});
