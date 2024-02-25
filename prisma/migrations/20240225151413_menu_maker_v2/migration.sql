/*
  Warnings:

  - You are about to drop the `Allergen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AllergenToCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AllergenToIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teamUuid_fkey";

-- DropForeignKey
ALTER TABLE "CourseTranslation" DROP CONSTRAINT "CourseTranslation_authorId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTranslation" DROP CONSTRAINT "CourseTranslation_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTranslation" DROP CONSTRAINT "CourseTranslation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTranslation" DROP CONSTRAINT "CourseTranslation_teamUuid_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_teamUuid_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamUuid_fkey";

-- DropForeignKey
ALTER TABLE "_AllergenToCourse" DROP CONSTRAINT "_AllergenToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_AllergenToCourse" DROP CONSTRAINT "_AllergenToCourse_B_fkey";

-- DropForeignKey
ALTER TABLE "_AllergenToIngredient" DROP CONSTRAINT "_AllergenToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_AllergenToIngredient" DROP CONSTRAINT "_AllergenToIngredient_B_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToIngredient" DROP CONSTRAINT "_CourseToIngredient_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToIngredient" DROP CONSTRAINT "_CourseToIngredient_B_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToUser" DROP CONSTRAINT "_RoleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToUser" DROP CONSTRAINT "_RoleToUser_B_fkey";

-- DropTable
DROP TABLE "Allergen";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "CourseTranslation";

-- DropTable
DROP TABLE "Ingredient";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "_AllergenToCourse";

-- DropTable
DROP TABLE "_AllergenToIngredient";

-- DropTable
DROP TABLE "_CourseToIngredient";

-- DropTable
DROP TABLE "_RoleToUser";
