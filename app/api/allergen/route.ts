import { NextRequest, NextResponse } from 'next/server';
import { listAllergens } from './list-allergens';

export async function GET(request: NextRequest) {
	const allergens = await listAllergens();

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

	const response = NextResponse.json(allergens, { status: 200 });

	console.log('allergens get response', response);
	return response;
}
