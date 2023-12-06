import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function listAllergensRequest() {
	const f = 'listAllergensRequest';
	const request = new NextRequest(`${process.env.API_URL}/allergen`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	try {
		const response = await fetch(request, {
			next: {
				tags: ['get-courses']
			}
		});

		const allergens = await response.json();

		return allergens;
	} catch (error) {
		console.error(f, error);
		return [];
	}
}

export async function listAllergens() {
	const f = 'listAllergens';
	try {
		const prisma = new PrismaClient();
		const allergens = await prisma.allergen.findMany({
			include: {
				ingredients: true
			}
		});
		await prisma.$disconnect();
		if (!allergens) {
			return [];
		}
		return allergens;
	} catch (error) {
		console.error(f, error);
		return [];
	}
}
