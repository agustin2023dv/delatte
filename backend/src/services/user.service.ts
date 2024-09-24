import User from '../models/User';
import crypto from 'crypto';
import { comparePasswordService, hashPasswordService } from './auth.service';
import jwt from 'jsonwebtoken';


//* Servicio para OBTENER usuario por email
export const findUserByEmailService = async (email: string) => {
  return await User.findOne({ email }); // Buscar usuario por email en la base de datos
};


//* Servicio para CREAR usuario
export const registerUserService = async (nombre: string, apellido: string, email: string, hashedPassword: string) => {
  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await findUserByEmailService(email);
  if (existingUser) {
    throw new Error('El correo ya está en uso.'); // Lanzar error si el email ya está registrado
  }

  // Crear un nuevo usuario con el token de verificación de email
  const newUser = new User({
    nombre,
    apellido,
    email,
    password: hashedPassword,
    emailToken: crypto.randomBytes(64).toString("hex"), // Generar un token único para la verificación del email
  });
  console.log('Guardando nuevo usuario:', newUser);

  try {
    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();
    console.log('Usuario guardado:', savedUser);
    return savedUser; // Devolver el usuario guardado
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    throw error; // Lanzar error si ocurre algún problema al guardar
  }
};

//* Servicio para crear MANAGER
export const registerManagerService = async (managerData: any) => {
  const hashedPassword = await hashPasswordService(managerData.password);
  
  const newManager = new User({
    nombre: managerData.nombre,
    apellido: managerData.apellido,
    email: managerData.email,
    password: hashedPassword,
    role: 'manager',
  });

  const savedManager = await newManager.save();
  
  return savedManager;
};

//* Servicio para login de CUSTOMER
export const loginCustomerService = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  // Verificar si el usuario existe
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar si el rol es 'customer'
  if (user.role !== 'customer') {
    throw new Error('El usuario no tiene permisos para iniciar sesión como cliente');
  }

  // Verificar la contraseña
  const isMatch = await comparePasswordService(password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar token JWT si la autenticación es correcta
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return { token, user };
};

//* Servicio para login de MANAGER
export const loginManagerService = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  // Verificar si el usuario existe
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar si el rol es 'manager'
  if (user.role !== 'manager') {
    throw new Error('El usuario no tiene permisos para iniciar sesión como manager');
  }

  // Verificar la contraseña
  const isMatch = await comparePasswordService(password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar token JWT si la autenticación es correcta
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return { token, user };
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