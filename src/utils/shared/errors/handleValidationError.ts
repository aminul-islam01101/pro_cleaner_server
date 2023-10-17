import { Prisma } from '@prisma/client';
import { TGenericErrorResponse } from '../types/errorTypes';

const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): TGenericErrorResponse => {
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    errorName: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
