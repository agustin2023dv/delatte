import { Request, Response, NextFunction } from "express";

// Middleware para validar los parámetros de ubicación
export const validateLocationParams = (req: Request, res: Response, next: NextFunction) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng || !radius) {
    return res.status(400).json({ message: "Latitud, longitud y radio son requeridos" });
  }

  const latitude = Number(lat);
  const longitude = Number(lng);
  const searchRadius = Number(radius);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(searchRadius) || searchRadius <= 0) {
    return res.status(400).json({
      message: "Latitud, longitud y radio deben ser números válidos y el radio debe ser mayor a 0",
    });
  }

  next();
};
