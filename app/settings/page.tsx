import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
	description: 'Settings page'
};

export default function SettingsPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
				<h1 className="text-6xl font-bold">Settings</h1>
			</main>
		</div>
	);
}
