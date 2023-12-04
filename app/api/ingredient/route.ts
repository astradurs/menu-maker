import { NextRequest, NextResponse } from 'next/server';
import { getIngredients } from './get-ingredients';

export async function GET(request: NextRequest) {
	const ingredients = await getIngredients();

	if (!ingredients) {
		return NextResponse.json(
			{
				error: 'No ingredients'
			},
			{
				status: 404
			}
		);
	}

	const response = NextResponse.json({ ingredients });

	console.log('response', response);
	return response;
}
