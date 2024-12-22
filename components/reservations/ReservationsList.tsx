import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { IReservation } from '../../shared/interfaces/IReservation';
import ReservationCard from './ReservationCard';

interface ReservationsListProps {
  reservations: IReservation[];
  onReservationUpdated: (updatedReservation: IReservation) => void; // Callback para actualizar
  onReservationDeleted: (reservationId: string) => void; // Callback para eliminar
}

const ReservationsList: React.FC<ReservationsListProps> = ({
  reservations,
  onReservationUpdated,
  onReservationDeleted,
}) => {
  return (
    <FlatList
      data={reservations}
      renderItem={({ item }) => (
        <ReservationCard
          reservation={item}
          onReservationUpdated={onReservationUpdated}
          onReservationDeleted={onReservationDeleted}
        />
      )}
      keyExtractor={(item) => item._id?.toString() || ''}
      ListEmptyComponent={<Text style={styles.emptyText}>No hay reservas disponibles.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});

export default ReservationsList;
