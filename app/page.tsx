import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Faq } from '@/components/landing/faq';

export default async function Home() {
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
					<div className="col-span-4 col-start-2 mt-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] mb-4">
							How It Works
						</h2>
						<ol className="list-decimal list-inside text-gray-500 dark:text-gray-400 space-y-4">
							<li>
								<strong className="text-black dark:text-white">
									Adding Courses:
								</strong>
								&nbsp; Start by adding the dishes you want to offer in your menu.
							</li>
							<li>
								<strong className="text-black dark:text-white">
									Editing Courses:
								</strong>
								&nbsp; After adding, you can edit the courses anytime to make
								changes.
							</li>
							<li>
								<strong className="text-black dark:text-white">
									Building Menu:
								</strong>
								&nbsp; Once you're satisfied with the courses, arrange them to build
								a menu.
							</li>
							<li>
								<strong className="text-black dark:text-white">
									Exporting Menu:
								</strong>
								&nbsp; Finally, export your menu for easy sharing and printing.
							</li>
						</ol>
						<div className="mt-4">
							<Button variant="default">Get Started</Button>
						</div>
					</div>
					<Separator className="col-span-2 col-start-2 my-4" />
					<div className="col-span-2 col-start-2">
						<Faq />
					</div>
				</div>
			</main>
		</>
	);
}
