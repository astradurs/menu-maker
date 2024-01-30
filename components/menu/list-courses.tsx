import { ListCoursesTabs, User } from '@/app/courses/page';

export function ListCourses({ user }: { user: User }) {
	return (
		<div>
			<ListCoursesTabs user={user} />
		</div>
	);
}
