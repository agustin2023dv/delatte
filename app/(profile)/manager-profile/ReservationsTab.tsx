import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchUserReservationsService } from 'services/reservation.service';
import { IReservation } from 'shared/interfaces/IReservation';
import ReservationsList from '../../../components/reservations/ReservationsList';

const ReservationsTab: React.FC = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const data = await fetchUserReservationsService();
        setReservations(data);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
        Alert.alert('Error', 'No se pudieron cargar las reservas.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleReservationUpdated = (updatedReservation: IReservation) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation._id === updatedReservation._id ? updatedReservation : reservation
      )
    );
  };

  const handleReservationDeleted = (reservationId: string) => {
    setReservations((prev) => prev.filter((reservation) => reservation._id !== reservationId));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReservationsList
        reservations={reservations}
        onReservationUpdated={handleReservationUpdated}
        onReservationDeleted={handleReservationDeleted}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ReservationsTab;
