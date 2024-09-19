import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' }); // Retornar error si no hay token
  }

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id); // Buscar el usuario en la base de datos

    if (!user) {
      return res.status(401).json({ message: 'Token inválido' }); // Retornar error si el usuario no existe
    }

    // Adjuntar el usuario autenticado al objeto request
    (req as any).user = user;
    next(); // Continuar con la siguiente función
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};
