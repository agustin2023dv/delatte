import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { addFavoriteRestaurantController, removeFavoriteRestaurantController } from '../controllers/favorite.controller';


const router = express.Router();

// *Ruta para agregar restaurante a favoritos
router.post('/', authMiddleware,addFavoriteRestaurantController);

// *Ruta para eliminar restaurante de favoritos
router.delete('/',authMiddleware, removeFavoriteRestaurantController);

export default router;