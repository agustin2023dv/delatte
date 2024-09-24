import express from 'express';
import {cambiarContrasenaController, getUserProfileController, loginCustomerController,loginManagerController, registrarUsuarioController, updateUserProfileController, verificarEmailController} from '../controllers/usuario.controller'
import {authMiddleware} from '../middlewares/auth.middleware';
import { loginRateLimiter } from '../middlewares/rateLimiter.middlware';

const router = express.Router();

//*Ruta para registrar un nuevo usuario
router.post('/register', registrarUsuarioController);

//*Ruta para verificar email
router.get('/verify-email', verificarEmailController);

//*Ruta para cambiar la contraseña
router.put('/change-password', authMiddleware, cambiarContrasenaController);

//*Ruta para hacer login como CUSTOMER
router.post('/login-customer',loginRateLimiter,loginCustomerController);

//*Ruta para hacer login como MANAGER
router.post('/login-manager',loginRateLimiter, loginManagerController);

//*Ruta para obtener la información del perfil del usuario (GET)
router.get('/profile', authMiddleware, getUserProfileController);

//*Ruta para actualizar el perfil del usuario (PUT)
router.put('/profile', authMiddleware, updateUserProfileController);

export default router;