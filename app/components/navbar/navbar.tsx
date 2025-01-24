import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { useAuth } from "hooks/useAuth";

export default function NavBar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };


  return (
    <View style={styles.navbar}>
      {/* Logo */}
      <TouchableOpacity onPress={() => router.replace("/home")}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Navigation Links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Descubrir</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Cafeterías</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Foro</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Contact and Logout Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactText}>Contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F7EBE1",
    borderBottomWidth: 1,
    borderBottomColor: "#E0D6D1",
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  linkText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#6B4226",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20, 
  },
  contactButton: {
    backgroundColor: "#6B4226",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  contactText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  logoutButton: {
    backgroundColor: "#6B4226",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  logoutText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
