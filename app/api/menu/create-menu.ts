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

	const effectiveMenuItems = menuItems.map((menuItem) => {
		return {
			title: menuItem.menu_item_title,
			description: menuItem.menu_item_description,
			weekdayNumber: menuItem.weekday_number,
			uuid: menuItem.uuid,
			menuUuid
		};
	});

	console.log(func, effectiveMenuItems);
	const menu = await prisma.menu.findUnique({
		where: {
			uuid: menuUuid
		},
		include: {
			menuItems: true
		}
	});

	if (!menu) {
		console.log('menu not found, creating menu');
		const createdMenu = await prisma.menu.create({
			data: {
				uuid: menuUuid
			}
		});

		const createdMenuItems = await prisma.menuItem.createMany({
			data: effectiveMenuItems
		});

		return {
			...createdMenu,
			menuItems: createdMenuItems
		};
	}
	console.log('menu found, updating menu', { menu });

	const menuMenuItems = menu.menuItems;
	console.log('menuMenuItems', { menuMenuItems });

	const menuItemsToCreate = effectiveMenuItems.filter(
		(menuItem) => !menuMenuItems.some((menuMenuItem) => menuMenuItem.uuid === menuItem.uuid)
	);

	console.log('creating menu items', menuItemsToCreate);
	const createdMenuItems = await prisma.menuItem.createMany({
		data: menuItemsToCreate
	});

	const menuItemsToUpdate = effectiveMenuItems.filter((menuItem) =>
		menuMenuItems.some((menuMenuItem) => menuMenuItem.uuid === menuItem.uuid)
	);

	console.log('updating menu items', menuItemsToUpdate);
	const updatePromises = menuItemsToUpdate.map((menuItem) => {
		return prisma.menuItem.update({
			where: {
				uuid: menuItem.uuid
			},
			data: {
				title: menuItem.title,
				description: menuItem.description,
				weekdayNumber: menuItem.weekdayNumber
			}
		});
	});

	const updatedMenuItems = await Promise.all(updatePromises);

	return {
		...menu,
		menuItems: {
			...createdMenuItems,
			...updatedMenuItems
		}
	};
}
