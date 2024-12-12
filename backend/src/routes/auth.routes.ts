import express from 'express';
import {
  loginCustomerController,
  loginManagerController,
  registrarUsuarioController,
  verificarEmailController,
  cambiarContrasenaController,
  requestPasswordResetController,
  resetPasswordController,
} from '../controllers/usuario.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { loginRateLimiter } from '../middlewares/rateLimiter.middlware';

const router = express.Router();

// Rutas de autenticación
router.post('/register', registrarUsuarioController);
router.get('/verify-email', verificarEmailController);
router.post('/login-customer', loginRateLimiter, loginCustomerController);
router.post('/login-manager', loginRateLimiter, loginManagerController);
router.put('/change-password', authMiddleware, cambiarContrasenaController);
router.post('/request-password-reset', requestPasswordResetController);
router.post('/password-reset', resetPasswordController);

export default router;
