import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Button, View, TextInput } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { IRestaurant } from '../../../../shared/interfaces/IRestaurant';
import { getRestaurantsByManagerService, updateRestaurantService } from '@/app/services/restaurant.service';
import { useAuth } from '../../../contexts/AuthContext';

export default function RestaurantList() {
  const { userId } = useAuth();
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Controla si estamos editando
  const [editableRestaurant, setEditableRestaurant] = useState<Partial<IRestaurant>>({}); // Almacena los datos editados del restaurante

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        if (userId) {
          const response = await getRestaurantsByManagerService(userId);
          setRestaurants(response);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      fetchRestaurants();
    }
  }, [userId]);

  const handleUpdateRestaurant = async (restaurantId: string) => {
    try {
      const updatedData: Partial<IRestaurant> = {
        nombre: editableRestaurant.nombre ,// Valores actuales o anteriores si no se editan
        direccion: editableRestaurant.direccion
      };
  
      const updatedRestaurant = await updateRestaurantService(restaurantId, updatedData);
      console.log('Restaurante actualizado:', updatedRestaurant);
      setIsEditing(false); // Desactivar el modo de edición
    } catch (error) {
      console.error('Error al actualizar el restaurante:', error);
    }
  };

  const handleEditButtonPress = (restaurant: Partial<IRestaurant>) => {
    setIsEditing(true);
    setEditableRestaurant(restaurant); 
  };

  const handleInputChange = (field: keyof IRestaurant, value: string | boolean) => {
    setEditableRestaurant({ ...editableRestaurant, [field]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Cargando restaurantes...</Text>
      ) : (
        <View style={styles.cardWrapper}>
          {restaurants.map((restaurant) => (
            <Card key={restaurant._id || restaurant.id} style={styles.restaurantCard}>
              <Card.Cover source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
              <Card.Content>
                {isEditing ? (
                  <>
                    <TextInput
                      style={styles.input}
                      value={editableRestaurant.nombre || restaurant.nombre}
                      onChangeText={(text) => handleInputChange('nombre', text)}
                    />
                    <TextInput
                      style={styles.input}
                      value={editableRestaurant.direccion || restaurant.direccion}
                      onChangeText={(text) => handleInputChange('direccion', text)}
                    />
                  </>
                ) : (
                  <>
                    <Title>{restaurant.nombre}</Title>
                    <Paragraph>Dirección: {restaurant.direccion}</Paragraph>
                    <Paragraph>Capacidad: {restaurant.capacidadMesas?.length} mesas</Paragraph>
                    <Paragraph>Estado: {restaurant.estaAbierto ? 'Abierto' : 'Cerrado'}</Paragraph>
                  </>
                )}
              </Card.Content>
              <Card.Actions>
                {isEditing ? (
                  <Button title="Guardar" onPress={() => handleUpdateRestaurant(restaurant._id || restaurant.id)} />
                ) : (
                  <Button title="Gestionar" onPress={() => handleEditButtonPress(restaurant)} />
                )}
              </Card.Actions>
            </Card>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  cardWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  restaurantCard: {
    width: '35%',
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileImage: {
    height: 200, // Mantener el tamaño de la imagen
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
