'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { AllergenList } from '@/components/forms/menu/allergen-list';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.'
	})
});

export function AddMenuItemForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: ''
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="pulsa" {...field} />
							</FormControl>
							<Separator />
							<AllergenList allergens={allergens} />
							<FormDescription>
								Here you can select a course to add to the menu
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
