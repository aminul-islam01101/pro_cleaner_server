import { z } from 'zod';

//% Update User validation
const updateUserZodSchema = z.object({
  body: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),

      contactNo: z.string().optional(),
      address: z.string().optional(),
      profileImg: z.string().optional(),
    })
    .optional(),
});
const getProfileZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});
const makeAdminZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    adminPermissions: z.array(z.string(), {
      required_error: 'Admin permissions are required',
    }),
  }),
});

export const UserValidations = {
  updateUserZodSchema,
  getProfileZodSchema,
  makeAdminZodSchema,
};
