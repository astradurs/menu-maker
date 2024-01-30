'use client';

import { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AddCourseToDay } from '@/components/menu/add-course-to-day';
import { Course } from '@/components/menu/course';
import { AddCourseInfo } from '@/components/menu/add-course-info';

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

export function Menu() {
	const [numberOfCourses, setNumberOfCourses] = useState([1, 2, 3, 4]);

	const addCourse = () => {
		if (numberOfCourses.length < maxNumber) {
			const nextNumber = numberOfCourses.length + 1;
			setNumberOfCourses([...numberOfCourses, nextNumber]);
		}
	};

	// Ideally we want to set this in the settings!
	const maxNumber = 6;

	const daysOfWeek = [
		{ id: 1, day: 'Monday' },
		{ id: 2, day: 'Tuesday' },
		{ id: 3, day: 'Wednesday' },
		{ id: 4, day: 'Thursday' },
		{ id: 5, day: 'Friday' },
		{ id: 6, day: 'Saturday' },
		{ id: 7, day: 'Sunday' }
	];

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

	return (
		<>
			<div className="overflow-x-hidden">
				<div className="rounded-md h-full">
					<div>
						<ScrollArea className="w-screen">
							{daysOfWeek.map(({ id, day }) => (
								<div className="p-4" key={id}>
									<div className="flex justify-center items-center p-1 m-2">
										<p className="text-2xl font-semibold">{day}</p>
									</div>
									<ScrollArea className="w-screen">
										<div className="flex items-center gap-2 mb-4">
											{numberOfCourses.map((number) => (
												<div key={number}>
													<Course />
													<ScrollBar orientation="horizontal" />
												</div>
											))}
											{/* <AddCourseInfo /> */}
											{numberOfCourses.length < maxNumber && (
												<AddCourseToDay
													addCourse={addCourse}
													maxNumber={maxNumber - numberOfCourses.length}
													day={day}
												/>
											)}
										</div>
									</ScrollArea>
								</div>
							))}
						</ScrollArea>
					</div>
				</div>
			</div>
		</>
	);
}
