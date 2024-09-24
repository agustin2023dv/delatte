import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createRestaurantAndManagerService } from '../../../services/restaurant.service';
import { 
  validateNombre, 
  validateApellido, 
  validateEmail, 
  validatePassword, 
  validateConfirmPassword,
  validateRestaurantName,
  validateRestaurantAddress 
} from '../../../../shared/utils/auth.validation';

export default function ManagerRegister() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  // Información del restaurante
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');

  const handleSignUp = async () => {
    const nombreError = validateNombre(nombre);
    const apellidoError = validateApellido(apellido);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const cPasswordError = validateConfirmPassword(password, cPassword);
    const restaurantNameError = validateRestaurantName(restaurantName);
    const restaurantAddressError = validateRestaurantAddress(restaurantAddress);

    if (nombreError || apellidoError || emailError || passwordError || cPasswordError || restaurantNameError || restaurantAddressError) {
      Alert.alert('Errores en el formulario', 
        `${nombreError || ''}\n${apellidoError || ''}\n${emailError || ''}\n${passwordError || ''}\n${cPasswordError || ''}\n${restaurantNameError || ''}\n${restaurantAddressError || ''}`
      );
      return;
    }

    try {
      const data = await createRestaurantAndManagerService({
        nombre: restaurantName,
        direccion: restaurantAddress,
        emailContacto: email
      }, { nombre, apellido, email, password });
      Alert.alert('Registro Exitoso', `Manager y Restaurante registrados con éxito.`);
    } catch (error) {
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
        <Text style={styles.title}>Regístrate como Manager</Text>
        {/* Campos de registro de manager */}
        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirma la contraseña" value={cPassword} onChangeText={setCPassword} secureTextEntry />
        {/* Campos adicionales para restaurante */}
        <TextInput style={styles.input} placeholder="Nombre del Restaurante" value={restaurantName} onChangeText={setRestaurantName} />
        <TextInput style={styles.input} placeholder="Dirección del Restaurante" value={restaurantAddress} onChangeText={setRestaurantAddress} />
        <Button title="Crear cuenta" onPress={handleSignUp} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  safeContainer: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
});
