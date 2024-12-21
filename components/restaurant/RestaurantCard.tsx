import React from "react";
import { IRestaurant } from "shared/interfaces/IRestaurant";
import { Card, Text } from "react-native-paper";
import { Image } from "react-native";
import { FavoriteButton } from "components/buttons/FavoriteButton";

type RestaurantCardProps = Partial<IRestaurant>;

export function RestaurantCard({
  _id,
  nombre,
  direccion,
  logo,
}: RestaurantCardProps) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={nombre} />
      <Card.Content>
        {/* Imagen del restaurante */}
        <Image source={{ uri: logo }} style={{ height: 100, width: "100%" }} />
        {/* Dirección */}
        <Text>{direccion}</Text>
      </Card.Content>
      <Card.Actions>
        {/* Botón para favoritos */}
        <FavoriteButton restaurantId={_id!.toString()} />
      </Card.Actions>
    </Card>
  );
}
