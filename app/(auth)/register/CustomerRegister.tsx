import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateNombre, validateApellido, validateEmail, 
  validatePassword, validateConfirmPassword } from '../../../shared/utils/auth.validation';
import { registerUserService } from 'services/auth/register.service';
import { router } from 'expo-router';

export default function CustomerRegister() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const handleSignUp = async () => {
    const nombreError = validateNombre(nombre);
    const apellidoError = validateApellido(apellido);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const cPasswordError = validateConfirmPassword(password, cPassword);

    const errors = [
      nombreError,
      apellidoError,
      emailError,
      passwordError,
      cPasswordError,
    ]
      .filter(Boolean)
      .join("\n");

    if (errors) {
      setErrorMessages(errors); // Muestra los errores en pantalla
      return;
    }

    try {
      const response = await registerUserService(nombre, apellido, email, password);
      Alert.alert(
        "Registro Exitoso",
        `Usuario registrado con éxito: ${response.user.nombre}`
      );
      router.replace("/(auth)/login");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessages(`Error: ${error.message}`);
      } else {
        setErrorMessages("Error desconocido al registrar usuario.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>

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
  safeContainer: {
    flex: 1,
    backgroundColor: "#e7ded9",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Montserrat-Bold",
    color: "#271207",
    marginBottom: 20,
  },
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  errorText: {
    color: "red",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginBottom: 10,
  },
});