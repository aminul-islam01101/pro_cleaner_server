import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { User } from '@prisma/client';
import catchAsync from '../../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../../utils/shared/helpers/sendResponse';

import { cookieOptions } from '../../../../utils/shared/helpers/cookieOptions';
import { emailAuthServices } from './emailAuth.services';
import { TEmailLogin, TLoginUserResponse } from './emailAuth.types';

//& Create User
const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const user = req.body as User;

  const result = await emailAuthServices.createUser(user);

  if (result) {
    const { password, ...rest } = result;

    sendResponse<Omit<User, 'password'>>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: rest,
    });
  } else {
    sendResponse<User>(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'User creation failed!',
    });
  }
});

//& login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body as TEmailLogin;
  const result = await emailAuthServices.loginUser(loginData);
  const { refreshToken, ...rest } = result;

  // set refresh token into cookie

  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.cookie('accessToken', rest.accessToken, cookieOptions);

  sendResponse<TLoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: rest,
  });
});

export const emailAuthControllers = {
  createUser,
  loginUser,
};
