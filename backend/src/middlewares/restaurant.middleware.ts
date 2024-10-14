import { Request, Response, NextFunction } from 'express';
import { Restaurant } from '../models/Restaurant';

/* Middleware para verificar si el usuario es el manager del restaurante*/
export const managerOfRestaurantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; // Usuario ya autenticado por authMiddleware

  if (!user) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }

  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Verificar si el campo "managers" está definido y no es vacío
    if (!restaurant.managers || restaurant.managers.length === 0) {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    // Verificar si el usuario autenticado es uno de los managers del restaurante
    const isManager = restaurant.managers.some((managerId) => managerId.toString() === user._id.toString());


    // Verificar si el usuario tiene el rol de manager del restaurante o es superadmin
    if (!isManager && user.role !== 'superadmin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    next(); // El usuario es el manager del restaurante o es un superadmin, continuar
  } catch (error) {
    console.error('Error en el middleware managerOfRestaurant:', error);
    return res.status(500).json({ message: 'Error al verificar el manager del restaurante', error });
  }
};
