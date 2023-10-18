// Import PrismaClient or any database client you are using

import { Review } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import prisma from '../../../utils/shared/helpers/prisma';
import { serviceServices } from '../services/service.services';

/* eslint-disable no-param-reassign */

//# Create Review
const createReview = async (
  review: Review,
  serviceId: string,
  userId: string
): Promise<Review | null> => {
  const existingService = await prisma.service.findFirst({
    where: { id: serviceId },
    include: {
      bookings: true,
    },
  });
  console.log('🌼 🔥🔥 file: review.services.ts:23 🔥🔥 existingService🌼', existingService);

  if (!existingService) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }
  const serviceBooked = existingService.bookings.find(
    (booking) => booking.userId === userId && booking.status === 'completed'
  );
  if (!serviceBooked) {
    throw new HandleApiError(httpStatus.BAD_REQUEST, 'You did not use service !');
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      serviceId,
      userId,
    },
  });

  if (existingReview) {
    throw new HandleApiError(httpStatus.CONFLICT, 'Review already exist !');
  }

  const createdReview = await prisma.review.create({
    data: { ...review, userId, serviceId },
  });

  return createdReview;
};
//# update Review
const updateReview = async (id: string, payload: Partial<Review>): Promise<Review | null> => {
  const { serviceId, ...rest } = payload;
  const existingService = await serviceServices.getService(serviceId as string);

  if (!existingService) {
    throw new HandleApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: rest,
  });

  return updatedReview;
};

// //# get a Review
// const getReview = async (id: string): Promise<Review | null> => {
//   const Review = await prisma.Review.findUnique({
//     where: { id },
//   });

//   return Review;
// };
//# delete a Review
const deleteReview = async (id: string): Promise<Review | null> => {
  const deletedReview = await prisma.review.delete({
    where: { id },
  });

  return deletedReview;
};

export const reviewServices = {
  createReview,
  updateReview,
  // getReviews,
  // getReview,
  deleteReview,
};
