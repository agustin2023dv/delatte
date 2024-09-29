import { useAuth } from "@/app/contexts/AuthContext";
import { Alert, Button } from "react-native";


const LogoutButton = () => {
const {logout} = useAuth();

const handleLogout = () => {
  Alert.alert(
    "Cerrar Sesión",
    "¿Estás seguro que deseas cerrar sesión?",
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar Sesión", onPress: logout },
    ]
  );
};

return (
    <Button title="Cerrar Sesión" onPress={handleLogout} />
  );

}

export default LogoutButton;