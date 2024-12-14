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
    if (!restaurants || restaurants.length === 0) {
        return <Text style={styles.loadingText}>No se encontraron restaurantes.</Text>;
    }

    return (
        <FlatList
          data={restaurants}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <RestaurantCard {...item} />
            </View>
          )}
          keyExtractor={(item, index) => item._id?.toString() || `restaurant-${index}`}
          numColumns={4}
          contentContainerStyle={styles.container}
        />
      );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    item: {
        flex: 1,
        margin: 5,
      },
    loadingText: {
        textAlign: "center",
        marginTop: 20,
    },
});
