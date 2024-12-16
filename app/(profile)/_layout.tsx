import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="admin-profile/[id]" options={{ title: "AdminProfile" }} />
        <Stack.Screen name="customer-profile/[id]" options={{ title: "CustomerProfile" }} />
        <Stack.Screen name="manager-profile/[id]" options={{ title: "ManagerProfile" }} />
      </Stack>
  );
}
