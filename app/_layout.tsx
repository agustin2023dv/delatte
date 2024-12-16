import { Stack } from "expo-router";
import { AuthProvider } from "contexts/AuthContext";

export default function HomeLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="VerifyEmail" options={{ title: "VerifyEmail" }} />
        <Stack.Screen name="forgotPassword/ForgotPassword" options={{ title: "ForgotPassword" }} />
        <Stack.Screen name="forgotPassword/ResetPassword" options={{ title: "ResetPassword" }} />
        <Stack.Screen name="home" options={{ title: "Home" }} />
      </Stack>
    </AuthProvider>
  );
}
