import axios from 'axios';

// Configuración de la instancia base de Axios
const api = axios.create({
  baseURL: 'http://localhost:8081/api/reservas',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Obtener reservas del usuario autenticado
export const fetchUserReservations = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data; // Devuelve los datos obtenidos de la API
  } catch (error) {
    console.error('Error al obtener las reservas del usuario:', error);
    throw error;
  }
};

// Crear una nueva reserva
export const createReservation = async (reservationData: any) => {
  try {
    const response = await api.post('/create-reservation', reservationData); // Enviar los datos de la reserva
    return response.data;
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    throw error;
  }
};

// Cancelar una reserva
export const cancelReservation = async (reservationId: string) => {
  try {
    const response = await api.put(`/cancelar/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error al cancelar la reserva:', error);
    throw error;
  }
};

// Modificar una reserva
export const modifyReservation = async (reservationId: string, updatedData: any) => {
  try {
    const response = await api.put(`/modificar/${reservationId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error al modificar la reserva:', error);
    throw error;
  }
};

// Obtener una reserva por ID
export const getReservationById = async (reservationId: string) => {
  try {
    const response = await api.get(`/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la reserva por ID:', error);
    throw error;
  }
};
