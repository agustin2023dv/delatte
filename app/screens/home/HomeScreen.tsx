import { getAllRestaurantsService } from "@/app/services/restaurant.service";
import { useEffect, useState } from "react";
import { IRestaurant } from "shared/interfaces/IRestaurant";
import {  Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RestaurantCard } from "components/restaurant/RestaurantCard";
import { ScrollView } from "react-native";


export default function HomeScreen(){

    const [restaurantsInfo, setRestaurantsInfo] = useState<Partial<IRestaurant> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRestaurantsInfo() {
            try {
                const data = await getAllRestaurantsService();
                setRestaurantsInfo(data); 
            } catch (error) {
                console.error('Error al obtener información del restaurante:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRestaurantsInfo();
    }, []);

    if (loading) {
        return <Text>Cargando restaurantes...</Text>;
    }

    if(restaurantsInfo){

        return(<>
            <SafeAreaView>
        
                    <ScrollView>
       
                    </ScrollView>
        
        
            </SafeAreaView>
            
            </>)

    }
   
}