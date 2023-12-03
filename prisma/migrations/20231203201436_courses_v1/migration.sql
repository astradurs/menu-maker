/*
  Warnings:

  - You are about to drop the `TrainingPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TrainingPostToTrainingTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainingPost" DROP CONSTRAINT "TrainingPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingProfile" DROP CONSTRAINT "TrainingProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingPostToTrainingTag" DROP CONSTRAINT "_TrainingPostToTrainingTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_TrainingPostToTrainingTag" DROP CONSTRAINT "_TrainingPostToTrainingTag_B_fkey";

-- DropTable
DROP TABLE "TrainingPost";

-- DropTable
DROP TABLE "TrainingProfile";

-- DropTable
DROP TABLE "TrainingTag";

-- DropTable
DROP TABLE "TrainingUser";

-- DropTable
DROP TABLE "_TrainingPostToTrainingTag";
