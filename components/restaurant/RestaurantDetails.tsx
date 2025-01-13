import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, Image, ScrollView, Modal, Button
} from "react-native";
import { getRestaurantByIdService, isUserManagerService } from "../../services/restaurant.service";
import { IRestaurant } from "../../shared/interfaces/IRestaurant";
import { FavoriteButton } from "../buttons/FavoriteButton";
import { ActivityIndicator } from "react-native-paper";
import { ReservationForm } from "../reservations/ReservationForm";
import { CreateReview } from "../reviews/CreateReviewComponent";
import { useUserRole } from "../../hooks/useUserRole";

interface RestaurantDetailsProps {
  restaurantId: string;
  visible: boolean;
  onClose: () => void;
}

export function RestaurantDetails({
  restaurantId,
  visible,
  onClose,
}: RestaurantDetailsProps) {
  const [restaurantInfo, setRestaurantInfo] = useState<Partial<IRestaurant> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const { userRole, loadingRole } = useUserRole();

  useEffect(() => {
    let isMounted = true;

    async function fetchRestaurantInfo() {
      try {
        const data = await getRestaurantByIdService(restaurantId);
        if (isMounted) {
          setRestaurantInfo(data);
        }
      } catch (error) {
        console.error("Error al obtener información del restaurante:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (visible) {
      fetchRestaurantInfo();
    }

    return () => {
      isMounted = false;
    };
  }, [restaurantId, visible]);

  useEffect(() => {
    async function checkManagerStatus() {
      try {
        if (restaurantId) {
          const isManager = await isUserManagerService(restaurantId);
          setIsManager(isManager); 
        }
      } catch (error) {
        console.error("Error al verificar si el usuario es manager:", error);
      }
    }
  
    checkManagerStatus();
  }, [restaurantId]);

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <Button title="Cerrar" onPress={onClose} color="red" />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator animating={true} size="large" />
            <Text>Cargando...</Text>
          </View>
        ) : restaurantInfo ? (
          <ScrollView>
            <View style={styles.card}>
              {restaurantInfo.logo && (
                <Image
                  source={{ uri: restaurantInfo.logo }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
              <Text style={styles.title}>{restaurantInfo.nombre}</Text>
              <Text style={styles.subtitle}>{restaurantInfo.direccion}</Text>
              {restaurantInfo.descripcion && (
                <Text style={styles.description}>{restaurantInfo.descripcion}</Text>
              )}

              {loadingRole ? (
                <Text>Cargando rol del usuario...</Text>
              ) : (
                <>
                  {userRole === "customer" && (
                    <>
                      <View style={styles.favoriteButtonContainer}>
                        <FavoriteButton restaurantId={restaurantId} />
                      </View>

                      <View style={styles.reviewSection}>
                        <Text style={styles.sectionTitle}>Escribir una Reseña</Text>
                        <CreateReview
                          restaurantId={restaurantId}
                          onReviewCreated={() => alert("Reseña creada correctamente")}
                        />
                      </View>

                      <View style={styles.reservationSection}>
                        <Text style={styles.sectionTitle}>Reservar una Mesa</Text>
                        <ReservationForm
                          restaurantId={restaurantId}
                          onReservationCreated={() => alert("Reserva creada correctamente")}
                        />
                      </View>
                    </>
                  )}

                  {isManager && (
                    <View style={styles.editButtonContainer}>
                      <Button
                        title="Editar Restaurante"
                        onPress={() => alert("Editar restaurante")}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        ) : (
          <Text>No se encontró información del restaurante.</Text>
        )}
      </View>
    </Modal>
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
  reviewSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  reservationSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  editButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
