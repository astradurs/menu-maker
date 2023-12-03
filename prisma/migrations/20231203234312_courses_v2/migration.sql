/*
  Warnings:

  - You are about to alter the column `id` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "id" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Allergen" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" VARCHAR(30) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" TEXT,
    "source" TEXT,
    "ingredientUuid" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Allergen_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "id" VARCHAR(30) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "description" TEXT,
    "source" TEXT,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Language" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localeId" VARCHAR(8) NOT NULL,
    "name" VARCHAR(10) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "CourseTranslation" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "courseId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CourseTranslation_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_AllergenToIngredient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Allergen_id_key" ON "Allergen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Allergen_name_key" ON "Allergen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_id_key" ON "Ingredient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_localeId_key" ON "Language"("localeId");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AllergenToIngredient_AB_unique" ON "_AllergenToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergenToIngredient_B_index" ON "_AllergenToIngredient"("B");

-- AddForeignKey
ALTER TABLE "CourseTranslation" ADD CONSTRAINT "CourseTranslation_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTranslation" ADD CONSTRAINT "CourseTranslation_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTranslation" ADD CONSTRAINT "CourseTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergenToIngredient" ADD CONSTRAINT "_AllergenToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergen"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergenToIngredient" ADD CONSTRAINT "_AllergenToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
