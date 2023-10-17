// Import PrismaClient or any database client you are using

import { Slot } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import prisma from '../../../utils/shared/helpers/prisma';

/* eslint-disable no-param-reassign */

//# Create Slot
const createSlot = async (slot: Slot): Promise<Slot | null> => {
  const lowerCaseSlot = slot.startTime.toLowerCase();
  const lowerCaseSlotEnd = slot.endTime.toLowerCase();

  const existingSlot = await prisma.slot.findFirst({
    where: {
      startTime: {
        equals: lowerCaseSlot,
        mode: 'insensitive',
      },
      endTime: {
        equals: lowerCaseSlotEnd,
        mode: 'insensitive',
      },
    },
  });

  if (existingSlot) {
    throw new HandleApiError(httpStatus.CONFLICT, 'Slot already exists !');
  }
  const createdUser = await prisma.slot.create({
    data: slot,
  });

  return createdUser;
};
//# update Slot
const updateSlot = async (id: string, slot: Slot): Promise<Slot | null> => {
  const updatedSlot = await prisma.slot.update({
    where: { id },
    data: slot,
  });

  return updatedSlot;
};
//# get all Slot
const getSlots = async (): Promise<Slot[] | null> => {
  const categories = await prisma.slot.findMany({});

  return categories;
};
//# get a Slot
const getSlot = async (id: string): Promise<Slot | null> => {
  const slot = await prisma.slot.findUnique({
    where: { id },
  });

  return slot;
};
//# delete a Slot
const deleteSlot = async (id: string): Promise<Slot | null> => {
  const deletedSlot = await prisma.slot.delete({
    where: { id },
  });

  return deletedSlot;
};

export const slotServices = {
  createSlot,
  updateSlot,
  getSlots,
  getSlot,
  deleteSlot,
};
