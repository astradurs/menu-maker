import { NextRequest, NextResponse } from 'next/server';
import { postCourse } from './create-course';
import { getUserById } from '../user/[email]/get-user';

export async function POST(request: NextRequest) {
	if (request === null) {
		return NextResponse.json(
			{
				error: 'No data'
			},
			{
				status: 404
			}
		);
	}
	const { course, userId } = await request.json();

	const user = await getUserById({ userId: userId });

	if (user === null) {
		return NextResponse.json(
			{
				error: 'No user'
			},
			{
				status: 404
			}
		);
	}

	if (course === null || userId === null) {
		return NextResponse.json(
			{
				error: 'No data'
			},
			{
				status: 404
			}
		);
	}

	const newCourse = await postCourse({ course, user });

	const response = NextResponse.json(newCourse, { status: 200 });

	return response;
}
