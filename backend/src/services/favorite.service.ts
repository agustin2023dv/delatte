import { ObjectId } from "mongoose";
import User from "../models/User.model";


// Servicio para agregar un restaurante a favoritos
export const addFavoriteRestaurantService = async (userId: string, restaurantId: ObjectId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    
    // Agregar el restaurante a favoritos si no existe ya
    if (!user.favoriteRestaurants!.includes(restaurantId)) {
      await user.favoriteRestaurants!.push(restaurantId);
      await user.save();
    }
  
    return user;
  };
  
  // Servicio para eliminar un restaurante de favoritos
  export const removeFavoriteRestaurantService = async (userId: string, restaurantId: ObjectId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    // Eliminar el restaurante de favoritos si existe
  
    if (user.favoriteRestaurants!.includes(restaurantId)) {
      user.updateOne({
        $pull: {
          favoriteRestaurants: restaurantId,
        }
      })
    }
  
  
    return user;
  };
  