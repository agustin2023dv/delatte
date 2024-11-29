import { Request, Response } from 'express';
import { addFavoriteRestaurantService, changePasswordService, getUserDataService, loginCustomerService, loginManagerService, registerUserService, removeFavoriteRestaurantService, updateUserDataService } from '../services/user.service';
import { hashPasswordService } from '../services/auth.service';
import { sendEmailService } from '../services/email.service';
import User from '../models/User';

//**Controlador para registrar un nuevo usuario**
export const registrarUsuarioController = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    // Hashear la contraseña del usuario
    const hashedPassword = await hashPasswordService(password);

    // Registrar el nuevo usuario (la lógica está en el servicio)
    const newUser = await registerUserService(nombre, apellido, email, hashedPassword);

    // Generar el link de verificación de email
    const verificationLink = `http://localhost:8081/api/users/verify-email?token=${newUser.emailToken}`;

    // Enviar el correo de verificación al usuario
    await sendEmailService({
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

//**Controladores para iniciar sesión**

//*Login customer
export const loginCustomerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Llamar al servicio para iniciar sesión como cliente
    const { token, user } = await loginCustomerService(email, password);

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Error al iniciar sesión' });
  }
};

//*Login manager
export const loginManagerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Llamar al servicio para iniciar sesión como manager
    const { token, user } = await loginManagerService(email, password);

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(400).json({ message: error instanceof Error ? error.message : 'Error al iniciar sesión' });
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

    // Llamar al servicio para obtener los datos del usuario
    const user = await getUserDataService(userId);

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
export const updateUserDataController = async (req: Request, res: Response) => {
  try {
    // Obtener los datos actualizados del usuario desde el cuerpo de la solicitud
    const userData = req.body;

    // Ejecutar el servicio para actualizar los datos del usuario
    const updatedUser = await updateUserDataService(userData);

    return res.status(200).json({
      message: 'Datos del usuario actualizados con éxito',
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al actualizar los datos del usuario',
      error: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};


//**Controlador para actualizar contraseña

export const cambiarContrasenaController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Asegurarse de que todos los campos necesarios estén presentes
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Invocar el servicio para cambiar la contraseña
    const result = await changePasswordService(userId!, oldPassword, newPassword, confirmNewPassword);

    // Responder con éxito si no hay errores
    return res.status(200).json({ message: result.message });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// **Controlador para agregar un restaurante a favoritos**
export const addFavoriteRestaurantController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Asegúrate de obtener el ID del usuario desde el token o sesión
    const { restaurantId } = req.body; // ID del restaurante enviado en el cuerpo de la solicitud

    if (!restaurantId) {
      return res.status(400).json({ message: 'El ID del restaurante es obligatorio' });
    }

    // Llamar al servicio para agregar el restaurante a favoritos
    const user = await addFavoriteRestaurantService(userId, restaurantId);

    return res.status(200).json({
      message: 'Restaurante agregado a favoritos con éxito',
      favorites: user.favoriteRestaurants,
    });
  } catch (error) {
    console.error('Error en addFavoriteRestaurantController:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error interno del servidor',
    });
  }
};

// **Controlador para eliminar un restaurante de favoritos**
export const removeFavoriteRestaurantController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // Asegúrate de obtener el ID del usuario desde el token o sesión
    const { restaurantId } = req.body; // ID del restaurante enviado en el cuerpo de la solicitud

    if (!restaurantId) {
      return res.status(400).json({ message: 'El ID del restaurante es obligatorio' });
    }

    // Llamar al servicio para eliminar el restaurante de favoritos
    const user = await removeFavoriteRestaurantService(userId, restaurantId);

    return res.status(200).json({
      message: 'Restaurante eliminado de favoritos con éxito',
      favorites: user.favoriteRestaurants,
    });
  } catch (error) {
    console.error('Error en removeFavoriteRestaurantController:', error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error interno del servidor',
    });
  }
};