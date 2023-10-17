import { z } from 'zod';

//% create category validation
const createUpdateSlotZodSchema = z.object({
  body: z.object({
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const slotValidations = {
  createUpdateCategoryZodSchema: createUpdateSlotZodSchema,
};
