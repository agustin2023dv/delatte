import mongoose, { ObjectId } from "mongoose";
import User from "../models/User.model";



export const getUserFavoritesService = async (userId: string) => {
  const user = await User.findById(userId).populate("favoriteRestaurants");

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  return user.favoriteRestaurants; // Devuelve la lista de favoritos
};

export const addFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      throw new Error('ID de restaurante no válido');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Asegurar que `favoriteRestaurants` no es undefined
    if (!user.favoriteRestaurants) {
      user.favoriteRestaurants = [];
    }

    if (!user.favoriteRestaurants.includes(restaurantId as unknown as ObjectId)) {
      user.favoriteRestaurants.push(restaurantId as unknown as ObjectId);
      await user.save();
    }

    return { message: "Restaurante agregado a favoritos", favorites: user.favoriteRestaurants };
  } catch (error) {
    console.error("Error en addFavoriteRestaurantService:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Error desconocido");
  }
};

export const removeFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      throw new Error('ID de restaurante no válido');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Asegurar que `favoriteRestaurants` no es undefined
    if (!user.favoriteRestaurants) {
      user.favoriteRestaurants = [];
    }

    if (user.favoriteRestaurants.includes(restaurantId as unknown as ObjectId)) {
      user.favoriteRestaurants = user.favoriteRestaurants.filter(
        (id) => id.toString() !== restaurantId
      );
      await user.save();
    }

    return { message: "Restaurante eliminado de favoritos", favorites: user.favoriteRestaurants };
  } catch (error) {
    console.error("Error en removeFavoriteRestaurantService:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Error desconocido");
  }
};
