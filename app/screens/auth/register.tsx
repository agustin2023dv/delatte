import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  validateNombre,
  validateApellido,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../../../utils/validations';
import { registerUser } from '@/app/services/user.service';

//**Componente para el registro de un nuevo usuario**
export default function Register() {
  const [nombre, setNombre] = useState(''); // Estado para el nombre del usuario
  const [apellido, setApellido] = useState(''); // Estado para el apellido del usuario
  const [email, setEmail] = useState(''); // Estado para el email del usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña del usuario
  const [cPassword, setCPassword] = useState(''); // Estado para la confirmación de la contraseña

  const handleSignUp = async () => {
    // Validaciones de los campos del formulario
    const nombreError = validateNombre(nombre);
    const apellidoError = validateApellido(apellido);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const cPasswordError = validateConfirmPassword(password, cPassword);

    // Mostrar errores si existen
    if (nombreError || apellidoError || emailError || passwordError || cPasswordError) {
      Alert.alert('Errores en el formulario', `${nombreError || ''}\n${apellidoError || ''}\n${emailError || ''}\n${passwordError || ''}\n${cPasswordError || ''}`);
      return;
    }

    try {
      // Registrar al usuario si no hay errores
      const data = await registerUser(nombre, apellido, email, password);
      Alert.alert('Registro Exitoso', `Usuario registrado con éxito: ${data.user.nombre}`);
    } catch (error) {
      // Manejar posibles errores
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Ocurrió un error desconocido.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>
        {/* Campos del formulario de registro */}
        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirma la contraseña" value={cPassword} onChangeText={setCPassword} secureTextEntry />
        <Button title="Crear cuenta" onPress={handleSignUp} />
      </View>
    </SafeAreaView>
  );
}

// Estilos para el componente Register
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
});
