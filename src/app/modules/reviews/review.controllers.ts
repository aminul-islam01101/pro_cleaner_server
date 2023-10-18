import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { Review } from '@prisma/client';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';

import { reviewServices } from './review.services';

//& GetUsers
const createReview: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id, role, email } = req.user as { id: string; role: string; email: string };
  console.log(
    '🌼 🔥🔥 file: review.controllers.ts:14 🔥🔥 constcreateReview:RequestHandler=catchAsync 🔥🔥 id🌼',
    id
  );

  const { serviceId } = req.params;
  const result = await reviewServices.createReview(req.body as Review, serviceId, id);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully!',
    data: result,
  });
});
//& GetReviews
// const getReviews: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//   const { id, role, email } = req.user as { id: string; role: string; email: string };
//   const result = await reviewServices.getReviews(id, role, email);

//   sendResponse<Review[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Review retrieved successfully!',
//     data: result,
//   });
// });
//&  getReview
// const getReview: RequestHandler = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await reviewServices.getReview(id);

//   sendResponse<Review>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Review retrieved successfully!',
//     data: result,
//   });
// });
//& Update Review
const updateReview: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body as Review;
  const result = await reviewServices.updateReview(id, updateData);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully!',
    data: result,
  });
});
//& Delete Review
const deleteReview: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.deleteReview(id);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully!',
    data: result,
  });
});

export const reviewControllers = {
  // getReviews,
  // getReview,
  updateReview,
  deleteReview,
  createReview,
};
