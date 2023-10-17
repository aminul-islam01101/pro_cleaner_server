// Import PrismaClient or any database client you are using
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import pick from '../../../utils/shared/helpers/pick';
import prisma from '../../../utils/shared/helpers/prisma';
import { isUserExists } from '../auths/emailAuth/emailAuth.services';
import { TMakeAdmin, TUserUpdate } from './user.types';

/* eslint-disable no-param-reassign */

//#  GetUsers
const getUsers = async (): Promise<User[] | null> => {
  const users = await prisma.user.findMany();
  return users;
};
//#  getUser
const getUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
//# Update User
const updateUser = async (id: string, payload: Partial<TUserUpdate>): Promise<User | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const userData = pick(payload, ['firstName', 'lastName']);
  const profileData = pick(payload, ['profileImg', 'address', 'contactNo']);

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: userData,
  });
  await prisma.profile.update({
    where: {
      userId: id,
    },
    data: profileData,
  });

  return updatedUser;
};
//# Delete User
const deleteUser = async (id: string): Promise<User | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  // Delete the user
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  return deletedUser;
};

//# get Profile

const getProfile = async (email: string): Promise<User | null> => {
  const isUserExist = await isUserExists(email);
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return isUserExist;
};
//# make admin

const makeAdmin = async (payload: TMakeAdmin): Promise<User | null> => {
  const isUserExist = await isUserExists(payload.email);
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const updatedUser = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: {
      role: 'admin', // Change the user role to 'admin'
      adminPermissions: payload.adminPermissions, // Update adminPermissions
    },
  });
  return updatedUser;
};
export const UserServices = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
  makeAdmin,
};
