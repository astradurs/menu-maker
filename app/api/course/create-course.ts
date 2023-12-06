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

export async function postCourseRequest({
	course,
	userId
}: {
	course: { title: string; description: string };
	userId: string;
}) {
	const url = `${process.env.API_URL}/course`;
	const request = new NextRequest(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			course,
			userId
		})
	});

	const response = await fetch(request);
	const newCourse = await response.json();

	return newCourse;
}

export async function postCourse({
	course,
	user
}: {
	course: { title: string; description: string; allergens: string[]; ingredients: string[] };
	user: User;
}) {
	const prisma = new PrismaClient();

	const allergens = await prisma.allergen.findMany({
		where: {
			uuid: {
				in: course.allergens
			}
		}
	});

	const ingredients = await prisma.ingredient.findMany({
		where: {
			uuid: {
				in: course.ingredients
			}
		}
	});

	const newCourse = await prisma.course.create({
		data: {
			title: course.title,
			description: course.description,
			allergens: {
				connect: allergens
			},
			ingredients: {
				connect: ingredients
			},
			authorId: user.uuid,
			teamUuid: user.teamUuid
		},
		include: {
			allergens: true,
			ingredients: true
		}
	});

	await prisma.$disconnect();

	return newCourse;
}
