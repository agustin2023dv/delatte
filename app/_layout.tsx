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
        <Stack.Screen name="screens/auth/login/Login"/>
        <Stack.Screen name="screens/auth/register/Register" />
        <Stack.Screen name="screens/auth/VerifyEmail" />
        <Stack.Screen name="screens/home/HomeScreen" />
      </Stack>
    </AuthProvider>
  );
}
