import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser, getAuthUrl } from '@/app/auth';
import { Menu } from '@/components/menu/menu';
import { ListCourses } from '@/components/menu/list-courses';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { getUserRequest } from '../api/user/[email]/get-user';

export const metadata: Metadata = {
	title: 'Menu',
	description: 'The page where you build your menu!'
};

export default async function MenuPage() {
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

	return (
		<main className="min-h-screen w-screen">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel defaultSize={75} className="border rounded-lg">
					<Menu />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={25} className="border rounded-lg min-w-10">
					<div className="p-4">
						<h3 className="text-2xl font-light">Courses</h3>
						<ListCourses user={dbUser} />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
