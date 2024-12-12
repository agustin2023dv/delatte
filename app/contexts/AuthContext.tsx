import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginCustomerService, loginManagerService } from '@/app/services/auth/login.service'; 
import { verifyEmail as verifyEmailService } from '@/app/services/auth/password.service';
import { registerUserService } from '@/app/services/auth/register.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}


interface AuthContextProps {
  userId: string | null; 
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token) as DecodedToken;
          setUserId(decodedToken.userId);
          setIsAuthenticated(true);
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
      // Usar destructuración para extraer el token si el servicio devuelve un objeto
      const response: any = await loginCustomerService(email, password);
      const token = response.token || response; // Manejar ambos casos: objeto o string
      await AsyncStorage.setItem('token', token);
      const decodedToken = jwtDecode(token) as DecodedToken;
      setUserId(decodedToken.userId);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginManager = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: any = await loginManagerService(email, password);
      const token = response.token || response; // Manejar ambos casos: objeto o string
      await AsyncStorage.setItem('token', token);
      const decodedToken = jwtDecode(token) as DecodedToken;
      setUserId(decodedToken.userId);
      setIsAuthenticated(true);
    } catch (err: any) {
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
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (emailToken: string) => {
    setIsLoading(true);
    try {
      const response: any = await verifyEmailService(emailToken);
      const token = response.token || response; // Manejar ambos casos
      if (token) {
        await AsyncStorage.setItem('token', token);
        const decodedToken = jwtDecode(token) as DecodedToken;
        setUserId(decodedToken.userId);
        setIsAuthenticated(true);
      } else {
        setError(response.message || 'Verificación fallida');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, isLoading, error, 
    loginCustomer, loginManager, register, verifyEmail , logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
