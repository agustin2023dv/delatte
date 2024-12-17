import { getItem } from 'storage/storage';
import axios from 'axios'; 
import { Platform } from 'react-native';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;
    
// **Obtener las direcciones del usuario**
export const getUserAddressesService = async () => {
  try {
    const token = await getItem('token'); 
    if (!token) {
      throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
    }

    const response = await axios.get(`${API_URL}/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
      },
    });

    return response.data; // Retorna las direcciones del usuario
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al obtener las direcciones');
    } else {
      throw new Error('Error inesperado');
    }
  }
};

// **Agregar una nueva dirección**
export const addAddressService = async (newAddress: string) => {
  try {
    const token = await getItem('token'); // Usar el sistema de almacenamiento centralizado
    if (!token) {
      throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
    }

    const response = await axios.post(
      `${API_URL}/addresses`,
      { address: newAddress }, // El cuerpo de la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
      }
    );

    return response.data; // Retorna las direcciones actualizadas
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al agregar la dirección');
    } else {
      throw new Error('Error inesperado');
    }
  }
};

// **Eliminar una dirección existente**
export const removeAddressService = async (address: string) => {
  try {
    const token = await getItem('token'); // Usar el sistema de almacenamiento centralizado
    if (!token) {
      throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
    }

    const response = await axios.delete(`${API_URL}/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
      },
      data: { address }, // Axios permite enviar datos en solicitudes DELETE usando 'data'
    });

    return response.data; // Retorna las direcciones actualizadas
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al eliminar la dirección');
    } else {
      throw new Error('Error inesperado');
    }
  }
};
