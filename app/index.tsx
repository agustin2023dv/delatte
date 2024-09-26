import { Text, View } from "react-native";
import { Link } from "expo-router";
import Navbar from "components/Navbar";

// Componente principal que muestra enlaces de navegación
export default function Index() {
  return (
    <view style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      {/* Incluir el Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <View style={{ padding: 20 }}>
        <Text>Home screen</Text>
      </View>
    </View>
    <View>
      {/* Enlace para navegar a la pantalla de login */}
      <Link href="../screens/auth/login">Login</Link>
      
      {/* Enlace para navegar a la pantalla de registro */}
      <Link href="../screens/auth/register">Register</Link>
      
      {/* Texto que indica la pantalla actual */}
      <Text>Home screen</Text>
    </View>
    </view>
  );
}
