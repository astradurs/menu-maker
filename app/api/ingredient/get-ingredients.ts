import { PrismaClient } from '@prisma/client';
export async function getIngredients() {
	const prisma = new PrismaClient();
	const ingredient = await prisma.ingredient.findMany();
	await prisma.$disconnect();
	if (!ingredient) {
		return null;
	}
	return ingredient;
}
