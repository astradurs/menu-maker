import { NextRequest, NextResponse } from 'next/server';
import { postCourse } from './create-course';
import { listCourses } from './list-courses';

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

	const newCourse = await postCourse({ course, userId });

	const response = NextResponse.json(newCourse, { status: 200 });

	return response;
}

export async function GET(request: NextRequest) {
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

	const courses = await listCourses();

	const response = NextResponse.json(courses, { status: 200 });

	return response;
}
