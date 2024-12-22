import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getUserAddressesService } from "../../services/user/address.service";

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const data = await getUserAddressesService(); // Llama al servicio para obtener direcciones
        setAddresses(data);
      } catch (error: any) {
        Alert.alert("Error", error.message || "No se pudieron cargar las direcciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressPress = (address: string) => {
    Alert.alert("Seleccionado", `Seleccionaste: ${address}`);
    navigation.goBack(); // Volver a la pantalla anterior
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.addressItem} onPress={() => handleAddressPress(item)}>
      <Text style={styles.addressText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Direcciones Guardadas</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando...</Text>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  addressItem: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginVertical: 8,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
});
