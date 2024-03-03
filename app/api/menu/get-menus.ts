import { prisma } from '@/prisma-client';

export interface Menu {
	uuid: string;
	// menuItems: MenuItem[]; // This should also be here?
	createdAt: Date;
	updatedAt: Date;
	firstName: string | null; // Allow null values
	lastName: string | null; // Allow null values
	email: string;
}

export async function getMenus(): Promise<Menu[] | null> {
	const func = 'getMenus';

	const response = await prisma.user.findMany();

	console.log(func, response);

	return response;
}

// TODO build this function to be get a single Menu by its uuid
// export async function getMenuById() {
// 	const func = 'getMenuById';

// 	const menu = await prisma.menu.findUnique({
// 		where: {
// 			uuid: menuUuid
// 		}
// 	});

// 	console.log(func, menu);

// 	return menu;
// }
