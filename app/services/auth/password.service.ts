import axios from 'axios';
import { getItem } from '@/app/storage/storage';

const API_URL = 'http://localhost:8081/api/auth';

// **Servicio para solicitar restablecimiento de contraseña**
export const requestPasswordResetService = async (email: string): Promise<void> => {
  try {
    // Enviar una solicitud POST al backend para solicitar el enlace de restablecimiento
    const response = await axios.post(`${API_URL}/request-password-reset`, { email });

    console.log('Enlace de restablecimiento enviado:', response.data.message);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Manejar errores específicos del backend
      throw new Error(error.response?.data?.message || 'Error al solicitar el restablecimiento de contraseña');
    } else {
      // Manejar errores generales
      throw new Error('Error inesperado');
    }
  }
};

// **Servicio para restablecer contraseña**
export const resetPasswordService = async (
  userId: string,
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    const response = await axios.post(
      `${API_URL}/password-reset`,
      {
        token, // Enviar el token en el cuerpo
        userId,
        newPassword,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Contraseña restablecida exitosamente:', response.data.message);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al restablecer la contraseña');
    } else {
      throw new Error('Error inesperado');
    }
  }
};

// **Función para cambiar la contraseña**
export const changePasswordService = async (
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  try {
    const token = await getItem('token'); // Obtener el token usando almacenamiento centralizado
    if (!token) {
      throw new Error('Token no encontrado. Por favor, inicia sesión nuevamente.');
    }

    const response = await axios.put(
      `${API_URL}/change-password`,
      {
        oldPassword,
        newPassword,
        confirmNewPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` }, // Añadir el token en los headers
      }
    );

    return response.data; // Retornar la respuesta del backend
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al cambiar la contraseña');
    } else {
      throw new Error('Error inesperado');
    }
  }
};

// **Función para verificar el email del usuario**
export const verifyEmail = async (emailToken: string): Promise<{ success: boolean; token?: string; message: string }> => {
  try {
    // Enviar una solicitud GET para verificar el token de email
    const response = await axios.get(`${API_URL}/verify-email`, {
      params: { token: emailToken },
    });
    return response.data; // Retornar los datos de la respuesta
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al verificar el email'); // Lanzar error específico si lo hay
    }
    throw new Error('Error al conectar con el servidor'); // Error de conexión
  }
};
