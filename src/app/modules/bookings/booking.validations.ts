import { z } from 'zod';

//% create Booking validation
const createBookingZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    serviceId: z.string(),
    date: z.string(),
    slotId: z.string(),
  }),
});
//% update Booking validation
const updateBookingZodSchema = z.object({
  body: z
    .object({
      serviceId: z.string().optional(),
      date: z.string().optional(),
      slotId: z.string().optional(),
    })
    .optional(),
});

export const bookingValidations = {
  createBookingZodSchema,
  updateBookingZodSchema,
};
