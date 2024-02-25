import { prisma } from '@/prisma-client';
import { MenuItemType } from '@/components/menu/menu-item';

export async function createMenu({
	menuItems,
	menuUuid
}: {
	menuItems: MenuItemType[];
	menuUuid: string;
}) {
	const func = 'createMenu';

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
	const menu = await prisma.menu.findUnique({
		where: {
			uuid: menuUuid
		},
		include: {
			menuItems: true
		}
	});

	if (!menu) {
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

	const menuMenuItems = menu.menuItems;

	const newMenuItems = dbMenuItems.filter((menuItem) => {
		return !menuMenuItems.some((menuMenuItem) => {
			return menuMenuItem.uuid === menuItem.uuid;
		});
	});

	const oldMenuItems = menuMenuItems.filter((menuItem) => {
		return !dbMenuItems.some((menuMenuItem) => {
			return menuMenuItem.uuid === menuItem.uuid;
		});
	});

	const createdMenuItems = await prisma.menuItem.createMany({
		data: newMenuItems
	});

	const updatedMenuItems = await prisma.menuItem.updateMany({
		data: oldMenuItems
	});

	return {
		...menu,
		menuItems: {
			...createdMenuItems,
			...updatedMenuItems
		}
	};
}
