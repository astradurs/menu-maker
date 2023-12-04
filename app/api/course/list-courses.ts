import { PrismaClient } from '@prisma/client';

export interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
}

interface Course {
	uuid: string;
	title: string;
	description: string;
	authorId: string;
	author: User;
	createdAt: Date;
	updatedAt: Date;
	published: boolean;
}

export async function listCourses(params?: { userId: string }) {
	const prisma = new PrismaClient();

	let courses;
	if (params === undefined) {
		courses = await prisma.course.findMany();
	} else {
		const userId = params.userId;
		courses = await prisma.course.findMany({
			where: {
				authorId: userId
			}
		});
	}

	await prisma.$disconnect();

	return courses;
}
