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
	console.log(f, request);
	try {
		const response = await fetch(request);
		console.log(f, response);

		const ingredients = await response.json();
		console.log(f, ingredients);

		return ingredients;
	} catch (error) {
		console.log(f, error);
		return [];
	}
}

export async function listIngredients() {
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
		console.log('listIngredients error', error);
		return [];
	}
}
