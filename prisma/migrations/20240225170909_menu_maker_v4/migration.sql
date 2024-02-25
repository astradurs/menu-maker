/*
  Warnings:

  - Added the required column `weekdayNumber` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "weekdayNumber" INTEGER NOT NULL;
