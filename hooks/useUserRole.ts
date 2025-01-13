import { useState, useEffect } from "react";
import { getItem } from "../storage/storage";

export function useUserRole() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState<boolean>(true);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const role = await getItem("userRole"); 
        setUserRole(role);
      } catch (error) {
        console.error("Error al obtener el rol del usuario:", error);
      } finally {
        setLoadingRole(false);
      }
    }

    fetchUserRole();
  }, []);

  return { userRole, loadingRole };
}


