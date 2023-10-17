import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { Slot } from '@prisma/client';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { slotServices } from './slot.services';

//& GetUsers
const createSlot: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await slotServices.createSlot(req.body as Slot);

  sendResponse<Slot>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot created successfully!',
    data: result,
  });
});
//& GetUsers
const getSlots: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await slotServices.getSlots();

  sendResponse<Slot[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot retrieved successfully!',
    data: result,
  });
});
//&  getSlot
const getSlot: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await slotServices.getSlot(id);

  sendResponse<Slot>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot retrieved successfully!',
    data: result,
  });
});
//& Update Slot
const updateSlot: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body as Slot;
  const result = await slotServices.updateSlot(id, updateData);

  sendResponse<Slot>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot updated successfully!',
    data: result,
  });
});
//& Delete Slot
const deleteSlot: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await slotServices.deleteSlot(id);

  sendResponse<Slot>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot deleted successfully!',
    data: result,
  });
});

export const slotControllers = {
  getSlots,
  getSlot,
  updateSlot,
  deleteSlot,
  createSlot,
};
