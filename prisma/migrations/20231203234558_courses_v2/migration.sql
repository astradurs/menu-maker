-- CreateTable
CREATE TABLE "_AllergenToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToIngredient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AllergenToCourse_AB_unique" ON "_AllergenToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergenToCourse_B_index" ON "_AllergenToCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToIngredient_AB_unique" ON "_CourseToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToIngredient_B_index" ON "_CourseToIngredient"("B");

-- AddForeignKey
ALTER TABLE "_AllergenToCourse" ADD CONSTRAINT "_AllergenToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergen"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AllergenToCourse" ADD CONSTRAINT "_AllergenToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToIngredient" ADD CONSTRAINT "_CourseToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToIngredient" ADD CONSTRAINT "_CourseToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
