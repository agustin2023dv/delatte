import {  Text, View } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "./contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutButton from "components/buttons/LogOutButton";

// Componente principal que muestra enlaces de navegación
export default function Home() {
  const user = useAuth();

  
  if(user.isAuthenticated){
    return(<>
      <SafeAreaView>
        <Text>ok</Text>
        <LogOutButton/>
      </SafeAreaView>
    
    </>)

  }
  else{
    return (
      <View>
        {/* Enlace para navegar a la pantalla de login */}
        <Link href="../screens/auth/login">Inicia sesión</Link>
        
        {/* Enlace para navegar a la pantalla de registro */}
        <Link href="../screens/auth/register">Regístrate</Link>
        
        {/* Texto que indica la pantalla actual */}
        <Text>Home screen</Text>
      </View>
    );
  }
  }
  
  
