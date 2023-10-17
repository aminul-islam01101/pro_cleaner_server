/*
  Warnings:

  - You are about to drop the column `adminRoles` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AdminPermission" AS ENUM ('all', 'content_manager', 'user_manager', 'service_manager');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "adminRoles",
ADD COLUMN     "AdminPermission" "AdminPermission"[] DEFAULT ARRAY[]::"AdminPermission"[];

-- DropEnum
DROP TYPE "AdminRole";
