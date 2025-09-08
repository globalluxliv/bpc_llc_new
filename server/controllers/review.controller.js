import Review from '../models/review.model.js';
import { errorHandler } from '../utils/error.js';

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({});
        if (!reviews) {
          return next(errorHandler(404, 'No reviews found!'));
        }
      return res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
};
  