import { NextRequest, NextResponse } from 'next/server';
import { getAllergens } from './get-allergens';

export async function GET(request: NextRequest) {
	const allergens = await getAllergens();

	if (!allergens) {
		return NextResponse.json(
			{
				error: 'No allergens'
			},
			{
				status: 404
			}
		);
	}

	const response = NextResponse.json({ allergens });

	console.log('response', response);
	return response;
}
