import {  View } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import { useAuth } from "hooks/useAuth";

// Componente principal que muestra enlaces de navegación
export default function Home() {
  const user = useAuth();

  console.log(user.isSigned);
  
  if(user.isSigned){
    
    return(
      router.replace("/home")
    )

  }
  else{
    return (
      <View>
        {/* Enlace para navegar a la pantalla de login */}
        <Link href="/login">Inicia sesión</Link>
        
        {/* Enlace para navegar a la pantalla de registro */}
        <Link href="/register">Regístrate</Link>
        
        

      </View>
    );
  }
  }
  
  