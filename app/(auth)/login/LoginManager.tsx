import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { validateEmail, validatePassword } from "shared/utils/auth.validation";
import { Link, router } from "expo-router";
import { loginManagerService } from "services/auth/login.service";

export default function LoginManager() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      Alert.alert(
        "Errores en el formulario",
        `${emailError || ""}\n${passwordError || ""}`
      );
      return;
    }

    try {
      setIsLoading(true);
      await loginManagerService(email, password);
      router.replace("/manager-profile");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.header}>
           <Text style={styles.title}>Iniciar Sesión como Manager</Text>
        </View>

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
          <ActivityIndicator size="large" color="#a5744b" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Link href="/forgotPassword/ForgotPassword" style={styles.link}>
          ¿Olvidaste tu contraseña?
        </Link>
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
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center", 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    color: "#271207",
    marginRight: 10,
    padding: 20,
  },
  logo: {
    width: 150, 
    height: 60,
    resizeMode: "contain",
  },
  input: {
    width: "35%", 
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
    width: "35%",
    backgroundColor: "#a5744b",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginTop: 10,
  },
  link: {
    color: "#a5744b",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginTop: 15,
  },
});
