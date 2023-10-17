import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';

import { Service } from '@prisma/client';
import catchAsync from '../../../utils/shared/helpers/catchAsync';
import sendResponse from '../../../utils/shared/helpers/sendResponse';
import { serviceServices } from './service.services';

//& GetUsers
const createService: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.createService(req.body as Service);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully!',
    data: result,
  });
});
//& GetServices
const getServices: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.getServices();

  sendResponse<Service[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully!',
    data: result,
  });
});
//&  getService
const getService: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await serviceServices.getService(id);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully!',
    data: result,
  });
});
//& Update Service
const updateService: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body as Service;
  const result = await serviceServices.updateService(id, updateData);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully!',
    data: result,
  });
});
//& Delete Service
const deleteService: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await serviceServices.deleteService(id);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully!',
    data: result,
  });
});

export const serviceControllers = {
  getServices,
  getService,
  updateService,
  deleteService,
  createService,
};
