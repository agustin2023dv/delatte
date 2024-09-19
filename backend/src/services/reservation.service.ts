import Reservation from '../models/Reservation';
import { IReservation } from '../interfaces/IReservation';

export const createReservation = async (reservationData: IReservation) => {
  const reservation = new Reservation(reservationData); // Crear una nueva reserva con los datos proporcionados
  return await reservation.save(); // Guardar la reserva en la base de datos y devolver el resultado
};

export const getReservationsByUser = async (userId: string) => {
  // Obtener todas las reservas de un usuario y traer los detalles del restaurante
  return await Reservation.find({ cliente: userId }).populate('restaurante', 'nombre direccion');
};

export const getReservationById = async (id: string) => {
  // Obtener una reserva por su ID y traer los detalles del restaurante
  return await Reservation.findById(id).populate('restaurante', 'nombre direccion');
};
