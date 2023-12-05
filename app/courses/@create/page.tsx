import { getUser, getAuthUrl } from '@/app/auth';
import { redirect } from 'next/navigation';
import { CreateCourseForm } from '@/components/forms/create-course';
import { getUserRequest } from '@/app/api/user/[email]/get-user';

interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
}

export default async function CreateCoursePage() {
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

	return (
		<div>
			<WelcomeHeading user={dbUser} />
			{dbUser !== null && dbUser !== undefined ? (
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
	if (user === null || user === undefined) {
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
