import { z } from 'zod';

//% create service validation
const createServiceZodSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.string(),
    categoryId: z.string(),
  }),
});
//% update service validation
const updateServiceZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      price: z.string().optional(),
      categoryId: z.string().optional(),
    })
    .optional(),
});

export const serviceValidations = {
  createServiceZodSchema,
  updateServiceZodSchema,
};
