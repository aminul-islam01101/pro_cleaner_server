import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { Booking } from '@prisma/client';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { bookingServices } from './booking.services';

//& GetUsers
const createBooking: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.createBooking(req.body as Booking);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully!',
    data: result,
  });
});
//& GetBookings
const getBookings: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id, role, email } = req.user as { id: string; role: string; email: string };
  const result = await bookingServices.getBookings(id, role, email);

  sendResponse<Booking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully!',
    data: result,
  });
});
//&  getBooking
const getBooking: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingServices.getBooking(id);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully!',
    data: result,
  });
});
//& Update Booking
const updateBooking: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body as Booking;
  const result = await bookingServices.updateBooking(id, updateData);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully!',
    data: result,
  });
});
//& Delete Booking
const deleteBooking: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await bookingServices.deleteBooking(id);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully!',
    data: result,
  });
});

export const bookingControllers = {
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  createBooking,
};
