import Reservation from '../models/Reservation';
import { IReservation } from '../../../shared/interfaces/IReservation';
import { getRestauranteIdByManager } from './restaurant.service';

// Servicio para crear una reserva
export const createReservation = async (reservationData: IReservation) => {
  const reservation = new Reservation(reservationData);
  return await reservation.save();
};

// Servicio para obtener una reserva por su ID
export const getReservationById = async (id: string) => {
  return await Reservation.findById(id).populate('restaurante', 'nombre direccion');
};

// Servicio para actualizar una reserva
export const updateReservation = async (reservationId: string, updatedData: any) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updatedData, { new: true });
    return updatedReservation;
  } catch (error) {
    throw new Error('Error actualizando la reserva');
  }
};

// Servicio para cancelar una reserva
export const cancelReservation = async (reservationId: string) => {
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
export const getAllReservations = async () => {
  try {
    return await Reservation.find().populate('restaurante', 'nombre direccion').populate('cliente', 'nombre email');
  } catch (error) {
    throw new Error('Error obteniendo todas las reservas');
  }
};

// Servicio para obtener todas las reservas de un cliente o manager
export const getReservationsByRole = async (userId: string, role: string) => {
  if (role === 'customer') {
    // Si es cliente, obtener solo sus reservas
    return await Reservation.find({ cliente: userId }).populate('restaurante', 'nombre direccion');
  } else if (role === 'manager') {
    // Si es manager, obtener reservas del restaurante del manager
    const restauranteId = await getRestauranteIdByManager(userId);
    return await Reservation.find({ restaurante: restauranteId }).populate('cliente', 'nombre email');
  }
};
