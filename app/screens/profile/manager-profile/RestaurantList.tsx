import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import { IRestaurant } from '../../../../shared/interfaces/IRestaurant'; 
import { getRestaurantsByManagerService } from '@/app/services/restaurant.service'; 
import { useAuth } from '../../../contexts/AuthContext'; 

export default function RestaurantList() {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        if (user?.id) {
          const response = await getRestaurantsByManagerService(user.id); // Pasar el ID del manager a la API
          setRestaurants(response);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchRestaurants(); // Llamar a la función solo si hay un usuario autenticado
    }
  }, [user]);

  const handleUpdateRestaurant = async()=> {
    
  }
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Cargando restaurantes...</Text>
      ) : (
        restaurants.map((restaurant) => (
          <View key={restaurant.id} style={styles.restaurantItem}>
            <Text style={styles.restaurantName}>{restaurant.nombre}</Text>
            <Text style={styles.restaurantDetails}>Dirección: {restaurant.direccion}</Text>
            <Text style={styles.restaurantDetails}>Capacidad: {restaurant.capacidadMesas?.length} mesas</Text>
            <Button title="Editar" onPress={handleUpdateRestaurant}/>
          </View>
        ))
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  restaurantItem: {
    marginBottom: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  restaurantDetails: {
    fontSize: 14,
    color: '#555',
  },
});
