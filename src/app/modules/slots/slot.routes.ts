import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { UserRole } from '../../../utils/shared/enum';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import { slotControllers } from './slot.controllers';
import { slotValidations } from './slot.validations';

const router = express.Router();
const { ADMIN, SUPER_ADMIN } = UserRole;

router.post('/', roleVerifier(ADMIN), slotControllers.createSlot);
router.get('/', slotControllers.getSlots);
// router.get('/', roleVerifier(ADMIN),slotControllers.getSlots);

// router.use('/:id', roleVerifier(ADMIN));
router
  .route('/:id')
  .get(slotControllers.getSlot)
  .patch(zodValidator(slotValidations.createUpdateCategoryZodSchema), slotControllers.updateSlot)
  .delete(slotControllers.deleteSlot);

export const slotRoutes = router;
