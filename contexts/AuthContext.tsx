import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getItem, setItem, removeItem } from "storage/storage";

// Interfaz para el token decodificado
interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}

// Propiedades del contexto
interface AuthContextProps {
  userId: string | null;       // ID del usuario
  isSigned: boolean;           // Estado de autenticación
  isLoading: boolean;          // Estado de carga
  setSession: (token: string) => void; // Guardar token y establecer sesión
  logout: () => void;          // Cerrar sesión
}

// Crear el contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook personalizado para acceder al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar la sesión desde el almacenamiento centralizado al inicio
  useEffect(() => {
    const loadSession = async () => {
      const token = await getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          setUserId(decodedToken.userId);
          setIsSigned(true);
        } catch {
          console.error("Token inválido, eliminando sesión.");
          await removeItem("token");
        }
      }
      setIsLoading(false);
    };
    loadSession();
  }, []);

  // Función para establecer una sesión (guardar token)
  const setSession = async (token: string) => {
    try {
      await setItem("token", token);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.userId);
      setIsSigned(true);
    } catch {
      console.error("Error al establecer la sesión.");
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    await removeItem("token");
    setUserId(null);
    setIsSigned(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isSigned, isLoading, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
