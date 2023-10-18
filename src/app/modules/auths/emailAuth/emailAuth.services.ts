// Import PrismaClient or any database client you are using
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { configs } from '../../../../utils/configs/env.configs';
import { HandleApiError } from '../../../../utils/shared/errors/handleApiError';
import { jwtHelpers } from '../../../../utils/shared/helpers/jwtHelpers';
import prisma from '../../../../utils/shared/helpers/prisma';
import { TEmailLogin, TLoginUserResponse, TSignupInputs } from './emailAuth.types';

/* eslint-disable no-param-reassign */

export const isUserExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

//# Create User
const createUser = async (user: TSignupInputs): Promise<User | null> => {
  const isUserExist = await isUserExists(user.email);
  if (isUserExist) {
    throw new HandleApiError(httpStatus.CONFLICT, 'User already exist!');
  }
  const { contactNo, ...userData } = user;

  return prisma.$transaction(async (transactionClient) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await transactionClient.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    if (!createdUser) {
      throw new HandleApiError(httpStatus.BAD_REQUEST, 'Unable to create user');
    }

    const createdProfile = await transactionClient.profile.create({
      data: {
        userId: createdUser.id,
        contactNo,
      },
    });

    if (!createdProfile) {
      throw new HandleApiError(httpStatus.BAD_REQUEST, 'Unable to create user profile');
    }

    return createdUser;
  });
};

//#  login user

const loginUser = async (payload: TEmailLogin): Promise<TLoginUserResponse> => {
  const { email, password } = payload;
  const isUserExist = await isUserExists(email);
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  // Verify the password
  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordValid) {
    throw new HandleApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  // create access token & refresh token
  const oneYearAgo = Math.floor(Date.now() / 1000) - 31536000;

  const { id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id, role, email, iat: oneYearAgo },
    configs.jwtSecretAccess as Secret,
    configs.jwtSecretAccessExpired as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role, email },
    configs.jwtSecretRefresh as Secret,
    configs.jwtSecretRefreshExpired as string
  );

  return {
    accessToken,
    refreshToken,
    email,
    role,
    userId: id,
  };
};

export const emailAuthServices = {
  createUser,
  loginUser,
};
