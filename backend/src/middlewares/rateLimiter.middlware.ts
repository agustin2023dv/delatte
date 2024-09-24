import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Limitar a 5 intentos de login fallidos por IP en 15 minutos
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 intentos
  duration: 900, // por 900 segundos (15 minutos)
});

export const loginRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Obtener la IP del cliente

  try {
    await rateLimiter.consume(ipAddress as string); // Consumir un punto del rate limiter para esta IP
    next(); // Continuar si no se ha excedido el límite de intentos
  } catch (error) {
    res.status(429).json({ message: 'Demasiados intentos de login fallidos. Intente nuevamente más tarde.' });
  }
};
