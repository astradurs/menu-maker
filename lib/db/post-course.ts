import { PrismaClient } from '@prisma/client'

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

export async function postCourse({
	course,
	userId
}: {
	course: { title: string; description: string };
	userId: string;
}) {
	const prisma = new PrismaClient();

	const newCourse = await prisma.course.create({
		data: {
			title: course.title,
			description: course.description,
			authorId: userId
		}
	});

	await prisma.$disconnect();

	return newCourse;
}
