import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { User } from '@prisma/client';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { UserServices } from './user.services';
import { TMakeAdmin, TUserUpdate } from './user.types';

//& GetUsers
const getUsers: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUsers();

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  });
});
//&  getUser
const getUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getUser(id);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});
//& Update User
const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body as Partial<TUserUpdate>;
  const result = await UserServices.updateUser(id, updateData);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});
//& Delete User
const deleteUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});
//& getProfile
const getProfile: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as { email: string };
  const result = await UserServices.getProfile(email);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile retrieved successfully!',
    data: result,
  });
});
//& makeAdmin
const makeAdmin: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.makeAdmin(req.body as TMakeAdmin);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfile,
  makeAdmin,
};
