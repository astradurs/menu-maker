import { NextRequest, NextResponse } from 'next/server';
import { listTeamCourses } from './list-team-courses';
import { useParams } from 'next/navigation';

export async function GET(
	request: NextRequest,
	context: {
		params: {
			id: string;
		};
	}
) {
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

	const courses = await listTeamCourses({ teamId: context.params.id });

	const response = NextResponse.json(courses, { status: 200 });

	return response;
}
