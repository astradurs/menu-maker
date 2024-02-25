import { prisma } from '@/prisma-client';
import { MenuItemType } from '@/components/menu/menu-item';

export async function createMenu({ menuItems }: { menuItems: MenuItemType[] }) {
	const func = 'createMenu';
	const menuUuid = crypto.randomUUID();
	const dbMenuItems = menuItems.map((menuItem) => {
		return {
			title: menuItem.menu_item_title,
			description: menuItem.menu_item_description,
			weekdayNumber: menuItem.weekday_number,
			uuid: menuItem.uuid,
			menuUuid
		};
	});

	console.log(func, dbMenuItems);
	const createdMenu = await prisma.menu.create({
		data: {
			uuid: menuUuid
		}
	});

	const createdMenuItems = await prisma.menuItem.createMany({
		data: dbMenuItems
	});

	return {
		...createdMenu,
		menuItems: createdMenuItems
	};
}
