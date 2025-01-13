import React from "react";
import { Card, Text } from "react-native-paper";
import { IRestaurant } from "../../shared/interfaces/IRestaurant";
import { Button } from "react-native";

interface RestaurantCardProps {
  restaurant: IRestaurant;
  onDetailsPress?: (restaurant: IRestaurant) => void; 
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onDetailsPress, 
}) => {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Cover source={{ uri: restaurant.logo }} />
      <Card.Title title={restaurant.nombre} />
      <Card.Content>
        <Text>{`Dirección: ${restaurant.direccion}`}</Text>
      </Card.Content>
      <Card.Actions>
        {onDetailsPress && ( // Botón "Ver detalles"
          <Button title="Ver detalles" onPress={() => onDetailsPress(restaurant)} />
        )}
      </Card.Actions>
    </Card>
  );
};