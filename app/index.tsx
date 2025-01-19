import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { useAuth } from "hooks/useAuth";
import { useFonts } from "expo-font";

export default function Home() {
  const user = useAuth();

  if (user.isSigned) {
    router.replace("/home");
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido a</Text>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.subtitle}>Selecciona una opción para continuar</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/register")}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e7ded9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Montserrat-Bold",
    color: "#271207",
    marginRight: 10,
  },
  logo: {
    width: 220,
    height: 100,
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#271207",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#a5744b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: "35%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },
});