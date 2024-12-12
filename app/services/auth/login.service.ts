import axios from 'axios';
import { setItem } from '@/app/storage/storage'; // Usar almacenamiento centralizado
import {jwtDecode} from 'jwt-decode'; 
const API_URL = 'http://localhost:8081/api/auth';

// **Servicio para iniciar sesión como Manager**
export const loginManagerService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login-manager`, { email, password });
    const { token } = response.data;

    // Decodificar el token para obtener la información del usuario
    const decodedUser = jwtDecode(token);
    
    // Guardar el token usando el módulo de almacenamiento centralizado
    await setItem('token', token);

    return { user: decodedUser, token }; // Retornar el usuario y el token
  } catch (error: any) {
    handleError(error, 'Error al iniciar sesión como Manager');
  }
};

// **Servicio para iniciar sesión como Customer**
export const loginCustomerService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login-customer`, { email, password });
    const { token } = response.data;

    // Decodificar el token para obtener la información del usuario
    const decodedUser = jwtDecode(token);
    
    // Guardar el token usando el módulo de almacenamiento centralizado
    await setItem('token', token);

    return { user: decodedUser, token }; // Retornar el usuario y el token
  } catch (error: any) {
    handleError(error, 'Error al iniciar sesión como Customer');
  }
};

// **Manejo de errores**
const handleError = (error: any, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || defaultMessage);
  }
  throw new Error('Error inesperado');
};
