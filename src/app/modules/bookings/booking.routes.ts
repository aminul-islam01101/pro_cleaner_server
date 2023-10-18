import express from 'express';

import zodValidator from '../../../utils/middlewares/zodValidator';
import { UserRole } from '../../../utils/shared/enum';

import roleVerifier from '../../../utils/middlewares/roleVerifier';
import { bookingControllers } from './booking.controllers';
import { bookingValidations } from './booking.validations';

const router = express.Router();
const { ADMIN, SUPER_ADMIN, USER } = UserRole;

router.post(
  '/',
  roleVerifier(USER),
  zodValidator(bookingValidations.createBookingZodSchema),
  bookingControllers.createBooking
);
router.get('/', bookingControllers.getBookings);
// router.get('/', roleVerifier(ADMIN), bookingControllers.getbookings);

// router.use('/:id', roleVerifier(ADMIN));
router
  .route('/:id')
  .get(bookingControllers.getBooking)
  .patch(zodValidator(bookingValidations.updateBookingZodSchema), bookingControllers.updateBooking)
  .delete(bookingControllers.deleteBooking);

export const bookingRoutes = router;
