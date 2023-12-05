import { getUserRequest } from '@/app/api/user/[email]/get-user';
import { listCoursesRequest } from '@/app/api/course/list-courses';
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
		dbUser = await getUserRequest({ email: authUser.email });
		console.log('dbUser', dbUser);
	}

	if (!isAuthenticated) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const courses = await listCoursesRequest();

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
