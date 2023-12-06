import { getUser, getAuthUrl } from '@/app/auth';
import { redirect } from 'next/navigation';
import { CreateCourseForm } from '@/components/forms/create-course/create-course';
import { getUserRequest } from '@/app/api/user/[email]/get-user';
import { listIngredientsRequest } from '@/app/api/ingredient/list-ingredients';
import { listAllergensRequest } from '@/app/api/allergen/list-allergens';
import { Separator } from '@/components/ui/separator';
import { listLanguagesRequest } from '@/app/api/language/list-languages';

interface User {
	uuid: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
}

export default async function CreateCoursePage() {
	const { isAuthenticated, user: authUser } = await getUser();

	if (!isAuthenticated || authUser === null || authUser === undefined) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const dbUser = await getUserRequest({ email: authUser.email });

	if (dbUser === null || dbUser === undefined) {
		const authKitUrl = getAuthUrl();

		return redirect(authKitUrl);
	}

	const ingredients = await listIngredientsRequest();
	const allergens = await listAllergensRequest();
	const languages = await listLanguagesRequest();
	return (
		<div className="grid gap-2">
			<div>
				<div className="p-1">
					<CourseFormHeading />
				</div>
			</div>
			<Separator />
			<div>
				<div className="p-1">
					<CreateCourseForm
						userId={dbUser.uuid}
						ingredients={ingredients}
						allergens={allergens}
						languages={languages}
					/>
				</div>
			</div>
		</div>
	);
}

function CourseFormHeading() {
	return (
		<h1 className="text-xl font-bold leading-tight tracking-tighter">Create a new course</h1>
	);
}
