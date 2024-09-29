import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';

export default function AccountSettings() {
  const { user } = useAuth(); 

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
      <Text style={styles.info}>Nombre: {user?.fullName || 'Full Name'}</Text>
      <Text style={styles.info}>Email: {user?.email || 'useremail@example.com'}</Text>
      <Text style={styles.info}>Teléfono: {user?.phone || '+032020202'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});
