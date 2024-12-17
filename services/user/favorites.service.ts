import { getItem } from 'storage/storage';
import axios from 'axios';
import { Platform } from 'react-native';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

export const getUserFavoritesService = async () => {
      const token = await getItem("token");
    
      if (!token) throw new Error("No se encontró un token de autenticación");
    
      const response = await axios.get(`${API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      return response.data.favorites;
    };

// **Servicio para agregar restaurante a favoritos**
export const addFavoriteRestaurantService = async (restaurantId: string) => {
  try {
    const token = await getItem('token'); // Obtener token del almacenamiento
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.post(
      `${API_URL}/favorites`,
      { restaurantId }, // Pasar ID del restaurante como string
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error('Error al agregar favorito:');
    throw error;
  }
};

// **Servicio para eliminar restaurante de favoritos**
export const removeFavoriteRestaurantService = async (restaurantId: string) => {
  try {
    const token = await getItem('token'); // Obtener token del almacenamiento
    if (!token) throw new Error('No se encontró un token de autenticación');

    const response = await axios.delete(`${API_URL}/favorites`, {
      data: { restaurantId }, // Incluir el ID del restaurante en el cuerpo
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Retornar la respuesta del backend
  } catch (error) {
    console.error('Error al eliminar favorito:');
    throw error;
  }
};
