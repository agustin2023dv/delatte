import { getItem } from '@/app/storage/storage';
import axios from 'axios';
import { ObjectId } from 'mongoose';


const API_URL = 'http://localhost:8081/api/favorites';

// **Servicio para agregar restaurante a favoritos**
export const addFavoriteRestaurantService = async (restaurantId: ObjectId) => {
  try {
    const token = await getItem('token'); // Usar almacenamiento centralizado
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.post(
      `${API_URL}/favorites`,
      { restaurantId },
      { headers: { Authorization: `Bearer ${token}` } } // Incluir el token en los headers
    );
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    throw error; // Lanzar el error para manejarlo en el frontend
  }
};

// **Servicio para eliminar restaurante de favoritos**
export const removeFavoriteRestaurantService = async (restaurantId: ObjectId) => {
  try {
    const token = await getItem('token'); // Usar almacenamiento centralizado
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.delete(`${API_URL}/favorites`, {
      data: { restaurantId }, // Incluir el restaurante en el cuerpo de la solicitud
      headers: { Authorization: `Bearer ${token}` } // Incluir el token en los headers
    });
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    throw error; // Lanzar el error para manejarlo en el frontend
  }
};