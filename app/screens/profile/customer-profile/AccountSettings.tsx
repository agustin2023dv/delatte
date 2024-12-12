import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, 
  Modal, TextInput, Button, ScrollView } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { changePasswordService } from '@/app/services/auth/password.service';
import { fetchUserDataService } from '@/app/services/user/profile.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePickerComponent from 'components/dataPicker/DatePickerComponent';

interface UserData {
  nombre: string;
  email: string;
  dob: string;
  phone: string;
  addresses: Array<string>; 
  profileImage: string;
}


//**Componente para la configuración de la cuenta del usuario**
export default function AccountSettings() {
  const  user  = useAuth(); // Obtener el usuario autenticado del contexto

  // Estados para manejar el modal de cambio de contraseña
  const [isModalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');


  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 

  const [error, setError] = useState<string | null>(null);  
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserDataService();
        setUserData(data);
      } catch (err: any) {
        setError(err.message || 'Error inesperado');
      }
    };
    fetchData();
  }, []);

  if (!userData) {
    return <Text>Cargando...</Text>; 
  }

  // Función para manejar el cambio de contraseña
  const handleChangePassword = async () => {
    try {
      await changePasswordService(oldPassword, newPassword, confirmNewPassword);
      Alert.alert('Éxito', 'La contraseña ha sido cambiada con éxito');
      setModalVisible(false); // Cerrar el modal después del cambio exitoso
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Ocurrió un error inesperado');
    }
  };

  const handleToggle2FA = () => {
    Alert.alert("Autenticación de Dos Factores", 
      "Función para activar/desactivar 2FA."); // Función para activar/desactivar 2FA
  };

  const handleDisconnect = (platform: string) => {
    console.log(`Desconectar cuenta de ${platform}`); // Función para desconectar cuentas vinculadas
  };

  const handleConnect = (platform: string) => {
    console.log(`Conectar cuenta de ${platform}`); // Función para conectar cuentas vinculadas
  };

  // Estado de las cuentas conectadas 
  const connectedAccounts = {
    google: true,
    facebook: false,
    twitter: true,
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {/* Información de la cuenta */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Información personal</Text>
                <Image 
                    source={{ uri: userData.profileImage ? userData.profileImage : 'https://via.placeholder.com/100' }} 
                    style={styles.profileImage} 
                  />
                <Text style={styles.info}>Nombre: {userData.nombre}</Text>
                <Text style={styles.info}>Email: {userData.email}</Text>
              
              <Text style={styles.info}>
              Fecha de nacimiento: {selectedDate ? selectedDate.toDateString() : userData.dob}
              </Text>
              <DatePickerComponent
                date={selectedDate || (userData.dob ? new Date(userData.dob) : null)}
                onDateChange={setSelectedDate}
              />
              <Text style={styles.info}>Télefono: {userData.phone}</Text>
            </View>

            {/* Lista de direcciones */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Direcciones</Text>
                {userData.addresses.length > 0 ? (
                  userData.addresses.map((address, index) => (
                    <Text key={index} style={styles.info}>
                      . {address}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.info}>No hay direcciones disponibles</Text>
                )}
              </View>

            {/* Sección de seguridad */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Seguridad</Text>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                  <Text style={styles.buttonText}>Cambiar contraseña</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleToggle2FA}>
                  <Text style={styles.buttonText}>2-Step Verification</Text>
                </TouchableOpacity>
                
              </View>

            {/* Sección de cuentas conectadas */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Connected Accounts</Text>
                {/* Cuentas conectadas */}
                {Object.entries(connectedAccounts).map(([platform, isConnected]) => (
                  <View key={platform} style={styles.account}>
                    <Text>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Text>
                    <TouchableOpacity
                      style={isConnected ? styles.disconnectButton : styles.connectButton}
                      onPress={() =>
                        isConnected ? handleDisconnect(platform) : handleConnect(platform)
                      }
                    >
                      <Text style={styles.buttonText}>
                        {isConnected ? 'Disconnect' : 'Connect'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

            {/* Modal para cambiar la contraseña */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => setModalVisible(false)}
              >
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Cambiar Contraseña</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña Actual"
                  secureTextEntry
                  value={oldPassword}
                  onChangeText={setOldPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nueva Contraseña"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar Nueva Contraseña"
                  secureTextEntry
                  value={confirmNewPassword}
                  onChangeText={setConfirmNewPassword}
                />
                <Button title="Cambiar Contraseña" onPress={handleChangePassword} />
                <Button title="Cancelar" color="red" onPress={() => setModalVisible(false)} />
              </View>
            </Modal>

          </View>

          
        </ScrollView>
        
      </SafeAreaView>
      
    </>
  );
}

// Estilos para el componente AccountSettings
const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20, 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  connectButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  disconnectButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

