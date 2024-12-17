import axios from 'axios';
import { Platform } from 'react-native';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

//**Función para registrar un nuevo usuario**
export const registerUserService = async (nombre: string, apellido: string, email: string, password: string) => {
    try {
      // Enviar una solicitud POST al endpoint de registro de usuarios
      const response = await axios.post(`${API_URL}/auth/register`, {
        nombre,
        apellido,
        email,
        password,
      });
      return response.data; // Retornar los datos de la respuesta del servidor
    } catch (error: unknown) {
      // Manejo de errores específicos de Axios
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const message = (error.response.data as { message: string }).message;
          throw new Error(message || 'Error al registrar el usuario'); // Lanzar error específico si lo hay
        } else {
          throw new Error('Error al conectar con el servidor'); // Error de conexión
        }
      } else {
        throw new Error('Ocurrió un error desconocido.'); // Error general desconocido
      }
    }
  };
  