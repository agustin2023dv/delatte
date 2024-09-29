import axios from 'axios';
import {IManagerCreate} from 'shared/interfaces/IUser';
import { IRestaurantCreate } from 'shared/interfaces/IRestaurant';

const API_URL = 'http://localhost:8081/api/restaurantes';


// Llamada para crear el manager y el restaurante
export const createRestaurantAndManagerService = async (restaurantData: IRestaurantCreate, managerData: IManagerCreate) => {
  try {
    const response = await axios.post(`${API_URL}/register-restaurant`,{
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
    const response = await axios.get(`${API_URL}/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener restaurante por ID:', error);
    throw error;
  }
};

// Llamada para actualizar la información del restaurante
export const updateRestaurantService = async (restaurantId: string, updateData: any) => {
  try {
    const response = await axios.put( `${API_URL}/${restaurantId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el restaurante:', error);
    throw error;
  }
};

export const getRestaurantsByManagerService = async (managerId: string) => {
  try {
    const response = await axios.get(`${API_URL}/register/manager/${managerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Error fetching restaurants');
  }};