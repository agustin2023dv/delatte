import { Router } from 'express';
import { registerRestaurantAndManagerController, getRestaurantByIdController, 
  updateRestaurantController, getRestaurantsByManagerIdController, 
  getAllRestaurantsController} 
from '../controllers/restaurante.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { managerOfRestaurantMiddleware } from '../middlewares/restaurant.middleware';
import {  validateRestaurantUpdate } from '../../../shared/utils/restaurant.validation';
import { getReviewsByRestaurantController } from '../controllers/resena.controller';

const router = Router();

//*Ruta para OBTENER todos los restaurantes
router.get('/',
  getAllRestaurantsController
);

//* Ruta para CREAR un restaurante (solo superadmins o managers pueden crear)
router.post(
  '/register-restaurant', 
  registerRestaurantAndManagerController
);

//* Ruta para OBTENER la información de un restaurante (cualquier usuario autenticado puede acceder)
router.get(
  '/:id', 
  authMiddleware, 
  getRestaurantByIdController
);

//* Ruta para ACTUALIZAR la información de un restaurante (solo el manager del restaurante o superadmin puede actualizar)
router.put(
  '/:id', 
  authMiddleware, 
  managerOfRestaurantMiddleware, // Verificar que sea el manager del restaurante o superadmin
  validateRestaurantUpdate,  // Validar todos los campos posibles en la actualización
  updateRestaurantController
);

//*Ruta para obtener los restaurantes gestionados por un manager
router.get('/manager/:managerId', 
  authMiddleware, 
  roleMiddleware(['manager', 'superadmin']), 
  getRestaurantsByManagerIdController);

//*Ruta para obtener las reviews del restaurante
  router.get('/:id/reviews', getReviewsByRestaurantController);

export default router;
