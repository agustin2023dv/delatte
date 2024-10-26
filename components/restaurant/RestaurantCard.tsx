import { getRestaurantByIdService } from "@/app/services/restaurant.service";
import { useEffect, useState } from "react";
import {Image} from "react-native";
import { Button, Card,Text } from "react-native-paper";
import { IRestaurant } from "shared/interfaces/IRestaurant";


export function RestaurantCard({ restaurantId }: { restaurantId: string }) {

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


    if(restaurantInfo){

        return (
            <Card >
                
              <Card.Title title={restaurantInfo.nombre}/>
              
              <Card.Content>
                  <Image source={{ uri: restaurantInfo.logo }}  />
                  <Text>{restaurantInfo.calificacion} ★</Text>
                  <Text>{restaurantInfo.direccion}</Text>
              </Card.Content>
      
              <Card.Actions>
                  <Button>Ok</Button>
              </Card.Actions>
            
            </Card>
          );
        }
    }
    