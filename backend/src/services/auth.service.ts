import bcrypt from 'bcrypt';
import { findUserByEmailService } from './user.service';
import Token from '../models/token.model';
import crypto from 'crypto';
import User from '../models/User.model';
import { sendEmailService } from './email.service';

const saltRounds = 10; // Número de rondas para generar el salt

export const hashPasswordService = async (password: string): Promise<string> => {
  // Hashear la contraseña utilizando bcrypt con el número de rondas de salt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword; // Devolver la contraseña hasheada
};

export const comparePasswordService = async (password: string, hashedPassword: string): Promise<boolean> => {
  // Comparar la contraseña proporcionada con la almacenada hasheada
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch; // Devolver si la comparación fue exitosa o no
};


export const requestPasswordResetService = async (email: string): Promise<void> => {
  // Buscar al usuario por su email
  const user = await findUserByEmailService(email);

  if (!user) {
    throw new Error('El usuario no existe');
  }

  // Eliminar cualquier token existente para este usuario
  const existingToken = await Token.findOne({ userId: user._id });
  if (existingToken) await existingToken.deleteOne();

  // Generar un nuevo token de restablecimiento
  const resetToken = crypto.randomBytes(64).toString('hex');
  const hashedToken = await bcrypt.hash(resetToken, saltRounds);

  // Guardar el token hasheado en la base de datos
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
  }).save();

  // Generar el enlace de restablecimiento de contraseña
  const resetLink = `http://localhost:8082/screens/auth/forgotPassword/ResetPassword?token=${resetToken}&id=${user._id}`;


  // Enviar el correo al usuario con el enlace de restablecimiento
  try {
    await sendEmailService({
      to: user.email,
      subject: 'Restablecimiento de contraseña',
      text: `Hola ${user.nombre},\n\nPuedes restablecer tu contraseña haciendo clic en el siguiente enlace: ${resetLink}\n\nSi no solicitaste este cambio, ignora este mensaje.`,
      html: `<h1>Hola ${user.nombre}!</h1><p>Puedes restablecer tu contraseña haciendo clic en el siguiente enlace:</p><a href="${resetLink}">Restablecer contraseña</a><p>Si no solicitaste este cambio, ignora este mensaje.</p>`,
    });
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    throw new Error('Error al enviar el correo de restablecimiento de contraseña');
  }
};

export const resetPasswordService = async (token: string, userId: string, newPassword: string): Promise<void> => {
  const storedToken = await Token.findOne({ userId });

  // Validar que el token exista y coincida
  if (!storedToken || !(await bcrypt.compare(token, storedToken.token))) {
    throw new Error('Token inválido o expirado');
  }

  // Validar que el token no haya caducado
  const tokenAge = Date.now() - storedToken.createdAt.getTime();
  if (tokenAge > 3600000) { // 1 hora
    await storedToken.deleteOne();
    throw new Error('Token expirado');
  }

  // Buscar al usuario
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Hashear la nueva contraseña
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña del usuario
  user.password = hashedPassword;
  await user.save();

  // Eliminar el token después de su uso
  await storedToken.deleteOne();
};





//* Servicio para CAMBIAR contraseña
export const changePasswordService = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  // Verificar si la nueva contraseña y su confirmación coinciden
  if (newPassword !== confirmNewPassword) {
    throw new Error('La nueva contraseña y la confirmación no coinciden');
  }

  // Buscar al usuario por su ID
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar la contraseña actual
  const isMatch = await comparePasswordService(oldPassword, user.password);
  if (!isMatch) {
    throw new Error('La contraseña actual es incorrecta');
  }

  // Hashear la nueva contraseña
  const hashedNewPassword = await hashPasswordService(newPassword);

  // Actualizar la contraseña en el registro del usuario
  user.password = hashedNewPassword;
  await user.save(); // Guardar cambios en la base de datos

  return { message: 'Contraseña actualizada correctamente' };
};

