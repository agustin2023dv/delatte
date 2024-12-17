import { getItem } from 'storage/storage';
import axios from 'axios';
import { IUser } from 'shared/interfaces/IUser';
import { Platform } from 'react-native';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

// **Función para obtener datos de usuario**
export const fetchUserDataService = async () => {
  try {
    const token = await getItem('token'); // Usar almacenamiento centralizado para obtener el token

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    // Realizar la solicitud con el token en el encabezado Authorization
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token en el encabezado Authorization
      }
    });

    return response.data; // Retornar los datos del usuario
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error en la solicitud');
    } else {
      throw new Error('Error inesperado');
    }
  }
};

// **Función para cambiar datos de usuario**
export const updateUserDataService = async (updatedData: Partial<IUser>) => {
  try {
    const token = await getItem('token'); // Usar almacenamiento centralizado para obtener el token

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    // Realizar la solicitud con el token en el encabezado Authorization
    const response = await axios.put(`${API_URL}/profile`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token en el encabezado Authorization
      }
    });

    return response.data; // Retornar la respuesta del servidor
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error en la solicitud');
    } else {
      throw new Error('Error inesperado');
    }
  }
};