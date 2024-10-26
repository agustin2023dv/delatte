import { Request, Response } from 'express';
import { createReviewService, getReviewsByRestaurantService, updateReviewService, deleteReviewService } from '../services/review.service';

export const createReviewController = async (req: Request, res: Response) => {
  try {
    const newReview = await createReviewService(req.body);
    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getReviewsByRestaurantController = async (req: Request, res: Response) => {
  try {
    const reviews = await getReviewsByRestaurantService(req.params.restaurantId);
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  try {
    const updatedReview = await updateReviewService(req.params.reviewId, req.body);
    return res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    await deleteReviewService(req.params.reviewId);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
