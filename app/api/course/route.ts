import { NextRequest, NextResponse } from 'next/server';
import { postCourse } from './create-course';

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
	console.log('course', course);
	console.log('userId', userId);

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

	const responseData = await postCourse({ course, userId });

	const response = NextResponse.json({ course: responseData }, { status: 200 });

	console.log('response', response);
	return response;
}
