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

interface AddCourseProps {
	addCourse: () => void;
	maxNumber: number;
	day: string;
}

export function AddCourseToDay({ addCourse, maxNumber, day }: AddCourseProps) {
	return (
		<>
			{maxNumber > 0 && (
				<div className="h-44 w-72 flex items-center justify-center hover:border rounded-md">
					<Dialog>
						<DialogTrigger>
							<div className="flex flex-col">
								<PlusIcon className="w-16 h-16 hover:rotate-90 transition duration-300" />
								<p className="text-sm hidden hover:block">Add course..</p>
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add extra course on {day}</DialogTitle>
								<DialogDescription>
									By adding extra course on {day}, you will be able to add more
									courses on this day.
								</DialogDescription>

								<DialogFooter>
									<DialogClose asChild>
										<Button className="mt-4" variant="secondary">
											Cancel
										</Button>
									</DialogClose>
									<DialogClose asChild>
										<Button
											className="mt-4"
											variant="default"
											onClick={addCourse}
										>
											Yes
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</div>
			)}
		</>
	);
}
