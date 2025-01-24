import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {validateApellido,validateNombre,
  validateConfirmPassword,validateEmail,
  validatePassword,validateRestaurantName,
  validateRestaurantPostCode,validateRestaurantAddress
} from '@/app/../shared/utils/auth.validation';
import { createRestaurantAndManagerService } from 'services/restaurant.service';
import { router } from 'expo-router';

export default function ManagerRegister() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantPostCode, setRestaurantPostCode] = useState("");
  const [errorMessages, setErrorMessages] = useState<string>("");

  const handleSignUp = async () => {
    // Validaciones de los campos
    const nombreError = validateNombre(nombre);
    const apellidoError = validateApellido(apellido);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const cPasswordError = validateConfirmPassword(password, cPassword);
    const restaurantNameError = validateRestaurantName(restaurantName);
    const restaurantAddressError = validateRestaurantAddress(restaurantAddress);
    const restaurantPostCodeError = validateRestaurantPostCode(restaurantPostCode);

    // Verificar si hay errores
    if (
      nombreError ||
      apellidoError ||
      emailError ||
      passwordError ||
      cPasswordError ||
      restaurantNameError ||
      restaurantAddressError ||
      restaurantPostCodeError
    ) {
      const errors = `
        ${nombreError || ""}
        ${apellidoError || ""}
        ${emailError || ""}
        ${passwordError || ""}
        ${cPasswordError || ""}
        ${restaurantNameError || ""}
        ${restaurantAddressError || ""}
        ${restaurantPostCodeError || ""}
      `.trim();

      setErrorMessages(errors);
      return;
    }

    try {
      // Simula un registro exitoso
      Alert.alert("Registro Exitoso", "Usuario registrado correctamente.");
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error desconocido.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Registra tu negocio</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirma la contraseña"
          value={cPassword}
          onChangeText={setCPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Restaurante"
          value={restaurantName}
          onChangeText={setRestaurantName}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección del Restaurante"
          value={restaurantAddress}
          onChangeText={setRestaurantAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Código Postal"
          value={restaurantPostCode}
          onChangeText={setRestaurantPostCode}
        />
        {errorMessages ? (
          <Text style={styles.errorText}>{errorMessages}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#e7ded9" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontFamily: "Montserrat-Bold", color: "#271207", marginBottom: 20 },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontFamily: "Montserrat-Regular",
  },
  button: {
    backgroundColor: "#a5744b",
    paddingVertical: 12,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },
  errorText: {
    color: "red",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginTop: 10,
  },
});