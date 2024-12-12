import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { fetchUserDataService, updateUserDataService } from '@/app/services/user/profile.service';
import { IUser } from 'shared/interfaces/IUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import { useAuth } from '@/app/contexts/AuthContext';

export default function AccountSettings() {
  const user = useAuth();
  const [managerData, setManagerData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingPhone, setEditingPhone] = useState(''); 
  const [editingAddress, setEditingAddress] = useState(''); 
  const [editingDob, setEditingDob] = useState<Date | undefined>(undefined); 
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  
  // Estado para alternar entre el modo de visualización y edición
  const [isEditing, setIsEditing] = useState(false);

  // Estados para almacenar los valores originales para poder revertir los cambios
  const [originalPhone, setOriginalPhone] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');
  const [originalDob, setOriginalDob] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const data = await fetchUserDataService();
        setManagerData(data);
        setEditingPhone(data.phone || '');
        setOriginalPhone(data.phone || '');  // Guardar valor original
        setEditingAddress(data.addresses?.[0] || '');
        setOriginalAddress(data.addresses?.[0] || '');  // Guardar valor original
        setEditingDob(data.dob ? new Date(data.dob) : undefined);
        setOriginalDob(data.dob ? new Date(data.dob) : undefined);  // Guardar valor original
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchManagerData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!managerData) return;

    const updatedData: Partial<IUser> = {  
      email : managerData.email,
      phone: editingPhone, 
      addresses: Array.isArray(editingAddress) ? editingAddress : [editingAddress], 
      dob: editingDob,
    };

    try {
      await updateUserDataService(updatedData);
      Alert.alert('Perfil actualizado', 'Los datos del perfil han sido actualizados correctamente');
      setIsEditing(false); // Volver a modo de visualización después de guardar
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  // Función para cancelar y volver a los valores originales
  const handleCancelEdit = () => {
    setEditingPhone(originalPhone);  // Revertir al valor original
    setEditingAddress(originalAddress);  // Revertir al valor original
    setEditingDob(originalDob);  // Revertir al valor original
    setIsEditing(false);  // Salir del modo de edición
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
      <Text style={styles.info}>Nombre: {managerData?.nombre || 'Nombre no disponible'}</Text>
      <Text style={styles.info}>Apellido: {managerData?.apellido || 'Apellido no disponible'}</Text>
      <Text style={styles.info}>Email: {managerData?.email || 'Correo no disponible'}</Text>
      <Text style={styles.info}>Teléfono:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editingPhone}
          onChangeText={setEditingPhone}
          placeholder="Teléfono"
        />
      ) : (
        <Text>{editingPhone || 'No especificado'}</Text>
      )}

      <Text style={styles.info}>Dirección:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editingAddress}
          onChangeText={setEditingAddress}
          placeholder="Dirección"
        />
      ) : (
        <Text>{editingAddress || 'No especificado'}</Text>
      )}

      {Platform.OS !== 'web' && (
        <>
          <Text style={styles.info}>Fecha de nacimiento:</Text>
          {isEditing ? (
            <>
              <Button title="Seleccionar fecha" onPress={() => setDatePickerVisible(true)} />
              {editingDob && <Text>{new Date(editingDob).toLocaleDateString()}</Text>}
              <DatePicker
                modal
                mode="date"
                open={isDatePickerVisible}
                date={editingDob || new Date()}
                onConfirm={(date) => {
                  setEditingDob(date);
                  setDatePickerVisible(false);
                }}
                onCancel={() => {
                  setDatePickerVisible(false);
                }}
              />
            </>
          ) : (
            <Text>{editingDob ? new Date(editingDob).toLocaleDateString() : 'No especificado'}</Text>
          )}
        </>
      )}

      {isEditing ? (
        <>
          <Button title="Guardar cambios" onPress={handleUpdateProfile} />
          <Button title="Cancelar" onPress={handleCancelEdit} />
        </>
      ) : (
        <Button title="Editar" onPress={() => setIsEditing(true)} />
      )}
    </SafeAreaView>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
