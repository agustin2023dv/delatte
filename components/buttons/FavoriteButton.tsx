import React, { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { Alert } from "react-native";
import {
  addFavoriteRestaurantService,
  removeFavoriteRestaurantService,
  getUserFavoritesService,
} from "services/user/favorites.service";

interface FavoriteButtonProps {
  restaurantId: string; // El ID del restaurante
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  restaurantId,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Verificar si el restaurante está en favoritos al cargar
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const favorites = await getUserFavoritesService();
        const isFav = favorites.some((fav: any) => fav._id === restaurantId);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [restaurantId]);

  const handleAddToFavorites = async () => {
    try {
      setIsLoading(true);
      await addFavoriteRestaurantService(restaurantId);
      setIsFavorite(true);
      Alert.alert("Éxito", "Restaurante agregado a favoritos");
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
      Alert.alert("Error", "No se pudo agregar a favoritos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      setIsLoading(true);
      await removeFavoriteRestaurantService(restaurantId);
      setIsFavorite(false);
      Alert.alert("Éxito", "Restaurante eliminado de favoritos");
    } catch (error) {
      console.error("Error al eliminar de favoritos:", error);
      Alert.alert("Error", "No se pudo eliminar de favoritos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IconButton
      icon={isFavorite ? "heart" : "heart-outline"}
      iconColor={isFavorite ? "red" : "gray"}
      onPress={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
      disabled={isLoading}
    />
  );
};
