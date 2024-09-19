import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../services/user.service';
import { comparePassword, hashPassword } from '../services/auth.service';
import { sendEmail } from '../services/email.service';
import User from '../models/User';
import { randomBytes } from 'crypto';

//**Controlador para registrar un nuevo usuario**
export const registrarUsuarioController = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    // Hashear la contraseña del usuario
    const hashedPassword = await hashPassword(password);

    // Generar un token único para verificar el email
    const emailToken = randomBytes(32).toString('hex');

    // Crear y guardar el nuevo usuario en la base de datos
    const newUser = new User({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      isVerified: false,
      emailToken: emailToken,
    });

    await newUser.save();

    // Generar el link de verificación de email
    const verificationLink = `http://localhost:8081/api/users/verify-email?token=${emailToken}`;

    // Enviar el correo de verificación al usuario
    await sendEmail({
      to: email,
      subject: 'Verifica tu email',
      text: `Hola ${nombre},\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
      html: `<h1>Hola ${nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
    });

    res.status(201).json({ message: 'Usuario registrado con éxito. Por favor verifica tu email.', user: newUser });
  } catch (error) {
    console.error('Error en registrarUsuarioController:', error);
    res.status(400).json({ message: error instanceof Error ? error.message : 'Error al registrar el usuario' });
  }
};

//**Controlador para iniciar sesión**
export const loginUsuarioController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el email ha sido confirmado
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Por favor verifica tu email antes de iniciar sesión.' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT para el usuario autenticado
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error instanceof Error ? error.message : 'Error desconocido' });
  }
};

//**Controlador para verificar el email**
export const verificarEmailController = async (req: Request, res: Response) => {
  try {
    const emailToken = req.query.token as string;

    if (!emailToken) {
      return res.redirect(`http://localhost:8082/verify-email?status=error&message=Tokennoproporcionado`);
    }

    // Buscar al usuario por el token de email
    const user = await User.findOne({ emailToken });

    if (user) {
      // Marcar el email como verificado y eliminar el token
      user.emailToken = null;
      user.isVerified = true;
      await user.save();

      return res.redirect(`http://localhost:8082/verify-email?status=success&message=emailverificado`);
    } else {
      return res.redirect(`http://localhost:8082/verify-email?status=error&message=TokenInvalido`);
    }
  } catch (error) {
    return res.redirect(`http://localhost:8082/verify-email?status=error&message=servererror`);
  }
};

//**Controlador para obtener el perfil del usuario**
export const getUserProfileController = async (req: Request, res: Response) => {
  try {
    // Obtener el ID del usuario desde el token
    const userId = (req as any).user.id;

    // Buscar al usuario por su ID
    const user = await User.findById(userId).select('-password -emailToken');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devolver la información del usuario
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

//**Controlador para actualizar el perfil del usuario**
export const updateUserProfileController = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user; // Usuario autenticado
    const { dob, telefono, direccion } = req.body;

    // Actualizar solo los campos permitidos
    user.dob = dob || user.dob;
    user.telefono = telefono || user.telefono;
    user.direccion = direccion || user.direccion;

    await user.save();

    res.status(200).json({ message: 'Perfil actualizado con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil', error });
  }
};
