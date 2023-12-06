import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function listLanguagesRequest() {
	const f = 'listAllergensRequest';
	const request = new NextRequest(`${process.env.API_URL}/language`, {
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

		const languages = await response.json();

		return languages;
	} catch (error) {
		console.error(f, error);
		return [];
	}
}

export async function listLanguages() {
	const f = 'listLanguages';
	try {
		const prisma = new PrismaClient();
		const languages = await prisma.language.findMany();
		await prisma.$disconnect();
		if (!languages) {
			return [];
		}
		return languages;
	} catch (error) {
		console.error(f, error);
		return [];
	}
}
