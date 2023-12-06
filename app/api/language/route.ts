import { NextRequest, NextResponse } from 'next/server';
import { listLanguages } from './list-languages';

export async function GET(request: NextRequest) {
	const languages = await listLanguages();

	if (!languages) {
		return NextResponse.json(
			{
				error: 'No languages'
			},
			{
				status: 404
			}
		);
	}

	const response = NextResponse.json(languages, { status: 200 });

	return response;
}
