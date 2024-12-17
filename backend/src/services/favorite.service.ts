import mongoose, { ObjectId } from "mongoose";
import User from "../models/User.model";



export const getUserFavoritesService = async (userId: string) => {
  const user = await User.findById(userId).populate("favoriteRestaurants");

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user.favoriteRestaurants; // Devuelve la lista de favoritos
};

// Servicio para agregar un restaurante a favoritos
export const addFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
  try {
    // Validar que el restaurantId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      throw new Error('ID de restaurante no válido');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Agregar el restaurante a favoritos si no existe ya
    if (!user.favoriteRestaurants.includes(restaurantId as unknown as ObjectId)) {
      user.favoriteRestaurants.push(restaurantId as unknown as ObjectId);
      await user.save();
    }

    return { message: "Restaurante agregado a favoritos", favorites: user.favoriteRestaurants };
  } catch (error) {
    console.error("Error en addFavoriteRestaurantService:", error);
    throw new Error(error.message);
  }
};

// Servicio para eliminar un restaurante de favoritos
export const removeFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
  try {
    // Validar que el restaurantId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      throw new Error('ID de restaurante no válido');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Eliminar el restaurante de favoritos si existe
    if (user.favoriteRestaurants.includes(restaurantId as unknown as ObjectId)) {
      user.favoriteRestaurants = user.favoriteRestaurants.filter(
        (id) => id.toString() !== restaurantId
      );
      await user.save();
    }

    return { message: "Restaurante eliminado de favoritos", favorites: user.favoriteRestaurants };
  } catch (error) {
    console.error("Error en removeFavoriteRestaurantService:", error);
    throw new Error(error.message);
  }
};
