// app/components/Navbar.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      {/* Logo */}
      <Image 
        source={{ uri: 'assets/images/logo.svg' }}
        style={styles.logo}
      />

      {/* Links de navegación centrales */}
    <View style={styles.navLinks}>
        <Link href="/screens/discover" style={styles.link}>Descubrir</Link>
        <Link href="/screens/coffeeShops" style={styles.link}>Cafeterías</Link>
        <Link href="/screens/forum" style={styles.link}>Foro</Link>
        <Link href="/screens/profile" style={styles.link}>Perfil</Link>
    </View>


      {/* Enlace de Contacto */}
      <TouchableOpacity style={styles.contactButton}>
        <Link href="/screens/contact" style={styles.contactText}>Contacto</Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6DED9', // Color de fondo según la imagen
    padding: 10,
  },
  logo: {
    width: 100,  // Ajusta el tamaño de tu logo
    height: 50,  // Ajusta el tamaño de tu logo
    resizeMode: 'contain',
  },
  navLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%', // Espacio entre los enlaces
  },
  link: {
    color: '#5C4334', // Color marrón similar al de los enlaces
    fontSize: 16,
    padding: 5,
  },
  contactButton: {
    backgroundColor: '#392316', // Color de fondo del botón de contacto
    padding: 10,
    borderRadius: 10,
  },
  contactText: {
    color: '#fff', // Color de texto blanco para el botón de contacto
    fontSize: 16,
  },
});

export default Navbar;
