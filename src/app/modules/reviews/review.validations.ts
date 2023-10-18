import { z } from 'zod';

//% create review validation
const createReviewZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    // serviceId: z.string(),
    rating: z.number(), // Assuming rating can be any valid number
    comment: z.string(),
  }),
});
//% update review validation
const updateReviewZodSchema = z.object({
  body: z
    .object({
      rating: z.number().optional(),
      comment: z.string().optional(),
      serviceId: z.string(),
    })
    .optional(),
});

export const reviewValidations = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
