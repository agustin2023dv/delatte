import express from 'express';
import {addFavoriteRestaurantController, cambiarContrasenaController, getUserProfileController,
      loginCustomerController,loginManagerController, registrarUsuarioController,
     removeFavoriteRestaurantController,
     requestPasswordResetController,
     resetPasswordController,
     updateUserDataController, verificarEmailController} from '../controllers/usuario.controller'
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
router.put('/profile', authMiddleware, updateUserDataController);

// *Ruta para agregar restaurante a favoritos
router.post('/favorites', authMiddleware,addFavoriteRestaurantController);

// *Ruta para eliminar restaurante de favoritos
router.delete('/favorites',authMiddleware, removeFavoriteRestaurantController);

//* Ruta para solicitar un enlace de restablecimiento de contraseña
router.post('/request-password-reset', requestPasswordResetController);

//* Ruta para restablecer la contraseña con el token
router.post('/password-reset', resetPasswordController);

export default router;