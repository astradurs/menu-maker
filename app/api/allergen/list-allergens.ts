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
	console.log(f, request);
	try {
		const response = await fetch(request);
		console.log(f, response);

		const allergens = await response.json();
		console.log(f, allergens);

		return allergens;
	} catch (error) {
		console.log(f, error);
		return [];
	}
}

export async function listAllergens() {
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
		console.log('listAllergens error', error);
		return [];
	}
}
