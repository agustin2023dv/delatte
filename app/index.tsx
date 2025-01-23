import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "hooks/useAuth";

export default function Home() {
  const user = useAuth();

 // Efecto para manejar la redirección
  useEffect(() => {
    if (user.isSigned) {
      router.replace("/home");
    }
  }, [user.isSigned]);

  // Mientras se verifica la autenticación o si el usuario no está autenticado
  if (user.isSigned) {
    return (
      <View>
        <Text>Redirigiendo...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Enlace para navegar a la pantalla de login */}
      <Link href="/login">Inicia sesión</Link>

      {/* Enlace para navegar a la pantalla de registro */}
      <Link href="/register">Regístrate</Link>
    </View>
  );
}
