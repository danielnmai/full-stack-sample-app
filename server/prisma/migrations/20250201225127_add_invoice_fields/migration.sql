/*
  Warnings:

  - Added the required column `description` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;
