import express from 'express';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import zodValidator from '../../../utils/middlewares/zodValidator';
import { UserRole } from '../../../utils/shared/enum';
import { categoryControllers } from './category.controllers';
import { categoryValidations } from './category.validations';

const router = express.Router();
const { ADMIN, SUPER_ADMIN } = UserRole;

router.post(
  '/',
  roleVerifier(ADMIN),
  zodValidator(categoryValidations.createUpdateCategoryZodSchema),
  categoryControllers.createCategory
);
router.get('/', categoryControllers.getCategories);
// router.get('/', roleVerifier(ADMIN), categoryControllers.getcategorys);

// router.use('/:id', roleVerifier(ADMIN));
router
  .route('/:id')
  .get(categoryControllers.getCategory)
  .patch(
    zodValidator(categoryValidations.createUpdateCategoryZodSchema),
    categoryControllers.updateCategory
  )
  .delete(categoryControllers.deleteCategory);

export const categoryRoutes = router;
