import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, Image } from "react-native";
import { getRestaurantByIdService } from "services/restaurant.service";
import { IRestaurant } from "shared/interfaces/IRestaurant";
import { FavoriteButton } from "components/buttons/FavoriteButton"; 
import { ActivityIndicator } from "react-native-paper";

export function RestaurantDetails({ restaurantId }: { restaurantId: string }) {
  const [restaurantInfo, setRestaurantInfo] = useState<Partial<IRestaurant> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurantInfo() {
      try {
        const data = await getRestaurantByIdService(restaurantId);
        setRestaurantInfo(data);
      } catch (error) {
        console.error("Error al obtener información del restaurante:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurantInfo();
  }, [restaurantId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {restaurantInfo && (
        <View style={styles.card}>
          {/* Imagen del restaurante */}
          {restaurantInfo.logo && (
            <Image
              source={{ uri: restaurantInfo.logo }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          {/* Información del restaurante */}
          <Text style={styles.title}>{restaurantInfo.nombre}</Text>
          <Text style={styles.subtitle}>{restaurantInfo.direccion}</Text>

          {/* Descripción del restaurante */}
          {restaurantInfo.descripcion && (
            <Text style={styles.description}>{restaurantInfo.descripcion}</Text>
          )}

          {/* Botón para agregar/eliminar de favoritos */}
          <View style={styles.favoriteButtonContainer}>
            <FavoriteButton restaurantId={restaurantId} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#343a40",
    marginBottom: 20,
    textAlign: "justify",
  },
  favoriteButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});
