// Import PrismaClient or any database client you are using

import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import { HandleApiError } from '../../../utils/shared/errors/handleApiError';
import prisma from '../../../utils/shared/helpers/prisma';

/* eslint-disable no-param-reassign */

//# Create category
const createCategory = async (category: Category): Promise<Category | null> => {
  const lowerCaseCategory = category.title.toLowerCase();
  const hyphenated = lowerCaseCategory.includes(' ')
    ? lowerCaseCategory.replace(' ', '-')
    : lowerCaseCategory;

  const existingCategory = await prisma.category.findFirst({
    where: {
      title: {
        equals: hyphenated,
        mode: 'insensitive',
      },
    },
  });

  if (existingCategory) {
    throw new HandleApiError(httpStatus.CONFLICT, 'category already exists !');
  }
  const createdUser = await prisma.category.create({
    data: category,
  });

  return createdUser;
};
//# update category
const updateCategory = async (id: string, category: Category): Promise<Category | null> => {
  const updatedCategory = await prisma.category.update({
    where: { id },
    data: category,
  });

  return updatedCategory;
};
//# get all category
const getCategories = async (): Promise<Category[] | null> => {
  const categories = await prisma.category.findMany({
    include: {
      services: true,
    },
  });

  return categories;
};
//# get a category
const getCategory = async (id: string): Promise<Category | null> => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });

  return category;
};
//# delete a category
const deleteCategory = async (id: string): Promise<Category | null> => {
  const deletedCategory = await prisma.category.delete({
    where: { id },
  });

  return deletedCategory;
};

export const categoryServices = {
  createCategory,
  updateCategory,
  getCategories,
  getCategory,
  deleteCategory,
};
