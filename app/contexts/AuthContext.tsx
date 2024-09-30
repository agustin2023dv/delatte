import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginCustomerService, loginManagerService, registerUser, 
  verifyEmail as verifyEmailService } from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; 

interface AuthContextProps {
  user: any; // Información del usuario autenticado
  isAuthenticated: boolean; // Indica si el usuario está autenticado
  isLoading: boolean; // Indica si se está realizando una operación de autenticación
  error: string | null; // Mensaje de error si ocurre
  children: React.ReactNode;
  loginCustomer: (email: string, password: string) => Promise<void>; // Función para iniciar sesión como Customer
  loginManager: (email: string, password: string) => Promise<void>; // Función para iniciar sesión como Manager
  register: (nombre: string, apellido: string, email: string, password: string) => Promise<void>; // Función para registrar un usuario
  verifyEmail: (emailToken: string) => Promise<void>; // Función para verificar el email del usuario
  logout: () => void; // Función para cerrar sesión
  setAuthState: (data: { user: any; token: string }) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

//**Proveedor de contexto de autenticación**
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Estado del usuario autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isLoading, setIsLoading] = useState(false); // Estado de carga durante la autenticación
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    // Cargar el token desde el almacenamiento local y decodificar al usuario
    const loadUserFromStorage = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decodedUser = jwtDecode(token); // Decodificar el token JWT
        setUser(decodedUser);
        setIsAuthenticated(true);
      }
    };
    loadUserFromStorage();
  }, []);

  //**Función para iniciar sesión como Customer**
  const loginCustomer = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token } = await loginCustomerService(email, password); // Cambiar a login específico de Customer
      await AsyncStorage.setItem('token', token); // Almacenar el token en el dispositivo
      const decodedUser = jwtDecode(token); // Decodificar el token
      setUser(decodedUser); // Establecer el usuario autenticado
      setIsAuthenticated(true); // Marcar como autenticado
    } catch (err: any) {
      setError(err.message); // Establecer el mensaje de error
    } finally {
      setIsLoading(false); // Terminar el estado de carga
    }
  };

  //**Función para iniciar sesión como Manager**
  const loginManager = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token } = await loginManagerService(email, password); // Cambiar a login específico de Manager
      await AsyncStorage.setItem('token', token); // Almacenar el token en el dispositivo
      const decodedUser = jwtDecode(token); // Decodificar el token
      setUser(decodedUser); // Establecer el usuario autenticado
      setIsAuthenticated(true); // Marcar como autenticado
    } catch (err: any) {
      setError(err.message); // Establecer el mensaje de error
    } finally {
      setIsLoading(false); // Terminar el estado de carga
    }
  };

  //**Función para registrar un nuevo usuario**
  const register = async (nombre: string, apellido: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await registerUser(nombre, apellido, email, password); // Registrar el usuario
      // No iniciar sesión automáticamente, esperar verificación de email
    } catch (err: any) {
      setError(err.message); // Establecer el mensaje de error
    } finally {
      setIsLoading(false); // Terminar el estado de carga
    }
  };

  //**Función para verificar el email del usuario**
  const verifyEmail = async (emailToken: string) => {
    setIsLoading(true);
    try {
      const response = await verifyEmailService(emailToken);  
      if (response.success && response.token) {
        await AsyncStorage.setItem('token', response.token); // Almacenar el token de verificación
        const decodedUser = jwtDecode(response.token); // Decodificar el token
        setUser(decodedUser); // Establecer el usuario autenticado
        setIsAuthenticated(true); // Marcar como autenticado
      } else {
        setError(response.message || 'Verificación fallida'); // Manejar error de verificación
      }
    } catch (err: any) {
      setError(err.message); // Establecer el mensaje de error
    } finally {
      setIsLoading(false); // Terminar el estado de carga
    }
  };

  //**Función para cerrar sesión**
  const logout = async () => {
    await AsyncStorage.removeItem('token'); // Eliminar el token del almacenamiento
    setUser(null); // Limpiar el usuario
    setIsAuthenticated(false); // Marcar como no autenticado
  };

  //**Función para actualizar el estado de autenticación**
  const setAuthState = (data: { user: any; token: string }) => {
    setUser(data.user); // Guardamos la información del usuario en el estado del contexto.
    setIsAuthenticated(true); // Marcamos al usuario como autenticado.
    AsyncStorage.setItem('token', data.token); // Almacenamos el token para futuras sesiones.
  };
  
  return (
    <AuthContext.Provider value={{ user, children, isAuthenticated, isLoading, error, 
    loginCustomer, loginManager, register, verifyEmail, logout, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

//**Hook para usar el contexto de autenticación**
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
