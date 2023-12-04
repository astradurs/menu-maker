import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/nav/main-nav';
import { UserNav } from '@/components/nav/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { getUser, getAuthUrl } from '@/app/auth';

export async function SharedNav() {
	const { isAuthenticated, user } = await getUser();
	const authKitUrl = getAuthUrl();

	console.log('User', user);

	return (
		<div className="border-b">
			<div className="flex h-16 items-center px-4">
				{isAuthenticated && user ? (
					<div>Menu-maker</div>
				) : (
					<Link href={authKitUrl}>
						<Button>Log In</Button>
					</Link>
				)}
				<MainNav className="mx-6" />
				<div className="ml-auto flex items-center space-x-4">
					{isAuthenticated && user ? <UserNav user={user} /> : <ThemeToggle />}
				</div>
			</div>
		</div>
	);
}
