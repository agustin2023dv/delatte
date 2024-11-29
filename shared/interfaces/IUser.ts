import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId | string; // ID del usuario
  nombre: string; // Nombre del usuario
  apellido: string; // Apellido del usuario
  email: string; // Email del usuario
  password: string; // Contraseña hasheada del usuario
  isVerified: boolean; // Indica si el email ha sido verificado
  emailToken: string | null; // Token para la verificación del email, puede ser null si ya fue verificado
  dob?: Date; // Fecha de nacimiento opcional
  phone?: string; // Número de teléfono opcional
  address?: string; // Lista opcional de direcciones
  profileImage?: string; // URL opcional de la imagen de perfil
  favoriteRestaurants?: ObjectId[]; // Lista de IDs de restaurantes favoritos
  role: 'customer' | 'manager' | 'superadmin'; // Rol del usuario en el sistema
}
 


