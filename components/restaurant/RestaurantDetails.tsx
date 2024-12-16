import React from 'react';
import { useEffect, useState } from 'react';
import { View,SafeAreaView,Text,StyleSheet } from 'react-native';
import { getRestaurantByIdService } from 'services/restaurant.service';
import { IRestaurant } from 'shared/interfaces/IRestaurant';


export function RestaurantDetails({ restaurantId }: { restaurantId: string }) {
    const [restaurantInfo, setRestaurantInfo] = useState<Partial<IRestaurant> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRestaurantInfo() {
            try {
                const data = await getRestaurantByIdService(restaurantId);
                setRestaurantInfo(data); 
            } catch (error) {
                console.error('Error al obtener información del restaurante:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRestaurantInfo();
    }, [restaurantId]);

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    return (
        <>
          <SafeAreaView>
            <View>
            {restaurantInfo &&
                    Object.entries(restaurantInfo).map(([key, value], index) => (
                        <Text key={`${key}-${index}`}>
                        {`${key}: ${JSON.stringify(value)}`}
                        </Text>
                    ))}
            </View>
          </SafeAreaView>
        </>
      );
} 

const styles = StyleSheet.create({})