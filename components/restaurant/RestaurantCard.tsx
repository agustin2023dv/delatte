import React from "react";
import { Card, Text } from "react-native-paper";
import { IRestaurant } from "../../shared/interfaces/IRestaurant";
import { Button } from "react-native";

interface RestaurantCardProps {
  restaurant: IRestaurant;
  showEditButton?: boolean;
  onEditPress?: (restaurant: IRestaurant) => void;
  onDetailsPress?: (restaurant: IRestaurant) => void; 
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  showEditButton = false,
  onEditPress,
  onDetailsPress, // Recibir el nuevo prop
}) => {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={restaurant.nombre} />
      <Card.Content>
        <Text>{`Dirección: ${restaurant.direccion}`}</Text>
      </Card.Content>
      <Card.Actions>
        {showEditButton && onEditPress && (
          <Button title="Editar" onPress={() => onEditPress(restaurant)} />
        )}
        {onDetailsPress && ( // Botón "Ver detalles"
          <Button title="Ver detalles" onPress={() => onDetailsPress(restaurant)} />
        )}
      </Card.Actions>
    </Card>
  );
};