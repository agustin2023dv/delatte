import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {jwtDecode}  from 'jwt-decode';
import { IUser, IUserEdit } from 'shared/interfaces/IUser';

const API_URL = 'http://localhost:8081/api/users';

//**Función para registrar un nuevo usuario**
export const registerUserService = async (nombre: string, apellido: string, email: string, password: string) => {
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

//* Función para iniciar sesión como Manager
export const loginManagerService = async (email: string, password: string) => {
  try {
    // Enviar la solicitud POST al backend para iniciar sesión
    const response = await axios.post(`${API_URL}/login-manager`, { email, password });

    const { token } = response.data;

    // Decodificar el token para obtener los datos del usuario
    const decodedUser = jwtDecode(token);

    // Almacenar el token en AsyncStorage para mantener la sesión
    await AsyncStorage.setItem('token', token);

    // Retornar el usuario decodificado y el token
    return { user: decodedUser, token };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error al iniciar sesión como Manager');
      } else {
        throw new Error('Error al conectar con el servidor');
      }
    } else {
      throw new Error('Error inesperado');
    }
  }
};

//* Función para iniciar sesión como Customer
export const loginCustomerService = async (email: string, password: string) => {
  try {
    // Enviar la solicitud POST al backend para iniciar sesión
    const response = await axios.post(`${API_URL}/login-customer`, { email, password });

    const { token } = response.data;

    // Decodificar el token para obtener los datos del usuario
    const decodedUser = jwtDecode(token);

    // Almacenar el token en AsyncStorage para mantener la sesión
    await AsyncStorage.setItem('token', token);

    // Retornar el usuario decodificado y el token
    return { user: decodedUser, token };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Error al iniciar sesión como Customer');
      } else {
        throw new Error('Error al conectar con el servidor');
      }
    } else {
      throw new Error('Error inesperado');
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

// **Función para obtener datos de usuario**
export const fetchUserDataService = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); 

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    // Realizar la solicitud con el token en el encabezado Authorization
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}` // Agregar el token en el encabezado Authorization
      }
    });
    
    return response.data; 
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error en la solicitud');
    } else {
      throw new Error('Error inesperado');
    }
  }
};

// **Función para cambiar datos de usuario**

export const updateUserDataService = async (updatedData: IUserEdit) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('No se encontró un token de autenticación');
    }

    // Realizar la solicitud con el token en el encabezado Authorization
    const response = await axios.put(`${API_URL}/profile`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error en la solicitud');
    } else {
      throw new Error('Error inesperado');
    }
  }
};