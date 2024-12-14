import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginCustomerService, loginManagerService } from 'services/auth/login.service'; 
import { verifyEmail as verifyEmailService } from 'services/auth/password.service';
import { registerUserService } from 'services/auth/register.service';
import { getItem, setItem, removeItem } from 'storage/mobileStorage'; 
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}

interface AuthContextProps {
  userId: string | null; 
  isSigned: boolean;
  isLoading: boolean;
  error: string | null;
  loginCustomer: (email: string, password: string) => Promise<void>;
  loginManager: (email: string, password: string) => Promise<void>;
  register: (nombre: string, apellido: string, email: string, password: string) => Promise<void>;
  verifyEmail: (emailToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar el usuario desde el almacenamiento seguro
  useEffect(() => {
    const loadUserFromStorage = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token) as DecodedToken;
          setUserId(decodedToken.userId);
          setIsSigned(true);
        } catch {
          console.error('Token inválido');
          await AsyncStorage.removeItem('token');
        }
      }
    };
    loadUserFromStorage();
  }, []);

  const loginCustomer = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: any = await loginCustomerService(email, password);
      const token = response.token || response;
      if (token) {
        await AsyncStorage.setItem('token', token);
        const decodedToken = jwtDecode(token) as DecodedToken;
        setUserId(decodedToken.userId);
        setIsSigned(true);
      } else {
        throw new Error('No se recibió un token de autenticación');
      }
    } catch (err: any) {
      console.error('Error al iniciar sesión como cliente:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginManager = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: any = await loginManagerService(email, password);
      const token = response.token || response;
      if (token) {
        await AsyncStorage.setItem('token', token);
        const decodedToken = jwtDecode(token) as DecodedToken;
        setUserId(decodedToken.userId);
        setIsSigned(true);
      } else {
        throw new Error('No se recibió un token de autenticación');
      }
    } catch (err: any) {
      console.error('Error al iniciar sesión como manager:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (nombre: string, apellido: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await registerUserService(nombre, apellido, email, password);
    } catch (err: any) {
      console.error('Error al registrar usuario:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (emailToken: string) => {
    setIsLoading(true);
    try {
      const response: any = await verifyEmailService(emailToken);
      const token = response.token || response;
      if (token) {
        await AsyncStorage.setItem('token', token);
        const decodedToken = jwtDecode(token) as DecodedToken;
        setUserId(decodedToken.userId);
        setIsSigned(true);
      } else {
        setError(response.message || 'Verificación fallida');
      }
    } catch (err: any) {
      console.error('Error al verificar email:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUserId(null);
    setIsSigned(false);
  };

  return (
    <AuthContext.Provider value={{ 
            userId, isSigned, 
            isLoading, error, 
            loginCustomer, loginManager, register, 
            verifyEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;