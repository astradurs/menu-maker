import Link from 'next/link';
import Image from 'next/image';
import { getUser } from './auth';
import { Button } from '@/components/ui/button';

export default async function Home() {
	const { isAuthenticated } = await getUser();

	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-between p-4">
				<div className="grid grid-cols-4 gap-4 px-4">
					<div className="col-span-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
							Learn to Build Amazing Menus
						</h2>
						<p className="text-2xl font-light">
							Make your own menu with your own menu items.
						</p>
						<p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
							Our food course management platform helps you to improve your culinary
							skills.
						</p>
						<ul className="list-disc list-inside text-gray-500 dark:text-gray-400 space-y-2">
							<li>Interactive courses</li>
							<li>Expert mentors</li>
							<li>Real-time feedback</li>
						</ul>
						<Button className="mt-8" variant="default">
							Get Started
						</Button>
					</div>
					<div className="col-span-2 col-start-3">
						<Image
							className="aspect-content overflow-hidden rounded-xl object-cover"
							src="/images/landing-image.webp"
							alt="Logo"
							width={800}
							height={1200}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
