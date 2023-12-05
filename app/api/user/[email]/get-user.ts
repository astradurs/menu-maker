import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
}

export async function getUserRequest({ email }: { email: string }): Promise<User | null> {
	const request = new NextRequest(`${process.env.API_URL}/user/${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const response = await fetch(request);
	const { user } = await response.json();

	return user;
}

export async function getUser({ email }: { email: string }): Promise<User | null> {
	const prisma = new PrismaClient();

	const user = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (!user) {
		const publicUser = await prisma.user.findUnique({
			where: {
				email: 'guest@dev.menumaker.com'
			}
		});
		await prisma.$disconnect();
		if (!publicUser) {
			return null;
		}
		return publicUser;
	}

	await prisma.$disconnect();

	if (!user) {
		return null;
	}

	return user;
}
