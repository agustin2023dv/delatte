import axios from 'axios';
import { setItem } from 'storage/storage'; 
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';

// Detectar entorno (web o mobile)
const API_URL =
  Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_API_URL_WEB
    : process.env.EXPO_PUBLIC_API_URL_MOBILE;

// **Servicio para iniciar sesión como Manager**
export const loginManagerService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login-manager`, { email, password });
    const { token,user} = response.data;

    const decodedUser = jwtDecode(token);

    await setItem('token', token);
    await setItem("userRole", user.role);
    await setItem("userEmail", user.email);
    return { user: decodedUser, token };
  } catch (error: any) {
    handleError(error, 'Error al iniciar sesión como Manager');
  }
};

// **Servicio para iniciar sesión como Customer**
export const loginCustomerService = async (emailp: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login-customer`, { emailp, password });
    const { token, user} = response.data;

    const decodedUser = jwtDecode(token);

    await setItem('token', token);
    await setItem("userRole", user.role);


    return { user: decodedUser, token };
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
