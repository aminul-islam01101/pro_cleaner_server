/*
  Warnings:

  - You are about to alter the column `rating` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,1)`.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DATA TYPE DECIMAL(5,1);
