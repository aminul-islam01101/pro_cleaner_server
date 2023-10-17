import express from 'express';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import zodValidator from '../../../utils/middlewares/zodValidator';
import { UserRole } from '../../../utils/shared/enum';
import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validations';

const router = express.Router();
const { ADMIN, SUPER_ADMIN } = UserRole;
router.get(
  '/profile',
  zodValidator(UserValidations.getProfileZodSchema),
  UserControllers.getProfile
);
router.post(
  '/make-admin',
  roleVerifier(SUPER_ADMIN),
  zodValidator(UserValidations.makeAdminZodSchema),
  UserControllers.makeAdmin
);

router.get('/', UserControllers.getUsers);
// router.get('/', roleVerifier(ADMIN), UserControllers.getUsers);

// router.use('/:id', roleVerifier(ADMIN));
router
  .route('/:id')
  .get(UserControllers.getUser)
  .patch(zodValidator(UserValidations.updateUserZodSchema), UserControllers.updateUser)
  .delete(UserControllers.deleteUser);

//% formate
// router.route('/create-user',).post(

//   zodValidator(UserValidation.createUserZodSchema),
//   UserControllers.createUser
// router.route('/bulk-update').patch(productController.bulkUpdateProduct);
// router.route('/bulk-delete').delete(productController.bulkDeleteProduct);

// router.route('/').get(productController.getProducts).post(productController.createProduct);

// router
//   .route('/:id')
//   .patch(productController.updateProductById)
//   .delete(productController.deleteProductById);
export const userRoutes = router;
