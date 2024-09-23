import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8081/api/users';

//**Función para registrar un nuevo usuario**
export const registerUser = async (nombre: string, apellido: string, email: string, password: string) => {
  try {
    // Enviar una solicitud POST al endpoint de registro de usuarios
    const response = await axios.post(`${API_URL}/register`, {
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

//**Función para verificar el email del usuario**
export const verifyEmail = async (emailToken: string): Promise<{ success: boolean; token?: string; message: string }> => {
  try {
    // Enviar una solicitud GET para verificar el token de email
    const response = await axios.get(`${API_URL}/verify-email?token=${emailToken}`, {
      params: { token: emailToken }
    });
    return response.data; // Retornar los datos de la respuesta
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error al verificar el email'); // Lanzar error específico si lo hay
    }
    throw new Error('Error al conectar con el servidor'); // Error de conexión
  }
};

//**Función para iniciar sesión**
export const loginUser = async (email: string, password: string) => {
  try {
    // Enviar una solicitud POST al endpoint de inicio de sesión
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data; // Retornar los datos de la respuesta
  } catch (error: any) {
    console.error('Error al realizar login:', error);

    // Manejo de errores específicos de Axios
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión'); // Lanzar error si hay problema en la respuesta
    } else {
      throw new Error('Error inesperado'); // Error general desconocido
    }
  }
};


// **Función para cambiar la contraseña**
export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  try {
    const token = await AsyncStorage.getItem('token'); // Obtener el token del usuario autenticado
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