'use client';

import { useState } from 'react';
import { MenuItemType, MenuItem } from '@/components/menu/menu-item';
import { Button } from '../ui/button';

export function Menu({ menuUuid }: { menuUuid: string }) {
	console.log('MENU', menuUuid);
	const [menu_items, setMenuItems] = useState<MenuItemType[]>([]);
	const submitMenu = () => {
		console.log('submitting menu', menu_items);
		const body = JSON.stringify({ menuUuid, menuItems: menu_items });
		fetch('/api/menu', {
			method: 'POST',
			body
		});
	};
	const daysOfWeek = [
		{ weekday_number: 1, day: 'Monday' },
		{ weekday_number: 2, day: 'Tuesday' },
		{ weekday_number: 3, day: 'Wednesday' },
		{ weekday_number: 4, day: 'Thursday' },
		{ weekday_number: 5, day: 'Friday' },
		{ weekday_number: 6, day: 'Saturday' },
		{ weekday_number: 7, day: 'Sunday' }
	];

	return (
		<>
			<div className="max-w-fit overflow-x-hidden">
				<div className="rounded-md h-full">
					<div>
						{daysOfWeek.map(({ weekday_number, day }) => {
							const weekdayCourses = menu_items.filter(
								(menu_item) => menu_item.weekday_number === weekday_number
							);
							return (
								<div className="p-4" key={weekday_number}>
									<div className="flex justify-center items-center p-1 m-2">
										<p className="text-2xl font-semibold">{day}</p>
									</div>
									<div className="flex items-center gap-2 mb-4">
										{weekdayCourses.map((menu_item) => (
											<div key={menu_item.uuid}>
												<MenuItem
													weekday_number={weekday_number}
													menu_item={menu_item}
													menu_items={menu_items}
													setMenuItems={setMenuItems}
												/>
											</div>
										))}
										<Button
											onClick={() =>
												setMenuItems([
													...menu_items,
													{
														uuid: crypto.randomUUID(),
														weekday_number,
														menu_item_title: '',
														menu_item_description: ''
													}
												])
											}
										>
											+
										</Button>
									</div>
								</div>
							);
						})}
						<Button onClick={() => submitMenu()}>Submit menu</Button>
					</div>
				</div>
			</div>
		</>
	);
}
