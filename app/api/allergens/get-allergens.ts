import { PrismaClient } from '@prisma/client';
export async function getAllergens() {
	const prisma = new PrismaClient();
	const allergens = await prisma.allergen.findMany();
	await prisma.$disconnect();
	if (!allergens) {
		return null;
	}
	return allergens;
}
