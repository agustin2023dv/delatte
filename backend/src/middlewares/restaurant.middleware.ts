import { Request, Response, NextFunction } from 'express';
import { Restaurant } from '../models/Restaurant';

// Middleware para verificar si el usuario es el manager del restaurante
export const managerOfRestaurantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; // Usuario ya autenticado por authMiddleware

  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    // Verificar si el usuario autenticado es uno de los managers del restaurante
    const isManager = restaurant.managers.some((managerId) => managerId.toString() === user._id.toString());

    if (!isManager && user.role !== 'superadmin') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }

    next(); // El usuario es el manager del restaurante o es un superadmin, continuar
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar el manager del restaurante', error });
  }
};