-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "teamUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_teamUuid_fkey" FOREIGN KEY ("teamUuid") REFERENCES "Team"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
