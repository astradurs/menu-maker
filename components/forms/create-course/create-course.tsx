'use client';
import * as z from 'zod';
import submit from '@/app/courses/create/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { postCourseRequest } from '@/app/api/course/create-course';
import TitleField from './fields/title';
import DescriptionField from './fields/description';
import IngredientsField from './fields/ingredients';
import AllergensField from './fields/allergens';
import CourseTranslationsField from './fields/course-translations';
import { Separator } from '@radix-ui/react-dropdown-menu';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Title must be at least 2 characters.'
	}),
	description: z.string().min(2, {
		message: 'description must be at least 2 characters.'
	}),
	allergens: z.array(z.string()),
	ingredients: z.array(z.string()),
	courseTranslations: z.array(
		z.object({
			languageId: z.string(),
			title: z.string(),
			description: z.string()
		})
	)
});

export function CreateCourseForm({
	userId,
	ingredients,
	allergens,
	languages
}: {
	userId: string;
	ingredients: any;
	allergens: any;
	languages: any;
}) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			allergens: [],
			ingredients: [],
			courseTranslations: []
		}
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log('THE VALUES', values);
		await postCourseRequest({
			course: values,
			userId
		});
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
				<TitleField form={form} />

				<DescriptionField form={form} />

				<IngredientsField
					form={form}
					ingredients={ingredients}
					handleAllergenChangeFromIngredient={handleAllergenChangeFromIngredient}
				/>

				<AllergensField form={form} allergens={allergens} />

				<div className="grid gap-1 p-2 border-2 rounded-md">
					<CourseTranslationsField
						form={form}
						courseTranslations={form.getValues().courseTranslations}
						languages={languages}
					/>
				</div>

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
