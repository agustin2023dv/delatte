import { Stack } from "expo-router";
import { AuthProvider } from "./contexts/AuthContext";

// Layout que envuelve las pantallas de autenticación y provee el contexto de autenticación
export default function HomeLayout() {
  return (
    <AuthProvider>
      {/* Configuración de navegación entre pantallas */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Definición de las pantallas disponibles en el stack */}
        <Stack.Screen name="index"/>
        <Stack.Screen name="screens/auth/login"/>
        <Stack.Screen name="screens/auth/register" />
        <Stack.Screen name="screens/auth/verify-email" />
      </Stack>
    </AuthProvider>
  );
}
