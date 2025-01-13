import { Router } from 'express';
import { registerRestaurantAndManagerController, getRestaurantByIdController, 
  updateRestaurantController, getRestaurantsByManagerIdController, 
  getAllRestaurantsController,
  getSearchResultsController,
  removePhotoFromGalleryController,
  addPhotoToGalleryController,
  getGalleryPhotosController,
  checkManagerRoleController} 
from '../controllers/restaurante.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';
import { managerOfRestaurantMiddleware } from '../middlewares/restaurant.middleware';
import {  validateRestaurantUpdate } from '../../../shared/utils/restaurant.validation';
import { getReviewsByRestaurantController } from '../controllers/resena.controller';
import { uploadMiddleware } from 'backend/middlewares/upload.middleware';

const router = Router();

//*Ruta para OBTENER todos los restaurantes
router.get('/',
  getAllRestaurantsController
);

//* Ruta para buscar restaurantes por ubicación o tipo de comida
 router.get('/search', 
  getSearchResultsController );

//* Ruta para CREAR un restaurante (solo superadmins o managers pueden crear)
router.post(
  '/register-restaurant', 
  registerRestaurantAndManagerController
);

//* Ruta para OBTENER la información de un restaurante (cualquier usuario autenticado puede acceder)
router.get(
  '/:id', 
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
router.get('/manager/:emailContacto', 
  getRestaurantsByManagerIdController);

//*Ruta para obtener las reviews del restaurante
  router.get('/:id/reviews', getReviewsByRestaurantController);


//* Rutas relacionadas con la galería de fotos
router.get("/:id/gallery", authMiddleware, getGalleryPhotosController);

router.post(
  "/:id/gallery",
  authMiddleware,
  managerOfRestaurantMiddleware, 
  uploadMiddleware, // Middleware de multer para manejar la subida de archivos
  addPhotoToGalleryController
);

router.delete(
  "/:id/gallery",
  authMiddleware,
  managerOfRestaurantMiddleware, 
  removePhotoFromGalleryController
);

router.get('/:restaurantId/is-manager', 
  authMiddleware, 
  checkManagerRoleController);

export default router;
