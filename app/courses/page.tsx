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
import { RedirectType, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import {
	listTeamCourses,
	listTeamCoursesRequest
} from '@/app/api/course/team/[id]/list-team-courses';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
	teamUuid: string | null;
	team: Team | null;
}

interface Team {
	uuid: string;
	name: string;
	id: string;
	domain?: string;
}

interface Course {
	uuid: string;
	title: string;
	description: string;
	authorId: string;
	author: User;
	allergens: any[];
	ingredients: any[];
	createdAt: Date;
	updatedAt: Date;
	published: boolean;
}

export default async function ListCoursesPage() {
	const { isAuthenticated, user: authUser } = await getUser();

	if (!isAuthenticated || authUser === null || authUser === undefined) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const dbUser = await getUserRequest({ email: authUser.email });

	if (dbUser === null || dbUser === undefined) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const courses = await listCoursesRequest();

	return (
		<div className="grid gap-2">
			<div>
				<div className="p-1">
					<Button asChild>
						<Link href="/courses/create">Create Course</Link>
					</Button>
				</div>
			</div>
			<ListCoursesTabs user={dbUser} />;
		</div>
	);
}

async function ListCoursesTabs({ user }: { user: User }) {
	const { team } = user;
	if (team === null || team === undefined) {
		return <ListUserCoursesTable user={user} />;
	}
	return (
		<Tabs defaultValue="user">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="user">User Courses</TabsTrigger>
				<TabsTrigger value="team">Team Courses</TabsTrigger>
			</TabsList>
			<TabsContent value="user">
				<ListUserCoursesTable user={user} />
			</TabsContent>
			<TabsContent value="team">
				<ListTeamCoursesTable team={team} />
			</TabsContent>
		</Tabs>
	);
}

async function ListTeamCoursesTable({ team }: { team: Team }) {
	const courses = await listTeamCoursesRequest({ teamId: team.id });

	return (
		<Table>
			<TableCaption>Course list for {team.name}</TableCaption>
			<TableHeader>
				<TableHeaderRow />
			</TableHeader>
			<TableBody>
				{courses.map((course: Course) => (
					<TableBodyRow key={course.uuid} course={course} />
				))}
			</TableBody>
			<TableFooter>
				<TableFooterRow courses={courses} />
			</TableFooter>
		</Table>
	);
}

async function ListUserCoursesTable({ user }: { user: User }) {
	const courses = await listCoursesRequest();

	return (
		<Table>
			<TableCaption>Course list for {user.firstName}</TableCaption>
			<TableHeader>
				<TableHeaderRow />
			</TableHeader>
			<TableBody>
				{courses.map((course: Course) => (
					<TableBodyRow key={course.uuid} course={course} />
				))}
			</TableBody>
			<TableFooter>
				<TableFooterRow courses={courses} />
			</TableFooter>
		</Table>
	);
}

async function TableHeaderRow() {
	return (
		<TableRow>
			<TableHead>Title</TableHead>
			<TableHead>Description</TableHead>
			<TableHead>Allergens</TableHead>
			<TableHead>Ingredients</TableHead>
		</TableRow>
	);
}

async function TableBodyRow({ course }: { course: Course }) {
	return (
		<TableRow>
			<TableCell>{course.title}</TableCell>
			<TableCell>{course.description}</TableCell>
			<TableCell>
				{course.allergens?.map((allergen) => (
					<span key={allergen.uuid}>{allergen.name}</span>
				))}
			</TableCell>
			<TableCell>
				{course.ingredients?.map((ingredient) => (
					<span key={ingredient.uuid}>{ingredient.name}</span>
				))}
			</TableCell>
		</TableRow>
	);
}

async function TableFooterRow({ courses }: { courses: Course[] }) {
	return (
		<TableRow>
			<TableCell colSpan={5}>Count: {courses.length}</TableCell>
		</TableRow>
	);
}
