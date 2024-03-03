import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser, getAuthUrl } from '@/app/auth';
import { getUserRequest } from '../../api/user/[email]/get-user';
import { Menu } from '@/components/menu/menu';

export const metadata: Metadata = {
	title: 'Menu',
	description: 'The page where you build your menu!'
};

export default async function MenuPage({ params }: { params: { uuid: string } }) {
	const { isAuthenticated, user: authUser } = await getUser();

	if (!isAuthenticated || authUser === null || authUser === undefined) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const dbUser = await getUserRequest({ email: authUser.email });
	console.log('dbUser', dbUser);

	if (dbUser === null || dbUser === undefined) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const menuUuid = params.uuid;

	return (
		<main className="min-h-screen w-screen">
			<Menu menuUuid={menuUuid} />
		</main>
	);
}
