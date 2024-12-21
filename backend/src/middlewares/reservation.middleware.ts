import { Request, Response, NextFunction } from 'express';
import { validateDisponibilidad } from "../../../shared/utils/reservation.validation";


export const checkDisponibilidadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateDisponibilidad(req, res, next);
  } catch (error) {
    console.error("Error en el middleware de disponibilidad:", error);
    res.status(500).json({ message: "Error validando la disponibilidad." });
  }
};
export const validateReservationData = (req: Request, res: Response, next: NextFunction) => {
  const { dia, horario, numAdultos, numNinos } = req.body;

  // Validar que la fecha no sea en el pasado
  const today = new Date();
  if (new Date(dia) < today) {
    return res.status(400).json({ message: 'La fecha de la reserva no puede ser en el pasado' });
  }

  // Validar el formato de horario (ej: "14:30")
  const horarioRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!horarioRegex.test(horario)) {
    return res.status(400).json({ message: 'El horario no es válido. Debe tener el formato HH:MM' });
  }

  // Validar que el número de adultos sea mayor que 0
  if (numAdultos <= 0) {
    return res.status(400).json({ message: 'Debe haber al menos un adulto en la reserva' });
  }

  // Validar que el número de niños no sea negativo
  if (numNinos < 0) {
    return res.status(400).json({ message: 'El número de niños no puede ser negativo' });
  }

  next(); // Si todo está bien, continuar con el siguiente middleware o controlador
};


