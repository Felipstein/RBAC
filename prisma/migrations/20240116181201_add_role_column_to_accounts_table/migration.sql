/*
  Warnings:

  - Added the required column `role` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "role" "role" NOT NULL;
