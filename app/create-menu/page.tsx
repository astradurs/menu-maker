'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser, getAuthUrl } from '@/app/auth';
import { Switch } from '@/components/ui/switch';
// import { DragNDrop } from '@/components/menu/dragndrop';
import { Dropdown } from '@/components/menu/dropdowns';
import { DragDropContext } from 'react-beautiful-dnd';

export const metadata: Metadata = {
	title: 'Menu',
	description: 'The page where you build your menu!'
};

export default function MenuPage() {
	// const { isAuthenticated, user: authUser } = await getUser();

	// if (!isAuthenticated) {
	// 	const authKitUrl = getAuthUrl();

	// 	return redirect(authKitUrl);
	// }

	return (
		<main className="min-h-screen w-screen">
			<div>
				{/* <DragNDrop /> */}
				<Dropdown />
			</div>
		</main>
	);
}
