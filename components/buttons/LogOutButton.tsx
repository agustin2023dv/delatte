import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useAuth } from "contexts/AuthContext";
import { router } from "expo-router";

export default function LogOutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login"); 
  };

  return (
    <View style={styles.container}>
      <Button title="Cerrar sesión" onPress={handleLogout} color="#FF3B30" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignSelf: "center",
  },
});
