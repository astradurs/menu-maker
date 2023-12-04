import { PrismaClient } from '@prisma/client';

export interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
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
