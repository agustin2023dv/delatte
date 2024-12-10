import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../../shared/interfaces/IUser';

const UserSchema: Schema = new Schema({
  nombre: { type: String }, // Nombre del usuario
  apellido: { type: String  }, // Apellido del usuario
  email: { type: String,  unique: true }, // Correo único del usuario
  password: { type: String }, // Contraseña hasheada
  isVerified: { type: Boolean, default: false }, // Indicador de si el email del usuario ha sido verificado
  emailToken: { type: String }, // Token de verificación de email
  dob: { type: Date , default: null}, // Fecha de nacimiento del usuario
  phone: { type: String, default: "No especificado"}, // Número de teléfono del usuario
  address: { type: String }, // Lista de domicilios del usuario
  favoriteRestaurants: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }], default: [] },
  profileImage: { type: String, default: "Imagen de perfil" }, // URL de la imagen de perfil del usuario
  role: { type: String, enum: ['customer', 'manager', 'superadmin'], default: 'customer' }, // Rol del usuario, con valor por defecto 'customer'
});

const User = mongoose.model<IUser>('User', UserSchema, 'usuarios'); // Crear el modelo de usuario basado en el esquema
export default User;
