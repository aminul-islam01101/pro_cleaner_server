import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { UserRole } from '../../../utils/shared/enum';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import { serviceControllers } from './service.controllers';
import { serviceValidations } from './service.validations';

const router = express.Router();
const { ADMIN, SUPER_ADMIN } = UserRole;

router.post('/', roleVerifier(ADMIN), serviceControllers.createService);
router.get('/', serviceControllers.getServices);
// router.get('/', roleVerifier(ADMIN), serviceControllers.getservices);

// router.use('/:id', roleVerifier(ADMIN));
router
  .route('/:id')
  .get(serviceControllers.getService)
  .patch(zodValidator(serviceValidations.updateServiceZodSchema), serviceControllers.updateService)
  .delete(serviceControllers.deleteService);

export const serviceRoutes = router;
