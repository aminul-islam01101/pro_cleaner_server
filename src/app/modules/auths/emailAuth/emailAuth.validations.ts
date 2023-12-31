import { z } from 'zod';
import { AdminPermissions, UserRole } from '../../../../utils/shared/enum';

//% Create User validation
const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'Name is required',
    }),
    lastName: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.nativeEnum(UserRole).optional(),
    adminPermissions: z.array(z.string()).optional(),
    contactNo: z.string({
      required_error: 'contactNo is required',
    }),
  }),
});

//% Login user validation
const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'email is required',
    }),
  }),
});

export const emailAuthValidations = {
  createUserZodSchema,
  loginUserZodSchema,
};
