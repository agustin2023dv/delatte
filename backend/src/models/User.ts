import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema: Schema = new Schema({
  nombre: { type: String, required: true }, // Nombre del usuario
  apellido: { type: String, required: true }, // Apellido del usuario
  email: { type: String, required: true, unique: true }, // Correo único del usuario
  password: { type: String, required: true }, // Contraseña hasheada
  isVerified: { type: Boolean, default: false }, // Indicador de si el email del usuario ha sido verificado
  emailToken: { type: String }, // Token de verificación de email
  dob: { type: Date }, // Fecha de nacimiento del usuario
  phone: { type: String }, // Número de teléfono del usuario
  addresses: { type: [String] }, // Lista de domicilios del usuario
  profileImage: { type: String }, // URL de la imagen de perfil del usuario
  role: { type: String, enum: ['customer', 'manager', 'superadmin'], default: 'customer' }, // Rol del usuario, con valor por defecto 'customer'
});

const User = mongoose.model<IUser>('User', UserSchema, 'usuarios'); // Crear el modelo de usuario basado en el esquema
export default User;
