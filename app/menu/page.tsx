'use client';

import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUser, getAuthUrl } from '@/app/auth';
import { getUserRequest } from '../api/user/[email]/get-user';
import { getMenus } from '../api/menu/get-menus';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';

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

	const menus = await getMenus();
	console.log('Menus', menus);

	const newMenuUuid = crypto.randomUUID();

	// return redirect(`/menu/${newMenuUuid}`);
	return (
		<main className="p-2">
			<div className="flex items-center justify-between mb-3">
				<h1 className="text-xl">Menu Page!</h1>
				<Button>Create menu!</Button>
			</div>
			<Separator />
			<div className="p-1">
				{!menus && <p>No menus found!</p>}
				{menus?.map((menu) => {
					return (
						<div
							key={menu.uuid}
							className="p-2 m-1 border border-gray-300 rounded-md hover:bg-gray-800/20 cursor-pointer transition-all duration-200 ease-in-out"
						>
							<Link href={`/menu/${menu.uuid}`}>
								<div className="grid grid-cols-3">
									<h2 className="text-lg font-semibold">{menu.uuid}</h2>
									<div className="flex items-center">
										<p>Created by:</p>
										&nbsp;
										<p>{menu.firstName}</p>
									</div>
									<div className="flex items-center">
										<p>Created at:</p>
										&nbsp;
										<p>{formatDate(menu.createdAt)}</p>
									</div>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</main>
	);
}
