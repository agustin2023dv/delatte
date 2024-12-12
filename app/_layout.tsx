import { Stack } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from "./contexts/AuthContext";

export default function HomeLayout() {
  return (
    <NavigationContainer>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="screens/auth/login" options={{ title: "Login" }} />
            <Stack.Screen name="screens/auth/register" options={{ title: "Register" }} />
            <Stack.Screen name="screens/auth/VerifyEmail" options={{ title: "VerifyEmail" }} />
            <Stack.Screen name="screens/auth/forgotPassword/ForgotPassword" options={{ title: "ForgotPassword" }} />
            <Stack.Screen name="screens/auth/forgotPassword/ResetPassword" options={{ title: "ResetPassword" }} />
            <Stack.Screen
              name="screens/addresses/SavedAddresses"
              options={{ title: "Saved Addresses" }}
            />
            <Stack.Screen name="screens/home" options={{ title: "Home" }} />
          </Stack>
        </AuthProvider>


    </NavigationContainer>
    
  );
}
