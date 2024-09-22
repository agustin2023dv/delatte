import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Dimensions, Alert, TextInput } from 'react-native';
import { fetchUserReservations, cancelReservation, modifyReservation } from '../../../services/reservation.service'; 
import { validateFecha, validateHorario, validateNumAdultos, validateNumNinos } from 'shared/utils/reservation.validation';

const ReservationsTab = () => {
  const [futureReservations, setFutureReservations] = useState([]); // Reservas futuras
  const [pastReservations, setPastReservations] = useState([]); // Reservas pasadas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [editingReservation, setEditingReservation] = useState<any | null>(null); // Reserva en edición

  const screenWidth = Dimensions.get('window').width; // Ancho de la pantalla para ajustar el diseño
  const isWeb = screenWidth >= 800; 

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetchUserReservations();
        const reservations = response.data;

        const future = reservations.filter((reservation: { pasada: Boolean }) => !reservation.pasada);
        const past = reservations.filter((reservation: { pasada: Boolean }) => reservation.pasada);

        setFutureReservations(future);
        setPastReservations(past);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
        Alert.alert('Error', 'No se pudieron cargar las reservas');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Función para cancelar una reserva
  const handleCancelReservation = async (reservationId: string) => {
    try {
      await cancelReservation(reservationId);
      Alert.alert('Cancelación exitosa', 'La reserva ha sido cancelada');

    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      Alert.alert('Error', 'No se pudo cancelar la reserva');
    }
  };

  // Función para modificar una reserva
  const handleModifyReservation = async (reservationId: string) => {
    try {
      const updatedData = {
        dia: editingReservation.dia,
        horario: editingReservation.horario,
        numAdultos: editingReservation.numAdultos,
        numNinos: editingReservation.numNinos,
      };
  
      // Validaciones
      const fechaError = validateFecha(updatedData.dia);
      const horarioError = validateHorario(updatedData.horario);
      const adultosError = validateNumAdultos(updatedData.numAdultos);
      const ninosError = validateNumNinos(updatedData.numNinos);
  
      // Si hay errores, muestra una alerta y detén el proceso
      if (fechaError || horarioError || adultosError || ninosError) {
        Alert.alert('Error en la reserva', `${fechaError || ''} ${horarioError || 
          ''} ${adultosError || ''} ${ninosError || ''}`);
        return;
      }
  
      // Si las validaciones pasan, procede con la modificación
      await modifyReservation(reservationId, updatedData);
      Alert.alert('Modificación exitosa', 'La reserva ha sido modificada');
      setEditingReservation(null); // Finaliza la edición
    } catch (error) {
      console.error('Error al modificar la reserva:', error);
      Alert.alert('Error', 'No se pudo modificar la reserva');
    }
  };

  // Función para habilitar la edición de una reserva
  const handleEditReservation = (reservation: any) => {
    setEditingReservation(reservation);
  };

  // Renderizado de cada reserva
  const renderReservationItem = ({ item }: { item: any }) => (
    <View style={styles.reservationItem}>
      {/* Si esta reserva está en edición, mostrar los inputs */}
      {editingReservation?._id === item._id ? (
        <>
          <TextInput
            style={styles.input}
            value={editingReservation.dia}
            placeholder="Fecha (YYYY-MM-DD)"
            onChangeText={text => setEditingReservation({ ...editingReservation, dia: text })}
          />
          <TextInput
            style={styles.input}
            value={editingReservation.horario}
            placeholder="Hora"
            onChangeText={text => setEditingReservation({ ...editingReservation, horario: text })}
          />
          <TextInput
            style={styles.input}
            value={String(editingReservation.numAdultos)}
            placeholder="Adultos"
            keyboardType="numeric"
            onChangeText={text => setEditingReservation({ ...editingReservation, numAdultos: parseInt(text) })}
          />
          <TextInput
            style={styles.input}
            value={String(editingReservation.numNinos)}
            placeholder="Niños"
            keyboardType="numeric"
            onChangeText={text => setEditingReservation({ ...editingReservation, numNinos: parseInt(text) })}
          />
          <Button title="Guardar Cambios" onPress={() => handleModifyReservation(item._id)} />
          <Button title="Cancelar Edición" onPress={() => setEditingReservation(null)} />
        </>
      ) : (
        <>
          <Text>{`Restaurante: ${item.restaurante}`}</Text>
          <Text>{`Fecha: ${new Date(item.dia).toLocaleDateString()}`}</Text>
          <Text>{`Hora: ${item.horario}`}</Text>
          <Text>{`Cantidad adultos: ${item.numAdultos}`}</Text>
          <Text>{`Cantidad niños: ${item.numNinos}`}</Text>

          {/* Mostrar botones de "Modificar" y "Cancelar" solo si la reserva es futura */}
          {!item.pasada && (
            <>
              <Button title="Modificar" onPress={() => handleEditReservation(item)} />
              <Button title="Cancelar" onPress={() => handleCancelReservation(item._id)} />
            </>
          )}
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando reservas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={isWeb ? styles.webContainer : styles.mobileContainer}>
        <View style={styles.reservationColumn}>
          <Text style={styles.title}>Reservas Futuras</Text>
          <FlatList
            data={futureReservations}
            keyExtractor={item => item._id}
            renderItem={renderReservationItem}
            ListEmptyComponent={<Text>No tienes reservas futuras.</Text>}
          />
        </View>
        <View style={styles.reservationColumn}>
          <Text style={styles.title}>Reservas Pasadas</Text>
          <FlatList
            data={pastReservations}
            keyExtractor={item => item._id}
            renderItem={renderReservationItem}
            ListEmptyComponent={<Text>No tienes reservas pasadas.</Text>}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  webContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  mobileContainer: { flexDirection: 'column' },
  reservationColumn: { flex: 1, margin: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  reservationItem: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginVertical: 5 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 5, borderRadius: 5 },
});

export default ReservationsTab;
