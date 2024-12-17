import React from "react";
import { IRestaurant } from "shared/interfaces/IRestaurant";
import { Card, Text, Button } from "react-native-paper";
import { Alert, Image } from "react-native";
import { createReservation } from "services/reservation.service";
import { FavoriteButton } from "components/buttons/FavoriteButton";

type RestaurantCardProps = Partial<IRestaurant>;

export function RestaurantCard({
  _id,
  nombre,
  direccion,
  logo,
}: RestaurantCardProps) {
  const handleReserveTable = async () => {
    try {
      const reservationData = {
        restauranteId: _id,
        dia: new Date().toISOString().split("T")[0],
        horario: "19:00",
        numAdultos: 2,
        numNinos: 1,
      };
      await createReservation(reservationData);
      Alert.alert("Éxito", "Reserva creada con éxito");
    } catch (error) {
      Alert.alert("Error", "No se pudo reservar la mesa");
    }
  };

  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={nombre} />
      <Card.Content>
        <Image source={{ uri: logo }} style={{ height: 100, width: "100%" }} />
        <Text>{direccion}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleReserveTable}>Reservar Mesa</Button>
        <FavoriteButton restaurantId={_id!.toString()}/>
      </Card.Actions>
    </Card>
  );
}
