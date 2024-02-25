'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { AllergenList } from '@/components/forms/menu/allergen-list';
import { ComboboxDemo } from './combo-box';

const formSchema = z.object({
	// TODO make required -> fix validation
	restaurant: z.string().min(2, {
		message: 'Restaurant cannot be empty.'
	}),
	course: z.string().min(2, {
		message: 'Course cannot be empty.'
	})
});

export function AddMenuItemForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			restaurant: '',
			course: ''
		}
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		// const result = await submit(values, userId);
	};

	const allergens = [
		{ id: 1, name: 'Gluten' },
		{ id: 2, name: 'Lactose' },
		{ id: 3, name: 'Egg' },
		{ id: 4, name: 'Peanut' },
		{ id: 5, name: 'Soy' },
		{ id: 6, name: 'Fish' },
		{ id: 7, name: 'Shellfish' },
		{ id: 8, name: 'Tree nut' },
		{ id: 9, name: 'Sesame' },
		{ id: 10, name: 'Celery' },
		{ id: 11, name: 'Mustard' },
		{ id: 12, name: 'Sulphite' }
	];

	const frameWorks = [
		{
			value: 'bragdlaukar',
			label: 'Bragðlaukar'
		},
		{
			value: 'hradlestin',
			label: 'Hraðlestin'
		},
		{
			value: 'matarkompani',
			label: 'Matarkompaní'
		},
		{
			value: 'puredeli',
			label: 'Pure Deli'
		},
		{
			value: 'serrano',
			label: 'Serrano'
		}
	];

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-3">
					<div className="col-span-1">
						<FormField
							control={form.control}
							name="restaurant"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mr-2">Restaurant name</FormLabel>
									<FormControl>
										<ComboboxDemo
											title={'Select restaurant...'}
											data={frameWorks}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="course"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="mr-2">Course description</FormLabel>
									<FormControl>
										<ComboboxDemo
											title={'Select restaurant...'}
											data={frameWorks}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-1">
						<AllergenList allergens={allergens} />
					</div>
					<div className="col-span-1">Misc</div>
				</div>
				<div className="flex justify-end">
					<Button type="submit" size="lg">
						Add course
					</Button>
				</div>
			</form>
		</Form>
	);
}
