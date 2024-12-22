import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { IRestaurant } from "../../../shared/interfaces/IRestaurant";
import { getRestaurantsByManagerService } from "services/restaurant.service";
import { useAuth } from "contexts/AuthContext";
import RestaurantsList from "../../../components/restaurant/RestaurantList";
import { RestaurantEditForm } from "../../../components/restaurant/RestaurantEditForm";

const ManagerRestaurantsTab: React.FC = () => {
  const { userId } = useAuth();
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [editingRestaurant, setEditingRestaurant] = useState<IRestaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        if (userId) {
          const response = await getRestaurantsByManagerService(userId);
          setRestaurants(response);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [userId]);

  const handleRestaurantUpdate = (updatedRestaurant: IRestaurant) => {
    setRestaurants((prev) =>
      prev.map((restaurant) =>
        restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
      )
    );
    setEditingRestaurant(null);
  };

  const handleEditPress = (restaurant: IRestaurant) => {
    setEditingRestaurant(restaurant);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantsList
        restaurants={restaurants}
        isManagerView={true} // Vista del manager
        onEditPress={handleEditPress} // Acción para editar
      />

      {editingRestaurant && (
        <RestaurantEditForm
          restaurant={editingRestaurant}
          visible={true}
          onUpdate={handleRestaurantUpdate}
          onClose={() => setEditingRestaurant(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ManagerRestaurantsTab;
