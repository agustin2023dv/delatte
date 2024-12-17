import axios from 'axios';
import { getItem } from '../storage/storage'; 
import { IRestaurant } from 'shared/interfaces/IRestaurant';
import { IUser } from 'shared/interfaces/IUser';
import { Platform } from 'react-native';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;
    
// **Llamada para crear el manager y el restaurante**
export const createRestaurantAndManagerService = async (
  restaurantData: Partial<IRestaurant>,
  managerData: Partial<IUser>
) => {
  try {
    const response = await axios.post(`${API_URL}/restaurantes/register-restaurant`, {
      restaurant: restaurantData,
      manager: managerData,
    });

    return response.data; // Devolver los datos de la respuesta del servidor
  } catch (error) {
    console.error('Error al crear restaurante y manager:', error);
    throw error;
  }
};

// **Llamado para obtener la info de todos los restaurantes**
export const getAllRestaurantsService = async () => {
  try {
    const token = await getItem('token'); // Usar almacenamiento centralizado
    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    const response = await axios.get(`${API_URL}/restaurantes/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    throw error;
  }
};

// **Llamado para obtener información de un restaurante por ID**
export const getRestaurantByIdService = async (restaurantId: string) => {
  try {
    const response = await axios.get(`${API_URL}/restaurantes/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener restaurante por ID:', error);
    throw error;
  }
};

// **Llamado para actualizar info de un restaurante**
export const updateRestaurantService = async (
  restaurantId: string,
  updateData: Partial<IRestaurant>
) => {
  try {
    const token = await getItem('token'); // Usar almacenamiento centralizado
    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    const response = await axios.put(`${API_URL}/restaurantes/${restaurantId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el restaurante:', error);
    throw new Error('No se pudo actualizar el restaurante');
  }
};

// **Llamado para obtener restaurantes gestionados por un manager**
export const getRestaurantsByManagerService = async (managerId: string) => {
  try {
    const token = await getItem('token'); // Usar almacenamiento centralizado
    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    const response = await axios.get(`${API_URL}/restaurantes/manager/${managerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Error fetching restaurants');
  }
};

// **Servicio para obtener reviews de un restaurante en específico**
export const getReviewsService = async (restaurantId: string) => {
  try {
    const response = await axios.get(`${API_URL}/restaurantes/${restaurantId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reviews:', error);
    throw error;
  }
};

// **Llamada para buscar restaurantes**
export const searchRestaurantsService = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/restaurantes/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error al buscar restaurantes:', error);
    throw new Error('Error al buscar restaurantes');
  }
};
