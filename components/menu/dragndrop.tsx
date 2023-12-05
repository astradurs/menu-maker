'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function DragNDrop() {
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

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

	return (
		<div className="w-full">
			<div className="flex justify-center items-center">
				<h2 className="text-2xl font-light mb-5">Drag and drop Menu!</h2>
			</div>
			<div className="grid grid-col-5 gap-4">
				<div className="col-span-1">
					<ScrollArea className="h-screen rounded-md border">
						<div className="p-4">
							{tags.map((tag) => (
								<>
									<div key={tag} className="text-sm">
										{tag}
									</div>
									<Separator className="my-2" />
								</>
							))}
						</div>
					</ScrollArea>
				</div>
				<div className="col-span-4 col-start-2">Menu</div>
			</div>
		</div>
	);
}
