import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
	return <div className="grid gap-2 mx-auto mt-4 max-w-7xl">{children}</div>;
}
