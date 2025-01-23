import { Stack } from "expo-router";
import { AuthProvider } from "contexts/AuthContext";

export default function HomeLayout() {
  return (
    <AuthProvider >
      <Stack screenOptions={{ headerShown: false }}>

      </Stack>
    </AuthProvider>
  );
} 