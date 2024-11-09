import React, { useEffect, useState } from "react";
import {  Text, StyleSheet, FlatList, View } from "react-native";
import { getAllRestaurantsService } from "@/app/services/restaurant.service";
import { IRestaurant } from "shared/interfaces/IRestaurant";
import { RestaurantCard } from "components/restaurant/RestaurantCard";

export function RestaurantList() {
    const [restaurants, setRestaurants] = useState<Partial<IRestaurant>[]>([]);
    const [loading, setLoading] = useState(true);
 
    
    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const data = await getAllRestaurantsService();
                console.log("Datos de restaurantes:", data);
                setRestaurants(data); 
            } catch (error) {
                console.error("Error al obtener XX restaurantes:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRestaurants();
    }, []);

    if (loading) {
        return <Text style={styles.loadingText}>Cargando restaurantes...</Text>;
    }


    return (
        <>

        <FlatList
            data={restaurants}
            renderItem={({ item }) => <RestaurantCard {...item} />}
            keyExtractor={(item) => item._id?.toString() || ""}
            numColumns={5}
            contentContainerStyle={styles.container}
        />




        </>
            
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    loadingText: {
        textAlign: "center",
        marginTop: 20,
    },
});


