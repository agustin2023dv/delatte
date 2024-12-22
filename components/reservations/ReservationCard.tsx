import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { IReservation } from '../../shared/interfaces/IReservation';
import { cancelReservationService, modifyReservationService } from '../../services/reservation.service';

interface ReservationCardProps {
  reservation: IReservation;
  onReservationUpdated: (updatedReservation: IReservation) => void; // Callback para actualizar la lista
  onReservationDeleted: (reservationId: string) => void; // Callback para eliminar una reserva
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onReservationUpdated,
  onReservationDeleted,
}) => {
  const isFutureReservation = new Date(reservation.fecha) > new Date();

  // Manejar la edición de una reserva
  const handleEditReservation = async () => {
    try {
      const updatedData: Partial<IReservation> = {
        numAdultos: reservation.numAdultos + 1, // Ejemplo de actualización
        horario: reservation.horario,
      };

      const updatedReservation = await modifyReservationService(
        reservation._id?.toString() || '',
        updatedData
      );
      onReservationUpdated(updatedReservation);
      Alert.alert('Éxito', 'Reserva modificada correctamente.');
    } catch (error) {
      console.error('Error al modificar la reserva:', error);
      Alert.alert('Error', 'No se pudo modificar la reserva.');
    }
  };

  // Manejar la cancelación de una reserva
  const handleCancelReservation = async () => {
    try {
      await cancelReservationService(reservation._id?.toString() || '');
      onReservationDeleted(reservation._id?.toString() || '');
      Alert.alert('Éxito', 'Reserva cancelada correctamente.');
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      Alert.alert('Error', 'No se pudo cancelar la reserva.');
    }
  };

  return (
    <View style={styles.card}>
      <Text>{`Restaurante: ${reservation.restaurante}`}</Text>
      <Text>{`Fecha: ${new Date(reservation.fecha).toLocaleDateString()}`}</Text>
      <Text>{`Hora: ${reservation.horario}`}</Text>
      <Text>{`Adultos: ${reservation.numAdultos}, Niños: ${reservation.numNinos}`}</Text>

      <View style={styles.actions}>
        <Button
          title="Detalles"
          onPress={() => Alert.alert('Detalles', JSON.stringify(reservation, null, 2))}
        />
        {isFutureReservation && (
          <>
            <Button title="Editar" onPress={handleEditReservation} />
            <Button title="Cancelar" onPress={handleCancelReservation} />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default ReservationCard;
