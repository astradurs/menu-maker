'use client';

import { PlusIcon } from '@radix-ui/react-icons';
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
import { Button } from '../ui/button';

export function AddCourseInfo() {
	return (
		<div>
			<div className="relative flex border items-center justify-center p-1 rounded-md h-44 w-72">
				<div className="flex flex-col p-1">
					<p>Restaurant!!</p>
					<p>Short Descripiton</p>
					<p>Description</p>
				</div>
				<div className="absolute bottom-0 right-0 p-2 hover:border rounded-md m-1 flex items-center justify-center">
					<Dialog>
						<DialogTrigger>
							<div className="flex items-center">
								<p className="text-sm mr-2">add</p>
								<PlusIcon className="self-end w-5 h-5" />
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>add information!</DialogTitle>
							</DialogHeader>
							<DialogDescription>
								Here you can add your course. Use the filters below to help you
							</DialogDescription>

							{/* <MenuForm /> */}

							<DialogFooter>
								<DialogClose asChild>
									<Button className="mt-4" variant="secondary">
										Cancel
									</Button>
								</DialogClose>
								<Button
									className="mt-4"
									variant="default"
									onClick={() => console.log('EDIT COURSE')}
								>
									Yes
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
