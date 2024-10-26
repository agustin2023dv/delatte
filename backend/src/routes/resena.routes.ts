import express from 'express';
import { createReviewController, updateReviewController, 
    deleteReviewController } from '../controllers/resena.controller';
import { validateReview, validateReviewUpdate } from '../../../shared/utils/review.validation';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleMiddleware } from '../middlewares/role.middleware';

const router = express.Router();

//*Ruta para crear una nueva reseña
router.post('/create-review', 
    validateReview, 
    authMiddleware, 
    roleMiddleware(['customer']), 
    createReviewController);

//*Ruta para editar una reseña
router.put('/:reviewId', 
    validateReviewUpdate, 
    authMiddleware,
    roleMiddleware(['customer']),
    updateReviewController);

//*Ruta para borrar una reseña
router.delete(
    '/:reviewId', 
    authMiddleware, 
    roleMiddleware(['customer', 'superadmin']), 
    deleteReviewController
  );

export default router;
