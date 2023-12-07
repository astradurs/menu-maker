'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SelectMenu } from '@/components/menu/select';

export function Dropdown() {
	const menuItems = [
		{
			id: 1,
			name: 'Item 1',
			description: 'This is item 1'
		},
		{
			id: 2,
			name: 'Item 2',
			description: 'This is item 2'
		},
		{
			id: 3,
			name: 'Item 3',
			description: 'This is item 3'
		},
		{
			id: 4,
			name: 'Item 4',
			description: 'This is item 4'
		},
		{
			id: 5,
			name: 'Item 5',
			description: 'This is item 5'
		},
		{
			id: 6,
			name: 'Item 6',
			description: 'This is item 6'
		}
	];

	const daysOfWeek = [
		{ id: 1, day: 'Monday' },
		{ id: 2, day: 'Tuesday' },
		{ id: 3, day: 'Wednesday' },
		{ id: 4, day: 'Thursday' },
		{ id: 5, day: 'Friday' },
		{ id: 6, day: 'Saturday' },
		{ id: 7, day: 'Sunday' }
	];

	return (
		<>
			<div className="w-full">
				<div className="flex justify-center items-center">
					<h2 className="text-2xl font-light mb-5">Drag and drop Menu!</h2>
				</div>

				<div className="border border-1 rounded-md h-full w-full">
					<div className="">
						{daysOfWeek.map(({ id, day }) => (
							<div key={id} className="">
								<div className="p-4">
									<div className="flex justify-center items-center p-1 m-2">
										<p className="text-2xl font-semibold">{day}</p>
									</div>
									<div className="flex justify-between">
										<div>
											<SelectMenu />
										</div>
										<div>
											<SelectMenu />
										</div>
										<div>
											<SelectMenu />
										</div>
										<div>
											<SelectMenu />
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-4">
						<Separator />
						<ScrollArea className="h-screen rounded-md border">
							<div className="p-4">Filters</div>
						</ScrollArea>
					</div>
				</div>
			</div>
		</>
	);
}
