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
        <Stack.Screen name="screens/auth/Login" options={{title:'Login'}}/>
        <Stack.Screen name="screens/auth/Register" options={{title:'Register'}}/>
        <Stack.Screen name="screens/auth/VerifyEmail" options={{title:'VerifyEmail'}}/>
        <Stack.Screen name="screens/auth/ForgotPassword" options={{title:'ForgotPassword'}}/>
        <Stack.Screen name="screens/auth/ResetPassword" options={{title:'ResetPassword'}}/>
        <Stack.Screen name="screens/home" options={{title:'Home'}} />
      </Stack>
    </AuthProvider>
  );
}
