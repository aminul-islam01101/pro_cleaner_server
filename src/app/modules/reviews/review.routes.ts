import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { UserRole } from '../../../utils/shared/enum';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import { reviewValidations } from './review.validations';
import { reviewControllers } from './review.controllers';

const router = express.Router();
const { ADMIN, SUPER_ADMIN, USER } = UserRole;

router.post(
  '/:serviceId',
  roleVerifier(USER),
  zodValidator(reviewValidations.createReviewZodSchema),
  reviewControllers.createReview
);
// router.get('/', reviewControllers.getReviews);
// router.get('/', roleVerifier(ADMIN), reviewControllers.getreviews);

// router.use('/:id', roleVerifier(ADMIN));
router
  .route('/:id')
  // .get(reviewControllers.getreview)
  .patch(zodValidator(reviewValidations.updateReviewZodSchema), reviewControllers.updateReview)
  .delete(reviewControllers.deleteReview);

export const reviewRoutes = router;
