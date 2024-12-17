import { Request, Response } from "express";
import {
  addFavoriteRestaurantService,
  getUserFavoritesService,
  removeFavoriteRestaurantService,
} from "../services/favorite.service";


// **Controlador para obtener favoritos del usuario**
export const getUserFavoritesController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const favorites = await getUserFavoritesService(userId);

    return res.status(200).json({
      favorites,
    });
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno del servidor",
    });
  }
};

// **Controlador para agregar un restaurante a favoritos**
export const addFavoriteRestaurantController = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id; // Asegúrate de obtener el ID del usuario desde el token o sesión
      const { restaurantId } = req.body; // ID del restaurante enviado en el cuerpo de la solicitud
  
      if (!restaurantId) {
        return res.status(400).json({ message: 'El ID del restaurante es obligatorio' });
      }
  
      // Llamar al servicio para agregar el restaurante a favoritos
      const user = await addFavoriteRestaurantService(userId, restaurantId);
  
      return res.status(200).json({
        message: 'Restaurante agregado a favoritos con éxito',
        favorites: user.favorites,
      });
    } catch (error) {
      console.error('Error en addFavoriteRestaurantController:', error);
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Error interno del servidor',
      });
    }
  };
  
  // **Controlador para eliminar un restaurante de favoritos**
  export const removeFavoriteRestaurantController = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id; // Asegúrate de obtener el ID del usuario desde el token o sesión
      const { restaurantId } = req.body; // ID del restaurante enviado en el cuerpo de la solicitud
  
      if (!restaurantId) {
        return res.status(400).json({ message: 'El ID del restaurante es obligatorio' });
      }
  
      // Llamar al servicio para eliminar el restaurante de favoritos
      const user = await removeFavoriteRestaurantService(userId, restaurantId);
  
      return res.status(200).json({
        message: 'Restaurante eliminado de favoritos con éxito',
        favorites: user.favorites,
      });
    } catch (error) {
      console.error('Error en removeFavoriteRestaurantController:', error);
      return res.status(500).json({
        message: error instanceof Error ? error.message : 'Error interno del servidor',
      });
    }
  };