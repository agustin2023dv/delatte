import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { createReservationService } from "../../services/reservation.service";

interface ReservationFormProps {
  restaurantId: string;
  onReservationCreated?: () => void; 
}

export const ReservationForm: React.FC<ReservationFormProps> = ({
  restaurantId,
  onReservationCreated,
}) => {
  const [date, setDate] = useState<string>(""); // Fecha de la reserva
  const [time, setTime] = useState<string>(""); // Hora de la reserva
  const [numAdults, setNumAdults] = useState<string>("1"); // Número de adultos
  const [numChildren, setNumChildren] = useState<string>("0"); // Número de niños
  const [specialRequests, setSpecialRequests] = useState<string>(""); // Notas opcionales
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReservation = async () => {
    // Validación inicial en el frontend (opcional, pero recomendable)
    if (!date || !time || !numAdults) {
      Alert.alert("Error", "Debe completar todos los campos obligatorios.");
      return;
    }

    try {
      setIsLoading(true);

      const reservationData = {
        restaurante: restaurantId,
        fecha: date,
        horario: time,
        numAdultos: Number(numAdults),
        numNinos: Number(numChildren),
        pedidosEspeciales: specialRequests,
      };

      // Enviar los datos al backend
      await createReservationService(reservationData);
      Alert.alert("Éxito", "Reserva creada correctamente.");
      if (onReservationCreated) onReservationCreated();

      // Resetear el formulario
      setDate("");
      setTime("");
      setNumAdults("1");
      setNumChildren("0");
      setSpecialRequests("");
    } catch (error: any) {
      // Manejar errores del backend
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "No se pudo completar la reserva.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
      />
      <Text style={styles.label}>Hora:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:mm"
        value={time}
        onChangeText={setTime}
      />
      <Text style={styles.label}>Número de Adultos:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numAdults}
        onChangeText={setNumAdults}
      />
      <Text style={styles.label}>Número de Niños:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numChildren}
        onChangeText={setNumChildren}
      />
      <Text style={styles.label}>Pedidos Especiales (Opcional):</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={specialRequests}
        onChangeText={setSpecialRequests}
        multiline
      />
      <Button
        title={isLoading ? "Enviando..." : "Reservar Mesa"}
        onPress={handleReservation}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "white", borderRadius: 10 },
  label: { fontSize: 16, marginVertical: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: { height: 60, textAlignVertical: "top" },
});
