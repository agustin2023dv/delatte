import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Stack, Slot } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "contexts/AuthContext";

export default function Layout() {
  // Carga de fuentes
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-LightItalic.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#a5744b" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e7ded9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#271207",
  },
});
