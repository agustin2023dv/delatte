import { Request, Response } from 'express';
import { createReservation, getReservationsByUser, getReservationById } from '../services/reservation.service';

//**Controlador para crear una nueva reserva**
export const createReservationController = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body;

    // Crear una nueva reserva con los datos proporcionados
    const reservation = await createReservation(reservationData);

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creando la reserva', error });
  }
};

//**Controlador para obtener las reservas de un usuario**
export const getUserReservationsController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Obtener las reservas del usuario por su ID
    const reservations = await getReservationsByUser(userId);

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo las reservas', error });
  }
};

//**Controlador para obtener una reserva por su ID**
export const getReservationByIdController = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;

    // Obtener la reserva por su ID
    const reservation = await getReservationById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo la reserva', error });
  }
};
