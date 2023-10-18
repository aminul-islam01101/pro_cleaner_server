// Import PrismaClient or any database client you are using

import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import prisma from '../../../utils/shared/helpers/prisma';
import { serviceServices } from '../services/service.services';
import { slotServices } from '../slots/slot.services';

/* eslint-disable no-param-reassign */

//# Create Booking
const createBooking = async (booking: Booking): Promise<Booking | null> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: booking.userId,
    },
  });
  if (!isUserExist) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'User not found !');
  }
  const existingService = await serviceServices.getService(booking.serviceId);

  if (!existingService) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }
  const existingSlot = await slotServices.getSlot(booking.slotId);

  if (!existingSlot) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Slot not found !');
  }

  const createdBooking = await prisma.booking.create({
    data: booking,
  });

  return createdBooking;
};
//# update Booking
const updateBooking = async (id: string, payload: Partial<Booking>): Promise<Booking | null> => {
  if (payload.serviceId) {
    const existingService = await serviceServices.getService(payload.serviceId);

    if (!existingService) {
      throw new HandleApiError(httpStatus.NOT_FOUND, 'Service not found !');
    }
  }
  if (payload.slotId) {
    const existingSlot = await slotServices.getSlot(payload.slotId);

    if (!existingSlot) {
      throw new HandleApiError(httpStatus.NOT_FOUND, 'Slot not found !');
    }
  }
  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: payload,
  });

  return updatedBooking;
};
//# get all Booking
const getBookings = async (id: string, role: string, email: string): Promise<Booking[] | null> => {
  const Bookings = await prisma.booking.findMany({});

  return Bookings;
};
//# get a Booking
const getBooking = async (id: string): Promise<Booking | null> => {
  const booking = await prisma.booking.findUnique({
    where: { id },
  });

  return booking;
};
//# delete a Booking
const deleteBooking = async (id: string): Promise<Booking | null> => {
  const deletedBooking = await prisma.booking.delete({
    where: { id },
  });

  return deletedBooking;
};

export const bookingServices = {
  createBooking,
  updateBooking,
  getBookings,
  getBooking,
  deleteBooking,
};
