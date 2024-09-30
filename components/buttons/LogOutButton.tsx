import { useAuth } from "@/app/contexts/AuthContext";
import {  Button } from "react-native";


const LogOutButton = () => {
const user = useAuth();

const handleLogout = () => {
  user.logout();
};

return (
    <Button title="Cerrar sesión" onPress={handleLogout} />
  );

}

export default LogOutButton;