import { Prisma } from '@prisma/client';
import { TGenericErrorMessage } from '../types/errorTypes';

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: TGenericErrorMessage[] = [];
  let errorName = '';
  const statusCode = 400;

  if (error.code === 'P2025') {
    errorName = (error.meta?.cause as string) || 'Record not found!';
    errors = [
      {
        path: '',
        message: errorName,
      },
    ];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      errorName = 'Delete failed';
      errors = [
        {
          path: '',
          message: errorName,
        },
      ];
    }
  }

  return {
    statusCode,
    errorName,
    errorMessages: errors,
  };
};

export default handleClientError;
