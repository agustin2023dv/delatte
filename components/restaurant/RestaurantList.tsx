import React from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import { IRestaurant } from "shared/interfaces/IRestaurant";
import { RestaurantCard } from "components/restaurant/RestaurantCard";

interface RestaurantListProps {
    restaurants: Partial<IRestaurant>[];
    loading?: boolean;
}

export function RestaurantList({ restaurants, loading = false }: RestaurantListProps) {
    if (loading) {
        return <Text style={styles.loadingText}>Cargando restaurantes...</Text>;
    }

    return (
        <FlatList
            data={restaurants}
            renderItem={({ item }) => <RestaurantCard {...item} />}
            keyExtractor={(item) => item._id?.toString() || ""}
            numColumns={4} 
            contentContainerStyle={styles.container}
        />
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
