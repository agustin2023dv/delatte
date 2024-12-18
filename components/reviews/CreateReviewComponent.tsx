import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import { createReviewService } from "services/review.service";


interface CreateReviewProps {
  restaurantId: string; // ID del restaurante para asociar la reseña
  onReviewCreated?: () => void; // Callback opcional después de crear la reseña
}

export const CreateReview: React.FC<CreateReviewProps> = ({
  restaurantId,
  onReviewCreated,
}) => {
  const [rating, setRating] = useState<string>(""); // Calificación
  const [comment, setComment] = useState<string>(""); // Comentario
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!rating || !comment) {
      Alert.alert("Error", "Debe completar todos los campos.");
      return;
    }

    try {
      setIsLoading(true);
      const reviewData = {
        restaurante: restaurantId,
        calificacion: Number(rating),
        comentario: comment,
      };
      await createReviewService(reviewData);
      Alert.alert("Éxito", "Reseña creada correctamente.");
      if (onReviewCreated) onReviewCreated(); 
      setRating("");
      setComment("");
    } catch (error) {
      console.error("Error al crear la reseña:", error);
      Alert.alert("Error", "No se pudo crear la reseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calificación (1-5):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese una calificación"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
      <Text style={styles.label}>Comentario:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escriba su reseña"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button
        title={isLoading ? "Enviando..." : "Enviar Reseña"}
        onPress={handleSubmit}
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
  textArea: { height: 80, textAlignVertical: "top" },
});
