import User from '../models/User';
import crypto from 'crypto';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }); // Buscar usuario por email en la base de datos
};

export const registerUser = async (nombre: string, apellido: string, email: string, hashedPassword: string) => {
  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await findUserByEmail(email);
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
