import { getItem } from '../storage/storage'; 
import axios from 'axios';
import { Platform } from 'react-native';
import { IReview } from 'shared/interfaces/IReview';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

// **Servicio para crear una review**
export const createReviewService = async (reviewData: Partial<IReview>) => {
  try {
    const token = await getItem('token'); // Obtener el token desde almacenamiento centralizado
    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    const response = await axios.post(
      `${API_URL}/restaurants/${reviewData.restaurante}/reviews`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
      }
    );

    return response.data; // Retornar los datos de la respuesta
  } catch (error) {
    console.error('Error al crear la review:', error);
    throw new Error('Error al crear la review');
  }
};
