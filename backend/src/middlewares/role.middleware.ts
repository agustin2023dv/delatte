import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      console.error('Acceso denegado: Usuario no autenticado');
      return res.status(403).json({ message: 'Usuario no autenticado' });
    }

    if (!roles.includes(user.role)) {
      console.error(`Acceso denegado: Rol ${user.role} no tiene permisos para esta ruta`);
      return res.status(403).json({ message: `Rol ${user.role} no autorizado` });
    }

    console.log(`Acceso permitido: Usuario ${user.id} con rol ${user.role}`);
    next();
  };
};

