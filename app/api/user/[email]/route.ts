import { NextRequest, NextResponse } from 'next/server';
import { getUser } from './get-user';

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
	const { email } = params;
	console.log('email', email);
	try {
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

		const user = await getUser({ email: email as string });

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

		console.log('response', response);
		return response;
	} catch (error) {
		console.log('error', error);
		return NextResponse.json(
			{
				error: 'Error'
			},
			{
				status: 500
			}
		);
	}
}
