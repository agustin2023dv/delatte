import { Request, Response, NextFunction } from "express";


const Reservation = require('backend/models/Reservation.model').default;
const Restaurant = require('backend/models/Restaurant.model').default;
// Validar disponibilidad
export const validateDisponibilidad = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { restaurante, fecha, horario, numAdultos, numNinos } = req.body;

  try {
    const restauranteData = await Restaurant.findById(restaurante);
    if (!restauranteData) {
      return res.status(400).json({ message: "El restaurante no existe." });
    }

    const capacidadMesas = restauranteData.capacidadMesas.reduce(
      (acc: { totalMesas: number; totalPersonas: number }, mesa: { cantidad: number; personasPorMesa: number }) => ({
        totalMesas: acc.totalMesas + mesa.cantidad,
        totalPersonas: acc.totalPersonas + mesa.cantidad * mesa.personasPorMesa,
      }),
      { totalMesas: 0, totalPersonas: 0 }
    );

    const reservasExistentes = await Reservation.find({
      restaurante,
      fecha,
      horario,
    });

    const totalReservas = reservasExistentes.reduce(
      (acc: { totalAdultos: number; totalNinos: number }, reserva: { numAdultos: number; numNinos: number }) => ({
        totalAdultos: acc.totalAdultos + reserva.numAdultos,
        totalNinos: acc.totalNinos + reserva.numNinos,
      }),
      { totalAdultos: 0, totalNinos: 0 }
    );

    const totalPersonasActual = totalReservas.totalAdultos + totalReservas.totalNinos;
    const personasEnReservaActual = numAdultos + numNinos;

    if (reservasExistentes.length >= capacidadMesas.totalMesas) {
      return res.status(400).json({ message: "No hay disponibilidad de mesas en el horario seleccionado." });
    }

    if (totalPersonasActual + personasEnReservaActual > capacidadMesas.totalPersonas) {
      return res.status(400).json({ message: "No hay capacidad suficiente para la cantidad de personas en el horario seleccionado." });
    }

    next();
  } catch (error) {
    console.error("Error validando disponibilidad:", error);
    return res.status(500).json({ message: "Error validando disponibilidad." });
  }
};

// Validar la fecha
export const validateFecha = (fecha: string): string | null => {
  const hoy = new Date();
  const fechaReserva = new Date(fecha);

  if (!fecha) {
    return "La fecha es requerida.";
  }
  if (fechaReserva < hoy) {
    return "La fecha no puede ser en el pasado.";
  }

  return null; // No hay errores
};

// Validar el horario
export const validateHorario = (horario: string): string | null => {
  const horarioRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  if (!horario) {
    return "El horario es requerido.";
  }
  if (!horarioRegex.test(horario)) {
    return "El formato de la hora no es válido. Usa el formato HH:MM.";
  }

  return null; // No hay errores
};

// Validar el número de adultos
export const validateNumAdultos = (numAdultos: number): string | null => {
  if (numAdultos === undefined || numAdultos === null) {
    return "La cantidad de adultos es requerida.";
  }
  if (numAdultos < 1) {
    return "Debe haber al menos 1 adulto en la reserva.";
  }
  if (numAdultos > 25) {
    return "La cantidad máxima de adultos es 25.";
  }

  return null; // No hay errores
};

// Validar el número de niños
export const validateNumNinos = (numNinos: number): string | null => {
  if (numNinos > 10) {
    return "La cantidad máxima de niños es 10.";
  }
  if (numNinos < 0) {
    return "La cantidad de niños no puede ser negativa.";
  }

  return null; // No hay errores
};