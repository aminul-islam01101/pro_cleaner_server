import { User, UserRole } from '@prisma/client';

export type TEmailLogin = {
  email: string;
  password: string;
};
export type TAccessToken = {
  accessToken: string;
};

export type TLoginUserResponse = TAccessToken & {
  email: string;
  role: UserRole;
  userId: string;
  refreshToken?: string;
};
export type TSignupInputs = User & {
  contactNo: string;
};
