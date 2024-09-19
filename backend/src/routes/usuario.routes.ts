import express from 'express';
import {getUserProfileController, loginUsuarioController as loginUserController, registrarUsuarioController, updateUserProfileController, verificarEmailController} from '../controllers/usuario.controller'
import {authMiddleware} from '../middlewares/auth.middleware';

const router = express.Router();

//*Ruta para registrar un nuevo usuario
router.post('/register', registrarUsuarioController);

//*Ruta para verificar email
router.get('/verify-email', verificarEmailController);

//*Ruta para hacer login 
router.post('/login',loginUserController);

//*Ruta para obtener la información del perfil del usuario (GET)
router.get('/profile', authMiddleware, getUserProfileController);

//*Ruta para actualizar el perfil del usuario (PUT)
router.put('/profile', authMiddleware, updateUserProfileController);

export default router;