import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function listIngredientsRequest() {
	const f = 'listIngredientsRequest';

	const request = new NextRequest(`${process.env.API_URL}/ingredient`, {
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
		const ingredients = await response.json();

		return ingredients;
	} catch (error) {
		console.error(f, error);
		return [];
	}
}

export async function listIngredients() {
	const f = 'listIngredients';
	try {
		const prisma = new PrismaClient();
		const ingredients = await prisma.ingredient.findMany({
			include: {
				allergens: true
			}
		});
		await prisma.$disconnect();
		if (!ingredients) {
			return [];
		}
		return ingredients;
	} catch (error) {
		console.error(f, error);
		return [];
	}
}
