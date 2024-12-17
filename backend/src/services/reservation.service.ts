import Reservation from '../models/Reservation.model';
import { IReservation } from '../../../shared/interfaces/IReservation';
import { getRestauranteIdByManagerService } from './restaurant.service';
import { findUserByEmailService, findUserByIdService } from './user.service';
import { IUser } from '../../../shared/interfaces/IUser';

// Servicio para crear una reserva
export const createReservationService = async (reservationData: IReservation) => {
  const reservation = new Reservation(reservationData);
  return await reservation.save();
};

// Servicio para obtener una reserva por su ID
export const getReservationByIdService = async (id: string) => {
  return await Reservation.findById(id).populate('restaurante', 'nombre direccion');
};

// Servicio para actualizar una reserva
export const updateReservationService = async (reservationId: string, updatedData: any) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updatedData, { new: true });
    return updatedReservation;
  } catch (error) {
    throw new Error('Error actualizando la reserva');
  }
};

// Servicio para cancelar una reserva
export const cancelReservationService = async (reservationId: string) => {
  try {
    const canceledReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { cancelada: true },
      { new: true }
    );
    return canceledReservation;
  } catch (error) {
    throw new Error('Error cancelando la reserva');
  }
};

// Servicio para obtener todas las reservas (solo superadmins)
export const getAllReservationsService = async () => {
  try {
    return await Reservation.find().populate('restaurante', 'nombre direccion').populate('cliente', 'nombre email');
  } catch (error) {
    throw new Error('Error obteniendo todas las reservas');
  }
};

export const getReservationsByIdService = async (userId: string, role: string) => {
  let reservations;

  if (role === 'customer') {
    // Obtener reservas del cliente
    reservations = await Reservation.find({ cliente: userId }).populate('restaurante', 'nombre direccion');
  } else if (role === 'manager') {
    // Obtener reservas del restaurante del manager
    const restauranteId = await getRestauranteIdByManagerService(userId);
    reservations = await Reservation.find({ restaurante: restauranteId }).populate('cliente', 'nombre email');
  } else {
    throw new Error('Rol no válido o usuario no encontrado.');
  }

  // Si no hay reservas
  if (!reservations || reservations.length === 0) {
    return { message: 'No hay reservas disponibles.' };
  }

  return reservations;
};

