'use client';

import { MagicWandIcon } from '@radix-ui/react-icons';
import { AddMenuItemForm } from '@/components/forms/menu/add-menu-item';
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

export function Course() {
	return (
		<div>
			<div className="relative flex border items-center justify-center p-1 rounded-md h-44 w-72">
				<div className="flex flex-col p-1">
					<p>Restaurant!!</p>
					<p>Short Descripiton</p>
					<p>Description</p>
				</div>
				<div className="absolute bottom-0 right-0 p-2 hover:border rounded-md m-1 flex items-center justify-center">
					<Drawer>
						<DrawerTrigger>
							<div className="flex items-center">
								<p className="text-sm mr-2">edit</p>
								<MagicWandIcon className="self-end w-5 h-5" />
							</div>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Here you can select course</DrawerTitle>
								<DrawerDescription>
									you can use the filter below to put constraints on what you
									want.
								</DrawerDescription>
							</DrawerHeader>
							<DrawerContent>Form</DrawerContent>
							<DrawerFooter>
								<Button>Submit</Button>
								<DrawerClose>
									<Button variant="outline">Cancel</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</div>
	);
}
