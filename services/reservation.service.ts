import axios from 'axios';
import { Platform } from 'react-native';
import { getItem } from 'storage/storage';


// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

// Obtener reservas del usuario autenticado
export const fetchUserReservations = async (role: string) => {
  const token = await getItem("token");
  try {
    
const response = await axios.get(`${API_URL}/reservas/bookings`, {
  headers: {
    Authorization: `Bearer ${token}`, 
  },
  params: { role }, 
});
    return response.data; 
  } catch (error) {
    console.error('Error al obtener las reservas del usuario:', error);
    throw error;
  }
};

// Crear una nueva reserva
export const createReservation = async (reservationData: any) => {
  try {
    const response = await axios.post(`${API_URL}/reservas/create-reservation'`,
       reservationData); // Enviar los datos de la reserva
    return response.data;
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw error;
  }
};

// Cancelar una reserva
export const cancelReservation = async (reservationId: string) => {
  try {
    const response = await axios.put(`${API_URL}/reservas/cancelar/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    throw error;
  }
};

// Modificar una reserva
export const modifyReservation = async (reservationId: string, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/reservas/modificar/${reservationId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error al modificar la reserva:', error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservationById = async (reservationId: string) => {
  try {
    const response = await axios.get(`${API_URL}/reservas/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la reserva por ID:', error);
    throw error;
  }
};
