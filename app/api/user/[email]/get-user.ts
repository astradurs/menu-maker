import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

export interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
	teamUuid: string | null;
	team: Team | null;
}

export interface Team {
	uuid: string;
	id: string;
	name: string;
}

export async function getUserRequest({ email }: { email: string }): Promise<User | null> {
	const request = new NextRequest(`${process.env.API_URL}/user/${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const response = await fetch(request, {
		next: {
			tags: ['get-user']
		}
	});
	console.log('REPONSE', response);
	console.log('===========');
	const { status } = response;
	if (status === 404) {
		console.log('404 😓');
	}
	console.log('STATUS', status);
	const { user } = await response.json();
	// console.log('USER', user);
	return user;
}

export async function getUserById({ userId }: { userId: string }): Promise<User | null> {
	const prisma = new PrismaClient();

	const user = await prisma.user.findUnique({
		where: {
			uuid: userId
		},
		include: {
			team: true
		}
	});

	await prisma.$disconnect();

	if (!user) {
		return null;
	}

	return user;
}

export async function getUser({ email }: { email: string }): Promise<User | null> {
	const prisma = new PrismaClient();

	const user = await prisma.user.findUnique({
		where: {
			email
		},
		include: {
			team: true
		}
	});

	console.log('USER IN GET USER', user);

	if (!user) {
		const publicUser = await prisma.user.findUnique({
			where: {
				email: 'guest@dev.menumaker.com'
			},
			include: {
				team: {
					select: {
						uuid: true,
						id: true,
						name: true
					}
				}
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
