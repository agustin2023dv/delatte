import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { getItem, setItem, removeItem } from "storage/storage";

// Interfaz para el token decodificado
interface DecodedToken {
  id: string;
  emailContacto: string; 
  exp: number;
  iat: number;
}

// Propiedades del contexto
interface AuthContextProps {
  id: string | null; // ID del usuario
  email: string | null; // Email del usuario
  isSigned: boolean; // Estado de autenticación
  isLoading: boolean; // Estado de carga
  setSession: (token: string) => void; // Guardar token y establecer sesión
  logout: () => void; // Cerrar sesión
}

// Crear el contexto
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);


// Proveedor del contexto
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar la sesión desde el almacenamiento centralizado al inicio
  useEffect(() => {
    let isMounted = true; // Variable para verificar si el componente sigue montado
  
    const loadSession = async () => {
      const token = await getItem("token");
      console.log("token obtenido: ",token);
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          console.log("Token decodificado:", decodedToken); 
          if (isMounted) {
            setUserId(decodedToken.id);
            setEmail(decodedToken.emailContacto);
            setIsSigned(true);
          }
        } catch {
          console.error("Token inválido, eliminando sesión.");
          await removeItem("token");
        }
      }
      if (isMounted) {
        setIsLoading(false);
      }
    };
  
    loadSession();
  
    return () => {
      isMounted = false; // Limpiar al desmontar el componente
    };
  }, []);

  // Función para establecer una sesión (guardar token)
  const setSession = async (token: string) => {
    try {
      console.log("Guardando token:", token);
      await setItem("token", token);
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.id);
      setEmail(decodedToken.emailContacto); 
      setIsSigned(true);
    } catch {
      console.error("Error al establecer la sesión.");
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    await removeItem("token");
    setUserId(null);
    setEmail(null); 
    setIsSigned(false);
  };

  return (
    <AuthContext.Provider value={{ id, email, isSigned, isLoading, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
