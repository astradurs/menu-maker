import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser, getAuthUrl } from '@/app/auth';
import { CreateCourseForm } from '@/components/forms/create-course';
import { NextRequest } from 'next/server';

interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
}

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Example dashboard app built using the components.'
};

export default async function DashboardPage() {
	const { isAuthenticated, user: authUser } = await getUser();

	let dbUser = null;
	if (authUser !== null && authUser !== undefined) {
		const request = new NextRequest(`${process.env.API_URL}/user/${authUser.email}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const response = await fetch(request);
		const { user: reqUser } = await response.json();
		dbUser = reqUser;
		console.log('dbUser', dbUser);
	}

	if (!isAuthenticated) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	return (
		<div>
			<WelcomeHeading user={dbUser} />
			{dbUser !== null ? (
				<div>
					<CreateCourseForm userId={dbUser.uuid} />
				</div>
			) : (
				<div>
					<p className="text-5xl font-bold leading-tight tracking-tighter">
						We don't know who you are, but you're logged in!
					</p>
				</div>
			)}
		</div>
	);
}

function WelcomeHeading({ user }: { user: User | null }) {
	if (user === null) {
		return (
			<h1 className="text-5xl font-bold leading-tight tracking-tighter">
				We don't know who you are, but you're logged in!
			</h1>
		);
	}
	return (
		<h1 className="text-5xl font-bold leading-tight tracking-tighter">
			Welcome back, {user.firstName} {user.lastName}!
		</h1>
	);
}
