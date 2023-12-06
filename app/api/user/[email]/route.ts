import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './get-user';

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
	const { email } = params;
	if (email === null) {
		return NextResponse.json(
			{
				error: 'No data'
			},
			{
				status: 404
			}
		);
	}

	const user = await getUser({ email: email });

	if (!user) {
		return NextResponse.json(
			{
				error: 'No user'
			},
			{
				status: 404
			}
		);
	}

	const response = NextResponse.json({ user });

	return response;
}
