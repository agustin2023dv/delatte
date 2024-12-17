import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { addFavoriteRestaurantController, getUserFavoritesController, removeFavoriteRestaurantController } from '../controllers/favorite.controller';


const router = express.Router();


router.get("/", authMiddleware, getUserFavoritesController);

// *Ruta para agregar restaurante a favoritos
router.post('/', authMiddleware,addFavoriteRestaurantController);

// *Ruta para eliminar restaurante de favoritos
router.delete('/',authMiddleware, removeFavoriteRestaurantController);

export default router;