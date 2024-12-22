import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Modal,
} from "react-native";
import { IRestaurant } from "../../shared/interfaces/IRestaurant";
import { updateRestaurantService } from "../../services/restaurant.service";

interface RestaurantEditFormProps {
  restaurant: IRestaurant;
  visible: boolean; // Controla la visibilidad del modal
  onUpdate: (updatedRestaurant: IRestaurant) => void;
  onClose: () => void; // Para cerrar el modal
}

export function RestaurantEditForm({
  restaurant,
  visible,
  onUpdate,
  onClose,
}: RestaurantEditFormProps) {
  const [formData, setFormData] = useState<Partial<IRestaurant>>({
    nombre: restaurant.nombre,
    direccion: restaurant.direccion,
    pais: restaurant.pais,
    localidad: restaurant.localidad,
    codigoPostal: restaurant.codigoPostal,
    telefono: restaurant.telefono,
    emailContacto: restaurant.emailContacto,
    logo: restaurant.logo,
    descripcion: restaurant.descripcion,
    estaAbierto: restaurant.estaAbierto,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      nombre: restaurant.nombre,
      direccion: restaurant.direccion,
      pais: restaurant.pais,
      localidad: restaurant.localidad,
      codigoPostal: restaurant.codigoPostal,
      telefono: restaurant.telefono,
      emailContacto: restaurant.emailContacto,
      logo: restaurant.logo,
      descripcion: restaurant.descripcion,
      estaAbierto: restaurant.estaAbierto,
    });
  }, [restaurant]);

  const handleInputChange = (field: keyof IRestaurant, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedData = { ...formData };
      const updatedRestaurant = await updateRestaurantService(
        restaurant._id.toString(),
        updatedData
      );
      onUpdate(updatedRestaurant);
      Alert.alert("Éxito", "Restaurante actualizado correctamente.");
      onClose();
    } catch (error) {
      console.error("Error al actualizar el restaurante:", error);
      Alert.alert("Error", "No se pudo actualizar el restaurante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar Restaurante</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={formData.nombre || ""}
          onChangeText={(value) => handleInputChange("nombre", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={formData.direccion || ""}
          onChangeText={(value) => handleInputChange("direccion", value)}
        />
        {/* Continúan los demás campos... */}
        <Button
          title={loading ? "Guardando..." : "Guardar Cambios"}
          onPress={handleUpdate}
          disabled={loading}
        />
        <Button title="Cancelar" color="red" onPress={onClose} />
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
