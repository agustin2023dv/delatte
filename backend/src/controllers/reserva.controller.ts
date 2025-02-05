import { Request, Response } from 'express';
import { 
  createReservationService, 
  getReservationByIdService, 
  getAllReservationsService, 
  updateReservationService, 
  cancelReservationService, 
  getReservationsByRoleService 
} from '../services/reservation.service';

//* Controlador para CREAR una reserva
export const createReservationController = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body;
    const reservation = await createReservationService(reservationData);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creando la reserva', error });
  }
};

//* Controlador para ver las reservas del usuario (cliente o manager)
export const getUserReservationsController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const role = (req as any).user.role;

    const reservations = await getReservationsByRoleService(userId, role);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo las reservas', error });
  }
};

//*Controlador para CANCELAR una reserva
export const cancelReservationController = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const reservation = await cancelReservationService(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json({ message: 'Reserva cancelada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelando la reserva', error });
  }
};

//*Controlador para MODIFICAR una reserva
export const updateReservationController = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const updateData = req.body;
    const updatedReservation = await updateReservationService(reservationId, updateData);

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error modificando la reserva', error });
  }
};

//*Controlador para TRAER TODAS las reservas
export const getAllReservationsController = async (req: Request, res: Response) => {
  try {
    const reservations = await getAllReservationsService();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo todas las reservas', error });
  }
};

//*Controlador para BUSCAR una reserva por ID
export const getReservationByIdController = async (req: Request, res: Response) => {
  try {
    const reservationId = req.params.id;
    const reservation = await getReservationByIdService(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo la reserva', error });
  }
};
