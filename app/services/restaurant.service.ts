import axios from 'axios';

// Configuración de la instancia base de Axios
const api = axios.create({
  baseURL: 'http://localhost:8081/api/restaurantes',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Llamada para crear el manager y el restaurante
export const createRestaurantAndManagerService = async (restaurantData: any, managerData: any) => {
  try {
    const response = await api.post('/register-restaurant', {
      restaurant: restaurantData,
      manager: managerData,
    });

    return response.data; // Devolver los datos de la respuesta del servidor
  } catch (error) {
    console.error('Error al crear restaurante y manager:', error);
    throw error;
  }
};

// Llamada para obtener información de un restaurante por ID
export const getRestaurantByIdService = async (restaurantId: string) => {
  try {
    const response = await api.get(`/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener restaurante por ID:', error);
    throw error;
  }
};

// Llamada para actualizar la información del restaurante
export const updateRestaurantService = async (restaurantId: string, updateData: any) => {
  try {
    const response = await api.put(`/${restaurantId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el restaurante:', error);
    throw error;
  }
};

export const getManagerRestaurants = async (managerId: string) => {
  try {
    const response = await axios.get(`/api/restaurants/manager/${managerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Error fetching restaurants');
  }};