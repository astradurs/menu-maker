import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser, getAuthUrl } from '@/app/auth';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Example dashboard app built using the components.'
};

export default async function DashboardPage() {
	const { isAuthenticated } = await getUser();

	if (!isAuthenticated) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	return <div>LoggedIn!</div>;
}
