// Validar que el nombre solo contenga letras y espacios
export const validateNombre = (nombre: string): string | null => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nombre) return "El nombre es requerido";
    if (!nameRegex.test(nombre)) return "El nombre solo puede contener letras y espacios";
    if (nombre.length < 2) return "El nombre debe tener al menos 2 caracteres";
    return null;
  };
  
  //****/
  // Validar que el apellido solo contenga letras y espacios
  export const validateApellido = (apellido: string): string | null => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!apellido) return "El apellido es requerido";
    if (!nameRegex.test(apellido)) return "El apellido solo puede contener letras y espacios";
    if (apellido.length < 2) return "El apellido debe tener al menos 2 caracteres";
    return null;
  };
  
  // Validar el formato del correo electrónico
  export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return "El correo es requerido";
    if (!emailRegex.test(email)) return "El correo no es válido";
    return null;
  };
  
  // Validar la contraseña
  export const validatePassword = (password: string): string | null => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{7,}$/;
    if (!password) return "La contraseña es requerida";
    if (!passwordRegex.test(password)) 
      return "La contraseña debe tener al menos 7 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo";
    return null;
  };
  
  // Validar la confirmación de la contraseña
  export const validateConfirmPassword = (password: string, cPassword: string): string | null => {
    if (!cPassword) return "Confirma la contraseña";
    if (password !== cPassword) return "Las contraseñas no coinciden";
    return null;
  };

  // Validar nombre del restaurante
  export const validateRestaurantName = (restaurantName: string): string | null => {
    const nameRegex = /^[a-zA-Z0-9\s]+$/; // Permitir letras, números y espacios
    if (!restaurantName) return "El nombre del restaurante es requerido";
    if (!nameRegex.test(restaurantName)) return "El nombre del restaurante solo puede contener letras, números y espacios";
    if (restaurantName.length < 3) return "El nombre del restaurante debe tener al menos 3 caracteres";
    return null;
  };

  
  // Validar direccion del restaurante
  export const validateRestaurantAddress = (address: string): string | null => {
    if (!address) return "La dirección del restaurante es requerida";
    if (address.length < 7) return "La dirección del restaurante debe tener al menos 7 caracteres";
    return null;
  };
  