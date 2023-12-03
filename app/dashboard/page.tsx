import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser, getAuthUrl } from '@/app/auth';
import { getUser as getDBUser } from '@/lib/db/get-user';
import { CreateCourseForm } from '@/components/forms/create-course';

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
	const { isAuthenticated, user } = await getUser();

	let dbUser = null;
	if (user !== null && user !== undefined) {
		dbUser = await getDBUser({ email: user.email });
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
