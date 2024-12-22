import axios from 'axios';
import { getItem } from '../storage/storage'; 
import { Platform } from 'react-native';


// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

// **Servicio para crear una review**
export const createReviewService = async (reviewData: {
  restaurante: string;
  calificacion: number;
  comentario: string;
}) => {
  try {
    // Validación del restaurante ID
    if (!reviewData.restaurante || typeof reviewData.restaurante !== "string") {
      throw new Error("ID del restaurante es inválido o no se proporcionó.");
    }

    // Obtener token desde el almacenamiento
    const token = await getItem("token");
    if (!token) throw new Error("No se encontró un token de autenticación");

    // Enviar solicitud al backend
    const response = await axios.post(
      `${API_URL}/reviews/create-review`,
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear la reseña:", error);
    throw new Error("Error al crear la reseña");
  }
};

