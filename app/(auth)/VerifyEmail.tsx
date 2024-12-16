import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

//**Componente para verificar el email después del registro**
export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(true); // Estado para mostrar un indicador de carga
  const [status, setStatus] = useState<string | null>(null); // Estado para el estado de verificación (éxito/error)
  const [message, setMessage] = useState<string | null>(null); // Estado para el mensaje de la verificación
  const router = useRouter();

  useEffect(() => {
    // Obtener los parámetros de la URL para el estado y el mensaje de verificación
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get('status');
    const messageParam = params.get('message');

    if (statusParam && messageParam) {
      setStatus(statusParam);
      setMessage(messageParam);
    } else {
      setStatus('error');
      setMessage('Faltan parámetros en la URL.');
    }

    setIsLoading(false); // Ocultar el indicador de carga una vez obtenidos los parámetros
  }, [router]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Mostrar el indicador de carga mientras se procesa
      ) : (
        <View>
          {/* Mostrar mensaje de éxito o error dependiendo del estado */}
          <Text style={status === 'success' ? styles.successText : styles.errorText}>
            {message}
          </Text>
          {status === 'success' && (
            <>
              <Text style={styles.linkText}>
              ¡Tu email ha sido verificado con éxito!
              </Text>
              <Link href={"/(auth)/login"}></Link>
            </>
            
          )}
        </View>
      )}
    </View>
  );
}

// Estilos para el componente VerifyEmail
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successText: {
    color: 'green',
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
