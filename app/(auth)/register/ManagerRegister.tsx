import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {validateApellido,validateNombre,
  validateConfirmPassword,validateEmail,
  validatePassword,validateRestaurantName,
  validateRestaurantPostCode,validateRestaurantAddress
} from '@/app/../shared/utils/auth.validation';
import { Redirect } from 'expo-router';
import { createRestaurantAndManagerService } from 'services/restaurant.service';

export default function ManagerRegister() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  // Información del restaurante
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantPostCode, setRestaurantPostcode] = useState('');

  const handleSignUp = async () => {
    const nombreError = validateNombre(nombre);
    const apellidoError = validateApellido(apellido);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const cPasswordError = validateConfirmPassword(password, cPassword);
    const restaurantNameError = validateRestaurantName(restaurantName);
    const restaurantAddressError = validateRestaurantAddress(restaurantAddress);
    const restaurantPostCodeError = validateRestaurantPostCode(restaurantPostCode);

    if (nombreError || apellidoError || emailError || passwordError || cPasswordError || restaurantNameError 
      || restaurantAddressError || restaurantPostCodeError) {
      Alert.alert('Errores en el formulario', 
        `${nombreError || ''}\n${apellidoError || ''}\n${emailError || ''}\n${passwordError || ''}\n${cPasswordError 
          || ''}\n${restaurantNameError || ''}\n${restaurantAddressError || ''} \n${restaurantAddressError}`
      );
      return;
    }

    try {
       await createRestaurantAndManagerService({
        nombre: restaurantName,
        direccion: restaurantAddress,
        codigoPostal: restaurantPostCode,
        emailContacto: email
      }, {  nombre: nombre, apellido:apellido, email: email,password: password });
      
      return <Redirect href="./"/>

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
        <Text style={styles.title}>Regístra tu negocio</Text>
        {/* Campos de registro de manager */}
        <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirma la contraseña" value={cPassword} onChangeText={setCPassword} secureTextEntry />
        {/* Campos adicionales para restaurante */}
        <TextInput style={styles.input} placeholder="Nombre del Restaurante" value={restaurantName} onChangeText={setRestaurantName} />
        <TextInput style={styles.input} placeholder="Dirección del Restaurante" value={restaurantAddress} onChangeText={setRestaurantAddress} />
        <TextInput style={styles.input} placeholder='Codigo postal' value={restaurantPostCode} onChangeText={setRestaurantPostcode}/>
        <Button title="Crear cuenta" onPress={handleSignUp} />
      </View>
    </SafeAreaView> );  
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, justifyContent: 'center' },
  safeContainer: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 },
});
