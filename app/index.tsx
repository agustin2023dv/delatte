import { Text, View } from "react-native";
import { Link } from "expo-router";

// Componente principal que muestra enlaces de navegación
export default function Index() {
  return (
    <View>
      {/* Enlace para navegar a la pantalla de login */}
      <Link href="../screens/auth/login">Login</Link>
      
      {/* Enlace para navegar a la pantalla de registro */}
      <Link href="../screens/auth/register">Register</Link>
      
      {/* Texto que indica la pantalla actual */}
      <Text>Home screen</Text>
    </View>
  );
}
