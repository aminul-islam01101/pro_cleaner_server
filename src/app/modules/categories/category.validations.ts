import { z } from 'zod';

//% create category validation
const createUpdateCategoryZodSchema = z.object({
  body: z.object({
    title: z.string(),
  }),
});

export const categoryValidations = {
  createUpdateCategoryZodSchema,
};
