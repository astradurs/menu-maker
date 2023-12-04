import { getUser, getAuthUrl } from '@/app/auth';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

interface User {
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

export default async function ListCoursesPage() {
	const { isAuthenticated, user: authUser } = await getUser();

	let dbUser = null;
	if (authUser !== null && authUser !== undefined) {
		const request = new NextRequest(`${process.env.API_URL}/user/${authUser.email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const response = await fetch(request, { next: { tags: ['courses'] } });
		const { user: reqUser } = await response.json();
		dbUser = reqUser;
		console.log('dbUser', dbUser);
	}

	if (!isAuthenticated) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const url = `${process.env.API_URL}/course`;
	console.log('url', url);
	const request = new NextRequest(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const response = await fetch(request);
	const { courses } = await response.json();

	return (
		<div>
			<h1>List of courses</h1>
			<Table>
				<TableCaption>Course list</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{courses.map((course: Course) => (
						<TableRow key={course.uuid}>
							<TableCell>{course.title}</TableCell>
							<TableCell>{course.description}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={2}>Count: {courses.length}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
