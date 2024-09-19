import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user; // Usuario ya autenticado por authMiddleware
    
    if (!user) {
      return res.status(403).json({ message: 'Usuario no autenticado' }); // Retornar error si no hay usuario autenticado
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' }); // Retornar error si el rol del usuario no está permitido
    }

    next(); // Continuar con la siguiente función
  };
};
