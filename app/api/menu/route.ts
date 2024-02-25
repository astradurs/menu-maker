import { NextRequest, NextResponse } from 'next/server';
import { createMenu } from './create-menu';

export async function POST(request: NextRequest) {
	const func = 'post.createMenu';

	const { menuItems } = await request.json();

	console.log(func, { menuItems });
	try {
		const createdMenu = await createMenu({ menuItems });
		const response = NextResponse.json(createdMenu, { status: 200 });
		console.log(func, { response: JSON.stringify(createdMenu, null, 2) });
		return response;
	} catch (error) {
		const response = NextResponse.json(error, { status: 500 });
		console.log(func, { error: JSON.stringify(error, null, 2) });
		return response;
	}
}
