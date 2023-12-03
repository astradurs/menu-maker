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

	await prisma.$disconnect();

	if (!user) {
		return null;
	}

	return user;
}
