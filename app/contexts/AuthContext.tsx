import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginCustomerService, loginManagerService, registerUserService, verifyEmail as verifyEmailService } from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

interface AuthContextProps {
  userId: string | null; // Solo almacenar el userId en lugar de todo el usuario
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
        const decodedToken: any = jwtDecode(token);
        setUserId(decodedToken.userId); // Obtener solo el userId del token
        setIsAuthenticated(true);
      }
    };
    loadUserFromStorage();
  }, []);

  const loginCustomer = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { token } = await loginCustomerService(email, password);
      await AsyncStorage.setItem('token', token);
      const decodedToken: any = jwtDecode(token);
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
      const { token } = await loginManagerService(email, password);
      await AsyncStorage.setItem('token', token);
      const decodedToken: any = jwtDecode(token);
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
      const response = await verifyEmailService(emailToken);
      if (response.success && response.token) {
        await AsyncStorage.setItem('token', response.token);
        const decodedToken: any = jwtDecode(response.token);
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
    <AuthContext.Provider value={{ userId, isAuthenticated, isLoading, error, loginCustomer, loginManager, register, verifyEmail, logout }}>
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
