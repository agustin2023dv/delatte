import { Router } from 'express';
import { registerRestaurantAndManagerController, getRestaurantByIdController, updateRestaurantController, getRestaurantsByManagerIdController } 
from '../controllers/restaurante.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { managerOfRestaurantMiddleware } from '../middlewares/restaurant.middleware';
import { validateRestaurantCreation, validateRestaurantUpdate } from 'shared/utils/restaurant.validation';

const router = Router();

//* Ruta para CREAR un restaurante (solo superadmins o managers pueden crear)
router.post(
  '/register-restaurant', 
  authMiddleware, 
  roleMiddleware(['superadmin', 'manager']),
  validateRestaurantCreation,  // Validar solo nombre y dirección en la creación
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

export default router;
