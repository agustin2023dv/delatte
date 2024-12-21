import axios from 'axios';
import { Platform } from 'react-native';
import { getItem } from 'storage/storage';
import { IReservation } from 'shared/interfaces/IReservation';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

// Obtener reservas del usuario autenticado
export const fetchUserReservationsService = async (): Promise<IReservation[]> => {
  const token = await getItem("token");
  try {
    const response = await axios.get(`${API_URL}/reservas/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retorna un array de reservas
  } catch (error) {
    console.error('Error al obtener las reservas del usuario:', error);
    throw error;
  }
};

// Crear una nueva reserva
export const createReservationService = async (
  reservationData: {
    restaurante: string;
    fecha: string;
    horario: string;
    numAdultos: number;
    numNinos: number;
    pedidosEspeciales?: string;
  }
): Promise<void> => {
  const token = await getItem("token"); 
  try {
    const response = await axios.post(
      `${API_URL}/reservas/create-reservation`,
      reservationData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar token en encabezado
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
};

// Cancelar una reserva
export const cancelReservationService = async (reservationId: string): Promise<IReservation> => {
  const token = await getItem("token");
  try {
    const response = await axios.put(
      `${API_URL}/reservas/cancelar/${reservationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Retorna la reserva cancelada
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    throw error;
  }
};

// Modificar una reserva
export const modifyReservationService = async (
  reservationId: string,
  updatedData: Partial<IReservation>
): Promise<IReservation> => {
  const token = await getItem("token");
  try {
    const response = await axios.put(
      `${API_URL}/reservas/modificar/${reservationId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Retorna la reserva actualizada
  } catch (error) {
    console.error('Error al modificar la reserva:', error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservationByIdService = async (reservationId: string): Promise<IReservation> => {
  const token = await getItem("token");
  try {
    const response = await axios.get(`${API_URL}/reservas/${reservationId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retorna la reserva por ID
  } catch (error) {
    console.error('Error al obtener la reserva por ID:', error);
    throw error;
  }
};
