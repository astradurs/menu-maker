import { NextRequest, NextResponse } from 'next/server';
import { listIngredients } from './list-ingredients';

export async function GET(request: NextRequest) {
	const ingredients = await listIngredients();

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

	const response = NextResponse.json(ingredients, { status: 200 });

	return response;
}
