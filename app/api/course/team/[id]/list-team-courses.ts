import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';

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

export async function listTeamCoursesRequest({ teamId }: { teamId: string }) {
	const request = new NextRequest(`${process.env.API_URL}/course/team/${teamId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const response = await fetch(request, {
		next: {
			tags: ['get-courses']
		}
	});
	const courses = await response.json();

	return courses;
}

export async function listTeamCourses(params?: { teamId: string }) {
	const f = 'listCourses';
	try {
		const prisma = new PrismaClient();

		let courses;
		if (params === undefined) {
			courses = await prisma.course.findMany({
				include: {
					ingredients: true,
					allergens: true
				}
			});
		} else {
			const team = await prisma.team.findUnique({
				where: {
					id: params.teamId
				},
				include: {
					users: true
				}
			});

			courses = await prisma.course.findMany({
				where: {
					teamUuid: team?.uuid
				},
				include: {
					ingredients: true,
					allergens: true
				}
			});
		}

		await prisma.$disconnect();

		return courses;
	} catch (error) {
		console.error(f, error);
		return [];
	}
}
