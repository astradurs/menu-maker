/*
  Warnings:

  - You are about to alter the column `languageId` on the `CourseTranslation` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.

*/
-- DropForeignKey
ALTER TABLE "CourseTranslation" DROP CONSTRAINT "CourseTranslation_languageId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "teamUuid" TEXT;

-- AlterTable
ALTER TABLE "CourseTranslation" ADD COLUMN     "teamUuid" TEXT,
ALTER COLUMN "languageId" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamUuid" TEXT;

-- CreateTable
CREATE TABLE "Team" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" VARCHAR(50) NOT NULL,
    "domain" VARCHAR(50),
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_domain_key" ON "Team"("domain");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamUuid_fkey" FOREIGN KEY ("teamUuid") REFERENCES "Team"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTranslation" ADD CONSTRAINT "CourseTranslation_teamUuid_fkey" FOREIGN KEY ("teamUuid") REFERENCES "Team"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTranslation" ADD CONSTRAINT "CourseTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teamUuid_fkey" FOREIGN KEY ("teamUuid") REFERENCES "Team"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
