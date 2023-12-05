'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { NextRequest } from 'next/server';
import submit from '@/app/courses/@create/actions';
import { Checkbox } from '@/components/ui/checkbox';
import { postCourseRequest } from '@/app/api/course/create-course';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.'
	}),
	description: z.string().min(2, {
		message: 'description must be at least 2 characters.'
	}),
	allergens: z.array(z.string()),
	ingredients: z.array(z.string())
});

export function CreateCourseForm({
	userId,
	ingredients,
	allergens
}: {
	userId: string;
	ingredients: any;
	allergens: any;
}) {
	console.log('CreateCourseForm', { userId, ingredients, allergens });
	// 1. Define your form.

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			allergens: [],
			ingredients: []
		}
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('values', values);
		await postCourseRequest({
			course: values,
			userId
		});
		console.log('posted course');
		submit();
	}

	const handleAllergenChangeFromIngredient = (iUuid: string) => {
		for (const allergen of allergens) {
			if (form.getValues().allergens.some((a: any) => a === allergen.uuid)) {
				continue;
			}
			if (allergen.ingredients.some((i: any) => i.uuid === iUuid)) {
				form.setValue('allergens', [...form.getValues().allergens, allergen.uuid]);
			}
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					name="title"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Name</FormLabel>
							<FormControl>
								<Input placeholder="Input the course name" {...field} />
							</FormControl>
							<FormDescription>This is the name of the course.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="description"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Input a long description for the course"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is the description that shows up on the menu.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="ingredients"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Ingredients</FormLabel>
							{ingredients.map((ingredient: any) => (
								<FormField
									key={ingredient.uuid}
									control={form.control}
									name="ingredients"
									render={({ field }) => {
										return (
											<FormItem
												key={ingredient.uuid}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(
															ingredient.uuid
														)}
														onCheckedChange={(checked) => {
															if (checked) {
																handleAllergenChangeFromIngredient(
																	ingredient.uuid
																);
															}
															return checked
																? field.onChange([
																		...field.value,
																		ingredient.uuid
																  ])
																: field.onChange(
																		field.value?.filter(
																			(value) =>
																				value !==
																				ingredient.uuid
																		)
																  );
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													{ingredient.name}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							<FormDescription>
								This is the list of ingredients in the course.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="allergens"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Allergens</FormLabel>
							{allergens.map((allergen: any) => (
								<FormField
									key={allergen.uuid}
									control={form.control}
									name="allergens"
									render={({ field }) => {
										return (
											<FormItem
												key={allergen.uuid}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(
															allergen.uuid
														)}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([
																		...field.value,
																		allergen.uuid
																  ])
																: field.onChange(
																		field.value?.filter(
																			(value) =>
																				value !==
																				allergen.uuid
																		)
																  );
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													{allergen.name}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							<FormDescription>
								This is the list of allergens in the course.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={!form.formState.isValid || form.formState.isSubmitting}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
