/*
  Warnings:

  - You are about to drop the column `contactNo` on the `users` table. All the data in the column will be lost.
  - Added the required column `contactNo` to the `user_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "contactNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "contactNo";
