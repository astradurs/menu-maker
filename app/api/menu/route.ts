import { NextRequest, NextResponse } from 'next/server';
import { createMenu } from './create-menu';
import { getMenus } from './get-menus';

export async function POST(request: NextRequest) {
	const func = 'post.createMenu';

	const { menuItems, menuUuid } = await request.json();

	console.log(func, { menuItems });
	try {
		const createdMenu = await createMenu({ menuItems, menuUuid });
		const response = NextResponse.json(createdMenu, { status: 200 });
		console.log(func, { response: JSON.stringify(createdMenu, null, 2) });
		return response;
	} catch (error) {
		const response = NextResponse.json(error, { status: 500 });
		console.log(func, { error: JSON.stringify(error, null, 2) });
		return response;
	}
}

export async function GET() {
	const func = 'get.getMenus';
	console.log('inside GET request for menus');

	// const menus = await getMenus();
	// console.log('menus', menus);
	// const response = NextResponse.json(menus, { status: 200 });
	// console.log(func, { response: JSON.stringify(menus, null, 2) });
	// return response;
}
