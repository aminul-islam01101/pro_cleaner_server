// Import PrismaClient or any database client you are using

import { Service } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import prisma from '../../../utils/shared/helpers/prisma';
import { categoryServices } from '../categories/category.services';

/* eslint-disable no-param-reassign */

//# Create Service
const createService = async (service: Service): Promise<Service | null> => {
  const existingCategory = await categoryServices.getCategory(service.categoryId);

  if (!existingCategory) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'category not found !');
  }
  const lowerCaseService = service.name.toLowerCase();

  const existingService = await prisma.service.findFirst({
    where: {
      name: {
        equals: lowerCaseService,
        mode: 'insensitive',
      },
      categoryId: service.categoryId,
    },
  });

  if (existingService) {
    throw new HandleApiError(httpStatus.CONFLICT, 'service already exists !');
  }
  const createdService = await prisma.service.create({
    data: service,
  });

  return createdService;
};
//# update Service
const updateService = async (id: string, payload: Partial<Service>): Promise<Service | null> => {
  if (payload.categoryId) {
    const existingCategory = await categoryServices.getCategory(payload.categoryId);

    if (!existingCategory) {
      throw new HandleApiError(httpStatus.NOT_FOUND, 'category not found !');
    }
  }
  const updatedService = await prisma.service.update({
    where: { id },
    data: payload,
  });

  return updatedService;
};
//# get all Service
const getServices = async (): Promise<Service[] | null> => {
  const services = await prisma.service.findMany({
    include: {
      bookings: true,
    },
  });

  return services;
};
//# get a Service
const getService = async (id: string): Promise<Service | null> => {
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      bookings: true,
    },
  });

  return service;
};
//# delete a Service
const deleteService = async (id: string): Promise<Service | null> => {
  const deletedService = await prisma.service.delete({
    where: { id },
  });

  return deletedService;
};

export const serviceServices = {
  createService,
  updateService,
  getServices,
  getService,
  deleteService,
};
